import Group from './group';
import Membership from './membership';
import Officer from './officer';
import Permission from './permission';
import Term from './term';
import Tip from './tip';
import User from './user';

export default function() {
  Group.belongsToMany(Permission, { through: 'groups_permissions'});
  Group.hasMany(Membership);

  Membership.belongsTo(Term);
  Membership.belongsTo(Group);
  Membership.belongsTo(User);

  Permission.belongsToMany(Group, { through: 'groups_permissions'});

  Officer.belongsTo(User);

  Term.hasMany(Membership);

  Tip.belongsTo(User)

  User.hasMany(Membership);
  User.hasOne(Officer);
  User.hasMany(Tip);
}
