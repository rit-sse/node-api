import Permission from '../../models/permission';
import nconf from '../../config';

export default function seed() {
  var permissions = [{
    name: 'read unapproved memberships',
    description: 'View the unapproved memberships',
    level: nconf.get('auth:levels:high')
  }];

  var low = ['links', 'tips', 'lingo'];

  return Permission
    .destroy({where: { }})
    .then(() => {
      var actions = ['groups', 'memberships', 'officers', 'links', 'tips', 'lingo'];
      return Permission.bulkCreate(actions.reduce((arr, action) => {
        arr.push({
          name: `create ${action}`,
          description: `Create a ${action}`,
          level: low.indexOf(action) === -1 ? nconf.get('auth:levels:high') : nconf.get('auth:levels:low')
        },
        {
          name: `destroy ${action}`,
          description: `Destroy a ${action}`,
          level: nconf.get('auth:levels:high')
        },
        {
          name: `update ${action}`,
          description: `Update a ${action}`,
          level: nconf.get('auth:levels:high')
        })
        return arr;
      }, permissions));
    })
};
