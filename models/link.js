import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('links', {
  shortLink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  longLink: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  classMethods: { paginate },
  scopes: {
    shortLink(shortLink) {
      return { where: { shortLink } };
    },
    longLink(longLink) {
      return { where: { longLink } };
    },
    paginate: paginateScope
  }
});
