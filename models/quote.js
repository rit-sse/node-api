'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('quotes', {
  body: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  defaultScopes: {
    where: {
      approved: true,
    },
  },
  scopes: {
    body(body) {
      return { where: { body } };
    },
    tag(tagName) {
      return { where: { tagName } };
    },
    paginate,
  },
});
