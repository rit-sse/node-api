import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('tips', {
  body: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  classMethods: { paginate },
  defaultScopes: {
    where: {
      approved: true
    }
  },
  scopes: {
    body(body) {
      return { where: { body } };
    },
    user(userId) {
      return { where: { userId } };
    },
    paginate: paginateScope
  }
});
