import nconf from '../../config';
import User from '../../models/user';
import Membership from '../../models/membership';

export default function seed() {
  var admin = nconf.get('admin');
  if (admin) {
    return User
      .create(admin)
      .then(user => {
        return Membership
          .create({
            reason: 'admin',
            approved: true,
            userId: user.id,
            groupId: 1,
            termId: 1
          });
      });
  }
}
