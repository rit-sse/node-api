import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('mentorShifts', {
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  endDate: DataTypes.DATE
}, {
  classMethods: { paginate },
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
    paginate: paginateScope
  },
  validate: {
    startTimeBeforeEndTime() {
      if (this.startTime > this.endTime) {
        throw new Error('Start date must be before the end date');
      }
    }
  }
});
