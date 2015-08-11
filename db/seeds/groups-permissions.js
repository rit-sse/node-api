import Group from '../../models/group';

export default function seed() {
  var allPermissions = ['groups', 'memberships', 'officers', 'links', 'tips', 'lingo']
    .reduce((arr, action) => {
      arr.push(`create ${action}`, `update ${action}`, `destroy ${action}`);
      return arr;
    }, ['read unapproved memberships']);

  var admin = [
    'update memberships',
    'destroy memberships',
    'read unapproved memberships',
    'create officers',
    'update officers',
    'destroy officers',
  ];

  var officerPermissions = allPermissions.filter(p => admin.indexOf(p) === -1 );

  return Promise.all([
    Group
      .find({where: {name: 'primary officers'}})
      .then(group => group.addPermissionsByName(...allPermissions)),
    Group
      .find({where: {name: 'officers'}})
      .then(group => group.addPermissionsByName(...officerPermissions))
  ]);
};
