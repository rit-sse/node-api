'use strict';

import nconf from '../../config';
import User from '../../models/user';
import Officer from '../../models/officer';

export default function seed() {
  const admin = nconf.get('admin');
  if (admin) {
    return User
      .create(admin)
      .then(user => {
        return Officer
          .create({
            display: 'President',
            email: 'president@sse.se.rit.edu',
            primary: true,
            userId: user.id,
            termName: '2151',
          });
      });
  }
}
