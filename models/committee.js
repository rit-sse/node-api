import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('committees', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  classMethods: { paginate },
  scopes: {
    name(name) {
      return { where: { name } };
    },
    paginate
  }
});
