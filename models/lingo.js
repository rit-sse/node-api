import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('lingo', {
  phrase: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  definition: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  classMethods: { paginate },
  freezeTableName: true,
  scopes: {
    phrase(phrase) {
      return { where: { phrase } };
    },
    definition(definition) {
      return { where: { definition } };
    },
    paginate: paginateScope
  }
});
