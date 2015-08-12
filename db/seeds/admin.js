import nconf from '../../config';
import User from '../../models/user';
import Officership from '../../models/officership';

export default function seed() {
  var admin = nconf.get('admin');
  if (admin) {
    return User
      .create(admin)
      .then(user => {
        return Officership
          .create({
            approved: true,
            userId: user.id,
            officerId: 1,
            termId: 1
          });
      });
  }
}
