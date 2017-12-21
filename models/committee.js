import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import Officer from './officer';

export default sequelize.define('committees', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  scopes: {
    name(name) {
      return { where: { name } };
    },
    // Committees which have at least 1 'active' Officer
    active(date) {
      return {
        include: [{
          model: Officer.scope({ method: ['active', date] }),
        }],
      };
    },
    paginate,
  },
});
