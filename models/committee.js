'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Officer from './officer';

export default sequelize.define('committees', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  scopes: {
    name(name) {
      return { where: { name } };
    },
    active(date) {
      return {
        include: [{
          model: Officer.scope({ method: ['active', date] }),
        }],
      };
    },
    paginate,
  },
});
