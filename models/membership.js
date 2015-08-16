'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';

export default sequelize.define('memberships', {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  defaultScopes: {
    where: {
      approved: true,
    },
  },
  scopes: {
    reason(reason) {
      return { where: { reason } };
    },
    group(groupId) {
      return { where: { groupId } };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    approved(approved) {
      return { where: { approved } };
    },
    term(termName) {
      return { where: { termName } };
    },
    paginate,
  },
});
