import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('officers', {
  display: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  endDate: DataTypes.DATE
}, {
  scopes: {
    display(display) {
      return { where: { display } };
    },
    email(email) {
      return { where: { email } };
    },
    primary(primary) {
      return { where: { primary } };
    },
    committee(committee) {
      return { where: { primary: !committee } };
    },
    user(userId) {
      return { where: { userId } };
    },
    term(termId) {
      return { where: { termId } };
    },
    paginate
  }
});
