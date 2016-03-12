import AgendaItem from './agenda-item';
import Committee from './committee';
import Event from './event';
import Headcount from './headcount';
import Membership from './membership';
import Mentor from './mentor';
import Officer from './officer';
import Quote from './quote';
import Shift from './shift';
import Specialty from './specialty';
import Tag from './tag';
import Tip from './tip';
import User from './user';

export default function() {
  AgendaItem.belongsTo(Officer);
  AgendaItem.belongsTo(User);

  Committee.hasOne(Officer);
  Committee.hasMany(Event);
  Committee.hasMany(Membership);

  Event.belongsTo(Committee);

  Headcount.belongsTo(User);

  Membership.belongsTo(Committee);
  Membership.belongsTo(User);

  Mentor.belongsTo(User);
  Mentor.hasMany(Shift);
  Mentor.belongsToMany(Specialty, { through: 'mentors_specialties' });

  Officer.belongsTo(User);
  Officer.belongsTo(Committee);
  Officer.hasMany(AgendaItem);

  Quote.belongsToMany(Tag, { through: 'quotes_tags' });

  Shift.belongsTo(Mentor);

  Specialty.belongsToMany(Mentor, { through: 'mentors_specialties' });

  Tag.belongsToMany(Quote, { through: 'quotes_tags' });

  Tip.belongsTo(User);

  User.hasMany(AgendaItem);
  User.hasMany(Headcount);
  User.hasMany(Membership);
  User.hasMany(Mentor);
  User.hasMany(Officer);
  User.hasMany(Tip);
}
