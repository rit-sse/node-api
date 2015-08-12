import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('memberships', {
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
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
    paginate
  }
});
