'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('officers', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  committeeName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
  endDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
}, {
  scopes: {
    title(title) {
      return { where: { title } };
    },
    email(email) {
      return { where: { email } };
    },
    primary(primary) {
      return { where: { primary } };
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
            $gte: date,
          },
        },
      };
    },
    paginate,
  },
});
