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
            primary: true,
            userDce: user.dce,
            termName: '2151',
          });
      });
  }
}
