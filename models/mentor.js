import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Specialty from './specialty';

export default sequelize.define('mentors', {
  startDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
  endDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  scopes: {
    time(time) {
      return {
        include: [{
          model: MentorShift.scope({ method: ['time', time] }),
        }],
      };
    },
    active(date) {
      return {
        where: {
          startDate: {
            $lte: date,
          },
          endDate: {
            $gte: date,
            $eq: null,
          },
        },
      };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    specialty(name) {
      return {
        include: [{
          model: Specialty,
          where: { name },
        }],
      };
    },
    paginate,
  },
});
