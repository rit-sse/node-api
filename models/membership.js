import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';

export default sequelize.define('memberships', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reason: DataTypes.STRING,
  endDate: DataTypes.DATE,
  approved: DataTypes.BOOLEAN
}, {
  classMethods: { paginate },
  defaultScopes: {
    where: {
      approved: true
    }
  },
  scopes: {
    reason(reason) {
      return { where: { reason } };
    },
    group(groupId) {
      return { where: { groupId } };
    },
    user(userId) {
      return { where: { userId } };
    },
    approved(approved){
      return { where: { approved } };
    },
    term(termId) {
      return { where: { termId } };
    },
    paginate: paginateScope
  }
});
