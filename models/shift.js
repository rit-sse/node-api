import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import Mentor from './mentor';
import paginate from '../helpers/paginate';

export default sequelize.define('shifts', {
  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,
  day: DataTypes.STRING,
}, {
  scopes: {
    time(time) {
      return {
        where: {
          startTime: {
            $lte: time,
          },
          endTime: {
            $gt: time,
          },
        },
      };
    },
    day(day) {
      return { where: { day } };
    },
    mentor(mentorId) {
      return { where: { mentorId } };
    },
    active(date) {
      return {
        include: [{
          model: Mentor.scope({ method: ['active', date] }),
        }],
      };
    },
    paginate,
  },
  validate: {
    startTimeBeforeEndTime() {
      if (this.startTime > this.endTime) {
        throw new Error('Start time must be before the end time');
      }
    },
  },
});
