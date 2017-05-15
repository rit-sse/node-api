import Promise from 'bluebird';
import User from '../../models/user';
import Officer from '../../models/officer';
import officers from './officers';

export default function seed() {
  return Promise.map(officers, officer => User
      .create(officer.user)
      .then(() => Officer.create(officer.officer))
      .then((o) => {
        if (officer.committee) {
          return o.createCommittee(officer.committee);
        }
      }));
}
