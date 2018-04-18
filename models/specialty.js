import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';

export default sequelize.define('specialties', {
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
    orderBy(field, direction) {
      return sorting(field, direction, [
        'name',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});
