'use strict';

import Committee from './committee';
import Membership from './membership';
import Mentor from './mentor';
import Officer from './officer';
import Quote from './quote';
import Shift from './shift';
import Specialty from './specialty';
import Tag from './tag';
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
  Mentor.hasMany(Shift);
  Mentor.belongsToMany(Specialty, { through: 'mentors_specialties' });

  Officer.belongsTo(Term);
  Officer.belongsTo(User);
  Officer.belongsTo(Committee);

  Quote.belongsToMany(Tag, { through: 'quotes_tags' });

  Shift.belongsTo(Mentor);

  Specialty.belongsToMany(Mentor, { through: 'mentors_specialties' });

  Tag.belongsToMany(Quote, { through: 'quotes_tags' });

  Term.hasMany(Membership);
  Term.hasMany(Mentor);
  Term.hasMany(Officer);

  Tip.belongsTo(User);

  User.hasMany(Membership);
  User.hasMany(Mentor);
  User.hasMany(Officer);
  User.hasMany(Tip);
}
