import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

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
    active(date) {
      return {
        where: {
          startDate: {
            $lte: date,
          },
          endDate: {
            $or: {
              $gte: date,
              $eq: null,
            },
          },
        },
      };
    },
    paginate,
  },
});
