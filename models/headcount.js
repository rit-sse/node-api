'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('headcounts', {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  classMethods: { paginate },
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
    startDate(startDate) {
      return { where: { createdAt: { $gte: startDate } } };
    },
    endDate(endDate) {
      return { where: { createdAt: { $lte: endDate } } };
    },
    date(date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      return {
        where: {
          createdAt: {
            $gte: start,
            $lte: end,
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
