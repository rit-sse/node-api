import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {scope as paginate} from '../helpers/paginate';

export default sequelize.define('memberships', {
  reason: Sequelize.STRING,
}, {
  scopes: {
    reason(reason) {
      return { where: { reason } }
    },
    group(groupId) {
      return { where: { groupId } }
    },
    user(userId) {
      return { where: { userId } }
    },
    term(termId) {
      return { where: { termId } }
    },
    paginate
  }
});