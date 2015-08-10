import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';

export default sequelize.define('permissions', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: Sequelize.STRING,
  level: Sequelize.INTEGER
}, {
  scopes: {
    name(name) {
      return { where: { name } };
    },
    description(description) {
      return { where: { description } };
    }
  }
});
