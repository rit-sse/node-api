'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import moment from 'moment';
import 'moment-range';

export default sequelize.define('events', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 25],
    },
  },
  committeeName: {
    type: DataTypes.STRING,
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
  scopes: {
    name(name) {
      return { where: { name } };
    },
    committee(committeeName) {
      return { where: { committeeName } };
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
            $between: [dates.start.toDate(), dates.end.toDate()],
          },
        },
      };
    },
    sort(sort) {
      return { order: [['startDate', sort]] };
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
