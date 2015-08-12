import Membership from './membership';
import MentorShift from './mentor-shift';
import Officer from './officer';
import Officership from './officership';
import Term from './term';
import Tip from './tip';
import User from './user';

export default function() {

  Membership.belongsTo(Term);
  Membership.belongsTo(User);

  MentorShift.belongsTo(Term);
  MentorShift.belongsTo(User);

  Officer.hasMany(Officership);

  Officership.belongsTo(Officer);
  Officership.belongsTo(Term);
  Officership.belongsTo(User);

  Term.hasMany(Membership);
  Term.hasMany(MentorShift);
  Term.hasMany(Officership);

  Tip.belongsTo(User);

  User.hasMany(Membership);
  User.hasMany(MentorShift);
  User.hasMany(Officership);
  User.hasMany(Tip);
}
