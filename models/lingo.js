import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('lingo', {
  phrase: Sequelize.STRING,
  definition: Sequelize.STRING,
}, {
  classMethods: { paginate },
  freezeTableName: true,
  scopes: {
    phrase(phrase) {
      return { where: { phrase } }
    },
    definition(definition) {
      return { where: { definition } }
    },
    paginate: paginateScope
  }
});