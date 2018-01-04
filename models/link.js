import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';

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
}, {
  scopes: {
    paginate,
  },
});
