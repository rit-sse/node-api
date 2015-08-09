import Permission from '../../models/permission';

export default function seed() {
  var permissions = [{
    name: 'read unapproved memberships',
    description: 'View the unapproved memberships'
  }];
  return Permission
    .destroy({where: { }})
    .then(() => {
      var actions = ['groups', 'memberships', 'officers'];
      return Permission.bulkCreate(actions.reduce((arr, action) => {
        arr.push({
          name: `create ${action}`,
          description: `Create a ${action}`
        },
        {
          name: `destroy ${action}`,
          description: `Destroy a ${action}`
        },
        {
          name: `update ${action}`,
          description: `Update a ${action}`
        })
        return arr;
      }, permissions));
    })
};
