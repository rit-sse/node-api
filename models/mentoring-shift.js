import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';

export default sequelize.define('mentoringShifts', {
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
}, {
  scopes: {
    time(time) {
      return {
        where: {
          startTime: {
            $lte: time
          },
          endTime: {
            $gt: time
          }
        }
      };
    }
  },
  validate: {
    startTimeBeforeEndTime() {
      if (this.startTime > this.endTime) {
        throw new Error('Start time must be before the end time');
      }
    }
  }
});
