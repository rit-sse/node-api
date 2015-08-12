import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('officers', {
  display: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  endDate: DataTypes.DATE
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
    term(termId) {
      return { where: { termId } };
    },
    paginate: paginateScope
  }
});
