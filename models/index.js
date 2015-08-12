import Committee from './committee';
import Membership from './membership';
import MentorShift from './mentor-shift';
import Officer from './officer';
import Term from './term';
import Tip from './tip';
import User from './user';

export default function() {
  Committee.hasOne(Officer);

  Membership.belongsTo(Term);
  Membership.belongsTo(User);

  MentorShift.belongsTo(Term);
  MentorShift.belongsTo(User);

  Officer.belongsTo(Term);
  Officer.belongsTo(User);
  Officer.belongsTo(Committee);

  Term.hasMany(Membership);
  Term.hasMany(MentorShift);
  Term.hasMany(Officer);

  Tip.belongsTo(User);

  User.hasMany(Membership);
  User.hasMany(MentorShift);
  User.hasMany(Officer);
  User.hasMany(Tip);
}
