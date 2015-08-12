import Membership from './membership';
import Officer from './officer';
import Term from './term';
import Tip from './tip';
import User from './user';

export default function() {

  Membership.belongsTo(Term);
  Membership.belongsTo(User);

  Officer.belongsTo(User);

  Term.hasMany(Membership);

  Tip.belongsTo(User);

  User.hasMany(Membership);
  User.hasOne(Officer);
  User.hasMany(Tip);
}
