import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('terms', {
  name: {
    type: DataTypes.STRING,
    validate: { is: /\d{4}/ }
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
}, {
  classMethods: { paginate },
  scopes: {
    date(date) {
      return {
        where: {
          startDate: {
            $lte: date
          },
          endDate: {
            $gte: date
          }
        }
      };
    },
    name(name) {
      return { where: { name } };
    },
    paginate: paginateScope
  },
  validate: {
    startDateBeforeEndDate() {
      if (this.startDate > this.endDate) {
        throw new Error('Start date must be before the end date');
      }
    }
  }
});
