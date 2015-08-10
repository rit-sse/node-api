import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('lingo', {
  phrase: DataTypes.STRING,
  definition: DataTypes.STRING,
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
