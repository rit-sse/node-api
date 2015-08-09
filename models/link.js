import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('links', {
  shortLink: Sequelize.STRING,
  longLink: Sequelize.STRING,
}, {
  classMethods: { paginate },
  scopes: {
    shortLink(shortLink) {
      return { where: { shortLink } }
    },
    longLink(longLink) {
      return { where: { longLink } }
    },
    paginate: paginateScope
  }
});