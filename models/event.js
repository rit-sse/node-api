import DataTypes from 'sequelize';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

const moment = extendMoment(Moment);

export default sequelize.define('events', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 25],
        msg: 'Title must be 1 to 25 chars',
      },
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
  link: {
    type: DataTypes.STRING,
    allowNull: true, // TODO: Remove & verify nothing breaks. allowNull: 'true' is the default value.
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isURL: {
        msg: 'Image must must be a valid URL',
      },
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
