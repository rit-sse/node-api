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
            title: 'President',
            email: 'president',
            primaryOfficer: true,
            userDce: user.dce,
            startDate: new Date(),
            endDate: new Date(2020, 0, 12),
          });
      });
  }

  return Promise.resolve();
}
