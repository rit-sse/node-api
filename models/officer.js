import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';

export default sequelize.define('officers', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  committeeName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  primaryOfficer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
  endDate: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  scopes: {
    title(title) {
      return { where: { title } };
    },
    email(email) {
      return { where: { email } };
    },
    primary(primaryOfficer) {
      return { where: { primaryOfficer } };
    },
    committee(committeeName) {
      return { where: { committeeName } };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    // An 'active' Officer is one which has a 'startDate'
    // before the provided date and an 'endDate' after
    // the provided date (or a 'null' endDate).
    // startDate <= date <= endDate
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
    paginate,
    orderBy(field, direction) {
      return sorting(field, direction, [
        'id',
        'title',
        'email',
        'primaryOfficer',
        'committeName',
        'userDce',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});
