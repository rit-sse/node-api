'use strict';

import AgendaItem from './agenda-item';
import Committee from './committee';
import Headcount from './headcount';
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
  AgendaItem.belongsTo(Officer);
  AgendaItem.belongsTo(User);

  Committee.hasOne(Officer);
  Committee.hasMany(Membership);

  Headcount.belongsTo(User);

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
  Officer.hasMany(AgendaItem);

  Quote.belongsToMany(Tag, { through: 'quotes_tags' });

  Shift.belongsTo(Mentor);

  Specialty.belongsToMany(Mentor, { through: 'mentors_specialties' });

  Tag.belongsToMany(Quote, { through: 'quotes_tags' });

  Term.hasMany(Membership);
  Term.hasMany(Mentor);
  Term.hasMany(Officer);

  Tip.belongsTo(User);

  User.hasMany(AgendaItem);
  User.hasMany(Headcount);
  User.hasMany(Membership);
  User.hasMany(Mentor);
  User.hasMany(Officer);
  User.hasMany(Tip);
}
