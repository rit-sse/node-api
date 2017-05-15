import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import Tag from './tag';

export default sequelize.define('quotes', {
  body: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  approved: {
    type: DataTypes.BOOLEAN,
  },
}, {
  defaultScopes: {
    where: {
      approved: true,
    },
  },
  scopes: {
    approved(approved) {
      return { where: { approved } };
    },
    body(body) {
      return { where: { body } };
    },
    tag(name) {
      return {
        include: [{
          model: Tag,
          where: {
            name,
          },
          duplicating: false,
        }],
        group: [
          'id',
          'tags.name',
          'tags.quotes_tags.createdAt',
          'tags.quotes_tags.updatedAt',
          'tags.quotes_tags.tagName',
          'tags.quotes_tags.quoteId',
        ],
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
