import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Term from './Term';

export default sequelize.define('mentorShifts', {
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  endDate: DataTypes.DATE
}, {
  scopes: {
    time(time) {
      return {
        where: {
          startDate: {
            $lte: time
          },
          endDate: {
            $gte: time
          }
        }
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
