'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Term from './term';

export default sequelize.define('officers', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  endDate: DataTypes.DATE,
}, {
  scopes: {
    email(email) {
      return { where: { email } };
    },
    primary(primary) {
      return { where: { primary } };
    },
    committee(committee) {
      return { where: { primary: !committee } };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    term(termName) {
      return { where: { termName } };
    },
    active() {
      return {
        where: {
          endDate: {
            $or: {
              $eq: null,
              $gt: new Date(),
            },
          },
        },
        include: [{
          model: Term.scope({ method: ['date', new Date()] }),
        }],
      };
    },
    paginate,
  },
});
