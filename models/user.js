import sequelize from '../config/sequelize';
import DataTypes from 'sequelize';
import paginate from '../helpers/paginate';
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
  instanceMethods: {
    currentGroups() {
      return Promise.all([
        this.getOfficers({ scope: 'active' }),
        this.getMentors({ scope: 'active' })
      ])
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
    paginate
  }
});
