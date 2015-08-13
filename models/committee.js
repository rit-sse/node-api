import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Officer from './officer';

export default sequelize.define('committees', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  classMethods: { paginate },
  scopes: {
    name(name) {
      return { where: { name } };
    },
    active() {
      return {
        include: [{
          model: Officer.scope('active')
        }]
      };
    },
    paginate
  }
});
