import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';

export default sequelize.define('permissions', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  description: DataTypes.STRING,
  level: DataTypes.INTEGER
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
