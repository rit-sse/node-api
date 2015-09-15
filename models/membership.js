'use strict';

import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
import moment from 'moment';
import 'moment-range';

export default sequelize.define('memberships', {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: false,
  },
  endDate: {
    type: DataTypes.DATE,
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
    committee(committeeId) {
      return { where: { committeeId } };
    },
    user(userDce) {
      return { where: { userDce } };
    },
    approved(approved) {
      return { where: { approved } };
    },
    between(range) {
      const dates = moment.range(range);
      return {
        where: {
          startDate: {
            $between: [dates.start.toDate(), dates.end.toDate()],
          },
        },
      };
    },
    active(date) {
      return {
        where: {
          startDate: {
            $lte: date,
          },
          endDate: {
            $gte: date,
          },
        },
      };
    },
    paginate,
  },
});
