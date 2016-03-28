import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('tips', {
  body: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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
    user(userDce) {
      return { where: { userDce } };
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
