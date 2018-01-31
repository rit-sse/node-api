import Promise from 'bluebird';
import { Router } from 'express';
import moment from 'moment';

import sequelize from '../config/sequelize';
import mailer from '../helpers/mailgun';
import scopify from '../helpers/scopify';
import Membership from '../models/membership';
import Officer from '../models/officer';
import User from '../models/user';
import paginate from '../middleware/paginate';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';

const router = Router(); // eslint-disable-line new-cap

// Promise-based 'sendMail'
const sendMail = Promise.promisify(mailer.sendMail);

// 'user' and 'secretary' are User objects
// 'user' = person the email should go to
// 'secretary' = current SSE secretary
const sendCongratsEmail = (user, secretary = null) => sendMail({
  from: 'secretary@sse.rit.edu',
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

router
  .route('/scoreboard')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'user', 'active', 'between', 'approved');
      Membership
        .scope(scopes)
        .findAll({
          attributes: [
            'userDce',
            [sequelize.fn('count', sequelize.col('userDce')), 'memberships'],
          ],
          group: ['userDce'],
          order: 'memberships DESC',
        })
        .then(scoreboard => res.send(scoreboard))
        .catch(err => next(err));
    });

router
  .route('/')
  .get(verifyUser, paginate, needsApprovedIndex('memberships'), (req, res, next) => {
    const scopes = scopify(req.query, 'reason', 'committee', 'user', 'active', 'between', 'approved');
    Membership
      .scope(scopes)
      .findAndCountAll({
        include: [User],
      })
      .then(result => res.send({
        total: result.count,
        perPage: req.query.perPage,
        currentPage: req.query.page,
        data: result.rows,
      }))
      .catch(err => next(err));
  })
  .post(needs('memberships', 'create'), (req, res, next) => Membership
      .create(req.body, {
        fields: ['reason', 'committeeName', 'userDce', 'startDate', 'endDate'],
      })
      .then(membership => membership.reload({ include: [User] }))
      .then(membership => res.status(201).send(membership))
      .catch((err) => {
        err.status = 422;
        next(err);
      }));

router
  .route('/:id')
  .get(verifyUser, needsApprovedOne('memberships'), (req, res, next) => {
    Membership
      .findById(req.params.id, {
        include: [User],
      })
      .then((membership) => {
        if (membership) {
          if (!membership.approved && !req.auth.allowed) {
            return Promise.reject({
              message: 'User does not have permission: unapproved memberships',
              status: 403,
            });
          }
          return res.send(membership);
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .catch(err => next(err));
  })
  .put(needs('memberships', 'update'), (req, res, next) => {
    Membership
      .findById(req.params.id)
      .then((membership) => {
        if (membership) {
          return membership.updateAttributes(req.body, {
            fields: ['reason', 'approved', 'committeeName', 'userDce', 'startDate', 'endDate'],
          });
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .then(membership => membership.reload({ include: [User] }))
      .then((membership) => {
        const previousApproved = membership.previous('approved');
        // Attempt to send email if this membership is being approved
        if (membership.approved && (previousApproved === null || previousApproved === false)) {
          // Count all active approved memberships for this user
          return Membership
            .scope([
              { method: ['user', membership.user.dce] },
              { method: ['approved', true] },
              { method: ['active', moment().toISOString()] },
            ])
            .count()
            .then((count) => {
              // If there is only 1, then we can assume this is the first approved membership
              // this person has received this semester, so we'll send them an email.
              //
              // Edge cases:
              // 1. A User had 1 membership. It was deleted. They receieved another membership. They would receive two emails.
              // 2. A User had 1 membership. It was unapproved. It was approved. They would receive two emails.
              //
              // We're fine with both cases because they're infrequent, if they occur at all
              // – a user would be reminded of membership details which is ¯\_(ツ)_/¯
              // Additionally, the only people who can approve memberships are officers,
              // so we can trust that they won't abuse their power and spam someone's inbox.
              if (count === 1) {
                // Find the current SSE Secretary
                return Officer
                  .scope([
                    { method: ['title', 'Secretary'] },
                    { method: ['active', moment().toISOString()] },
                  ])
                  .findAll()
                  .then(secretary => sendCongratsEmail(membership.user, secretary));
              }
            })
            .then(() => membership);
        }

        return membership;
      })
      .then(membership => res.send(membership))
      .catch(err => next(err));
  })
  .delete(needs('memberships', 'destroy'), (req, res, next) => {
    Membership
      .findById(req.params.id)
      .then((membership) => {
        if (membership) {
          return membership.destroy();
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  });

export default router;
