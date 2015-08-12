import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';

export default sequelize.define('officerships', {
  endDate: DataTypes.DATE
}, {
  scopes: {
    user(userId) {
      return { where: { userId } };
    },
    term(termId) {
      return { where: { termId } };
    },
    officer(officerId) {
      return { where: { officerId } };
    }
  }
});
