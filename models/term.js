import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {scope as paginate} from '../helpers/paginate';

export default sequelize.define('terms', {
  name: Sequelize.STRING,
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE
}, {
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
      }
    },
    name(name) {
      return { where: { name } }
    },
    paginate
  },
  validate: {
    startDateBeforeEndDate() {
      if (this.startDate > this.endDate) {
        throw new Error('Start date must be before the end date')
      }
    }
  }
});
