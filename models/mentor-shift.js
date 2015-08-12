import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

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
