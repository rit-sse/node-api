import Committee from './committee';
import Membership from './membership';
import Mentor from './mentor';
import MentoringShift from './mentoring-shift';
import Officer from './officer';
import Term from './term';
import Tip from './tip';
import User from './user';

export default function() {
  Committee.hasOne(Officer);
  Committee.hasMany(Membership);

  Membership.belongsTo(Committee);
  Membership.belongsTo(Term);
  Membership.belongsTo(User);

  Mentor.belongsTo(Term);
  Mentor.belongsTo(User);
  Mentor.hasMany(MentoringShift);

  MentoringShift.belongsTo(Mentor);

  Officer.belongsTo(Term);
  Officer.belongsTo(User);
  Officer.belongsTo(Committee);

  Term.hasMany(Membership);
  Term.hasMany(Mentor);
  Term.hasMany(Officer);

  Tip.belongsTo(User);

  User.hasMany(Membership);
  User.hasMany(Mentor);
  User.hasMany(Officer);
  User.hasMany(Tip);
}
