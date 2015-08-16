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
    officer(officerEmail) {
      return { where: { officerEmail } };
    },
    user(userId) {
      return { where: { userId } };
    },
    search(query) {
      return {
        where: {
          body: {
            $like: `%${query}%`,
          },
        },
      };
    },
    paginate,
  },
});
