import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('lingo', {
  phrase: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  freezeTableName: true,
  defaultScopes: {
    where: {
      approved: true,
    },
  },
  scopes: {
    phrase(phrase) {
      return { where: { phrase } };
    },
    definition(definition) {
      return { where: { definition } };
    },
    search(query) {
      return {
        where: {
          $or: {
            phrase: {
              $like: `%${query}%`,
            },
            definition: {
              $like: `%${query}%`,
            },
          },
        },
      };
    },
    paginate,
  },
});
