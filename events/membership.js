import Promise from 'bluebird';
import moment from 'moment';

import config from '../config';
import mailer from '../helpers/mailgun';
import Membership from '../models/membership';
import Officer from '../models/officer';
import User from '../models/user';

// 'user' and 'secretary' are User objects
// 'user' = person the email should go to
// 'secretary' = current SSE secretary
const sendCongratsEmail = (user, secretary = null) => mailer.sendMail({
  from: 'Society of Software Engineers <secretary@sse.rit.edu>',
  to: `${user.dce}@rit.edu`,
  subject: "You've earned SSE Membership!",
  template: {
    name: 'emails/scoreboard-welcome.ejs',
    engine: 'ejs',
    context: {
      user,
      secretary,
    },
  },
});

// If this is the first membership someone receives during the semester, send them a congrats email
Membership.afterUpdate((membership) => {
  const previousApproved = membership.previous('approved');
  // Attempt to send email if this membership is being approved
  if (membership.approved && (previousApproved === null || previousApproved === false)) {
    // Count all active approved memberships for this user
    Membership
      .scope([
        { method: ['user', membership.userDce] },
        { method: ['approved', true] },
        { method: ['active', moment().toISOString()] },
      ])
      .count()
      .then((count) => {
        // If there is only 1, then we can assume this is the first approved membership
        // this person has received this semester, so we'll send them an email.
        //
        // Edge cases:
        // 1. A User had 1 membership. It was deleted. They receieved another membership. They would receive a second email.
        // 2. A User had 1 membership. It was unapproved. It was approved. They would receive a second email.
        //
        // We're fine with both cases because they're infrequent, if they occur at all
        // – a user would be reminded of membership details which is ¯\_(ツ)_/¯
        // Additionally, the only people who can approve memberships are primary officers,
        // so we can trust that they won't abuse their power and spam someone's inbox.
        if (count === 1) {
          Promise
            .all([
              // Reload the membership to get the User associated with it
              membership.reload({ include: [User] }),
              // Find the current SSE Secretary
              Officer
                .scope([
                  { method: ['title', 'Secretary'] },
                  { method: ['active', moment().toISOString()] },
                ])
                .findAll({ include: [User] }),
            ])
            .then((values) => {
              const user = values[0].user;
              const secretary = values[1][0].user;
              // Don't send emails during testing
              if (config.get('NODE_ENV') !== 'test') {
                console.log(`${moment().toISOString()}: Sending membership email to ${user.dce}@rit.edu`); // eslint-disable-line no-console
                sendCongratsEmail(user, secretary);
              }
            });
        }
      });
  }
});

export default Membership;
