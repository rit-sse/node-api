import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import Specialty from './specialty';
import sorting from '../helpers/sorting';

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
  },
}, {
  scopes: {
    active(date) {
      return {
        where: {
          startDate: {
            [Op.lte]: date,
          },
          endDate: {
            [Op.or]: {
              [Op.gte]: date,
              [Op.eq]: null,
            },
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
    orderBy(field, direction) {
      return sorting(field, direction, [
        'id',
        'bio',
        'userDce',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});
