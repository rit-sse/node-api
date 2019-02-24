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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  scopes: {
    onlyPublic() {
      return { where: { public: true } };
    },
    paginate,
    orderBy(field, direction) {
      return sorting(field, direction, [
        'shortLink',
        'longLink',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});
