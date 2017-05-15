import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('tags', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  scopes: {
    paginate,
  },
});
