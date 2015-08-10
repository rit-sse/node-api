import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('tips', {
  body: Sequelize.STRING
}, {
  classMethods: { paginate },
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
