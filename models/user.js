import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';
import Term from './term';

export default sequelize.define('users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  dce: {
    type: Sequelize.STRING,
    validate: { is:  /[a-z]{2,3}\d{4}/ }
  }
}, {
  classMethods: { paginate },
  instanceMethods: {
    activeMemberships() {
      return Term
        .scope({method: ['date', new Date()]})
        .find()
        .then(term => {
          if (!term) {
            return [];
          }
          return this.getMemberships({
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
        });
    },
    can(permission, level) {
      return this
        .activeMemberships()
        .map(membership => membership.getGroup())
        .map(group => group.getPermissions())
        .reduce((all,permissions) => all.concat(permissions), [])
        .filter(p =>  p.name === permission && level >= p.level)
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
