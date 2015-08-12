import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';
import Term from './term';
import nconf from '../config';
import Promise from 'bluebird';

export default sequelize.define('users', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  dce: {
    type: DataTypes.STRING,
    validate: {
      is:  /[a-z]{2,3}\d{4}/
    },
    unique: true,
    allowNull: false
  }
}, {
  classMethods: { paginate },
  instanceMethods: {
    officerFor(term) {
      return this.getOfficers({
        where: {
          termId: term.id,
          endDate: {
            $or: {
              $eq: null,
              $gt: new Date()
            }
          }
        }
      });
    },
    mentorFor(term) {
      return this.getMentorShifts({
        where: {
          termId: term.id,
          endDate: {
            $or: {
              $eq: null,
              $gt: new Date()
            }
          }
        }
      });
    },
    currentGroups() {
      return Term
        .currentTerm()
        .then(term => {
          if (!term) {
            return [];
          }
          return Promise.all([this.officerFor(term), this.mentorFor(term)])
            .spread((officers, mentors) => {
              var groups = [];
              if (officers.length > 0) {
                groups.push('officers');
                if (officers[0].primary) {
                  groups.push('primary');
                }
              }
              if (mentors.length > 0) {
                groups.push('mentors');
              }
              return groups;
            });
        });
    },
    can(endpoint, action, level) {
      var permission = nconf.get('permissions')[endpoint][action];
      return this
        .currentGroups()
        .filter(group => permission.groups[group] && level >= permission.level)
        .then(p => {
          if (p.length === 0) {
            return Promise.reject(false);
          }
        });
    }
  },
  scopes: {
    firstName(firstName) {
      return { where: { firstName } };
    },
    lastName(lastName) {
      return { where: { lastName } };
    },
    dce(dce) {
      return { where: { dce } };
    },
    paginate: paginateScope
  }
});
