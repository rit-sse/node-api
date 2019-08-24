import { DataTypes, Op } from 'sequelize';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';

const moment = extendMoment(Moment);

export default sequelize.define(
  'events',
  {
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
  },
  {
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
              [Op.lt]: date,
            },
          },
        };
      },
      after(date) {
        return {
          where: {
            startDate: {
              [Op.gt]: date,
            },
          },
        };
      },
      featured() {
        return { where: { image: { [Op.ne]: null } } };
      },
      between(range) {
        const dates = moment.range(range);
        return {
          where: {
            startDate: {
              [Op.between]: [dates.start.toDate(), dates.end.toDate()],
            },
          },
        };
      },
      // TODO: Deprecate This
      sort(sort) {
        return { order: [['startDate', sort]] };
      },
      paginate,
      orderBy(field, direction) {
        return sorting(field, direction, [
          'id',
          'name',
          'committeeName',
          'startDate',
          'endDate',
          'description',
          'location',
          'link',
          'image',
          'createdAt',
          'updatedAt',
        ]);
      },
    },
    validate: {
      startDateBeforeEndDate() {
        if (this.startDate > this.endDate) {
          throw new Error('Start date must be before the end date');
        }
      },
    },
  }
);
