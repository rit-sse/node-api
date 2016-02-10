'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('links', {
  shortLink: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  longLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isURL: {
        msg: 'LogoLink must must be a valid URL',
      },
    },
  },
}, {
  scopes: {
    paginate,
  },
});
