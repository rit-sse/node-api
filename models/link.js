import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';

export default sequelize.define('links', {
  shortLink: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },
  longLink: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isURL: {
        msg: 'Long Link must must be a valid URL',
      },
    },
  },
  goDescription: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  publicGO: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
}, {
  scopes: {
    paginate,
    orderBy(field, direction) {
      return sorting(field, direction, [
        'shortLink',
        'longLink',
        'goDescription',
        'publicGO',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});
