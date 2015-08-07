import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {scope as paginate} from '../helpers/paginate';

export default sequelize.define('groups', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: Sequelize.STRING,
}, {
  scopes: {
    name(name) {
      return { where: { name } }
    },
    description(description) {
      return { where: { description } }
    },
    paginate
  }
});
