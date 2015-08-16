'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Tag from './tag';

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
    tag(name) {
      return {
        include: [{
          model: Tag,
          where: { name },
        }],
      };
    },
    search(query) {
      return {
        where: {
          $or: {
            body: {
              $like: `%${query}%`,
            },
            description: {
              $like: `%${query}%`,
            },
          },
        },
      };
    },
    paginate,
  },
});
