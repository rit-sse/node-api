'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import moment from 'moment';
import 'moment-range';

export default sequelize.define('headcounts', {
  name: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      len: [1, 25],
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isURL: true,
    },
  },
}, {
  classMethods: { paginate },
  scopes: {
    name(name) {
      return { where: { name } };
    },
    committee(committeeId) {
      return { where: { committeeId } };
    },
    location(location) {
      return { where: { location } };
    },
    before(date) {
      return {
        where: {
          startDate: {
            $lt: date,
          },
        },
      };
    },
    after(date) {
      return {
        where: {
          startDate: {
            $gt: date,
          },
        },
      };
    },
    featured() {
      return { where: { image: { $ne: null } } };
    },
    between(range) {
      const dates = moment.range(range);
      return {
        where: {
          startDate: {
            $between: [dates.start, dates.end],
          },
        },
      };
    },
    endDate(date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      return {
        where: {
          endDate: {
            $between: [start, end],
          },
        },
      };
    },
    startDate(date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      return {
        where: {
          startDate: {
            $between: [start, end],
          },
        },
      };
    },
    paginate,
  },
  validate: {
    startDateBeforeEndDate() {
      if (this.startDate > this.endDate) {
        throw new Error('Start date must be before the end date');
      }
    },
  },
});
