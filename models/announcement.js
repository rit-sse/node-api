import DataTypes from 'sequelize';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';

export default sequelize.define('announcements', {
  announcement: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  announcementType: DataTypes.STRING,
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  scopes: {
    onlyActive() {
      return { where: { active: true } };
    },
    paginate,
    orderBy(field, direction) {
      return sorting(field, direction, [
        'announcement',
        'announcementType',
        'active',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});

