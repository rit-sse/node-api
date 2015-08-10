import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('links', {
  shortLink: DataTypes.STRING,
  longLink: DataTypes.STRING,
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
