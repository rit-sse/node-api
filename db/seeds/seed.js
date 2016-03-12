import User from '../../models/user';
import Officer from '../../models/officer';
import officers from './officers';
import Promise from 'bluebird';

export default function seed() {
  return Promise.map(officers, officer => {
    return User
      .create(officer.user)
      .then(() => Officer.create(officer.officer))
      .then(o => {
        if (officer.committee) {
          return o.createCommittee(officer.committee);
        }
      });
  });
}
