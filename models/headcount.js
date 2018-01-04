import DataTypes from 'sequelize';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

const moment = extendMoment(Moment);

export default sequelize.define('headcounts', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  scopes: {
    count(count) {
      return { where: { count } };
    },
    greaterThan(count) {
      return { where: { count: { $gt: count } } };
    },
    lessThan(count) {
      return { where: { count: { $lt: count } } };
    },
    between(range) {
      const dates = moment.range(range);
      return {
        where: {
          createdAt: {
            $between: [dates.start.toDate(), dates.end.toDate()],
          },
        },
      };
    },
    date(date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      return {
        where: {
          createdAt: {
            $between: [start, end],
          },
        },
      };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    paginate,
  },
});
