import Group from '../../models/group';
import Permission from '../../models/permission';

export default function seed() {
  var allPermissions = ['groups', 'memberships', 'users']
    .reduce((arr, action) => {
      arr.push(`create ${action}`, `update ${action}`, `destroy ${action}`);
      return arr;
    }, []);

  var admin = ['update memberships', 'destroy memberships', 'update users', 'destroy users']

  var officerPermissions = allPermissions.filter((p) => admin.indexOf(p) === -1 )

  return Promise.all([
    Group
      .find({where: {name: 'primary officers'}})
      .then((group) => group.addPermissionsByName(...allPermissions)),
    Group
      .find({where: {name: 'officers'}})
      .then((group) => group.addPermissionsByName(...officerPermissions))
  ]);
};
