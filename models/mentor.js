'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import Term from './term';
import Specialty from './specialty';

export default sequelize.define('mentors', {
  endDate: DataTypes.DATE,
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  scopes: {
    time(time) {
      return {
        include: [{
          model: MentorShift.scope({ method: ['time', time] }),
        }],
      };
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
    user(userDce) {
      return { where: { userDce } };
    },
    term(termName) {
      return { where: { termName } };
    },
    specialty(name) {
      return {
        include: [{
          model: Specialty,
          where: { name },
        }],
      };
    },
    paginate,
  },
});
