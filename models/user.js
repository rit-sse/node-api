import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {scope as paginate} from '../helpers/paginate';

export default sequelize.define('users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  dce: {
    type: Sequelize.STRING,
    validate: { is:  /[a-z]{2,3}\d{4}/ }
  }
}, {
  scopes: {
    firstName(firstName) {
      return { where: { firstName } }
    },
    lastName(lastName) {
      return { where: { lastName } }
    },
    dce(dce) {
      return { where: { dce } }
    },
    paginate
  }
});
