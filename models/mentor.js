import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Term from './term';
import Specialty from './specialty';

export default sequelize.define('mentors', {
  endDate: DataTypes.DATE,
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  scopes: {
    time(time) {
      return {
        include: [{
          model: MentorShift.scope({ method: ['time', time] })
        }]
      };
    },
    active() {
      return {
        where: {
          endDate: {
            $or: {
              $eq: null,
              $gt: new Date()
            }
          }
        },
        include: [{
          model: Term.scope({ method: ['date', new Date()]})
        }]
      };
    },
    user(userId) {
      return { where: { userId }};
    },
    term(termId) {
      return { where: { termId }};
    },
    specialty(name) {
      return {
        include: [{
          model: Specialty,
          where: { name }
        }]
      };
    },
    paginate
  },
  validate: {
    startTimeBeforeEndTime() {
      if (this.startTime > this.endTime) {
        throw new Error('Start date must be before the end date');
      }
    }
  }
});
