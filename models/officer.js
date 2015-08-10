import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('officers', {
  display: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  classMethods: { paginate },
  scopes: {
    display(display) {
      return { where: { display } };
    },
    email(email) {
      return { where: { email } };
    },
    user(userId) {
      return { where: { userId } };
    },
    paginate: paginateScope
  }
});
