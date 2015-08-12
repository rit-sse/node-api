import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';

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
  }
}, {
  scopes: {
    display(display) {
      return { where: { display } };
    },
    email(email) {
      return { where: { email } };
    }
  }
});
