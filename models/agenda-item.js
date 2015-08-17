'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('agendaItem', {
  body: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  week: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  scopes: {
    body(body) {
      return { where: { body } };
    },
    week(week) {
      return { where: { week } };
    },
    officer(officerId) {
      return { where: { officerId } };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    paginate,
  },
});
