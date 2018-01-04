import DataTypes from 'sequelize';
import Promise from 'bluebird';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import nconf from '../config';

export default sequelize.define('users', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  image: DataTypes.STRING, // TODO: Validate that this is a URL
  dce: {
    type: DataTypes.STRING,
    validate: {
      is: {
        args: /^[a-z]{2,3}\d{4}$/,
        msg: 'Must be a valid dce',
      },
    },
    primaryKey: true,
    allowNull: false,
  },
}, {
  instanceMethods: {
    currentGroups() {
      return Promise.all([
        this.getOfficers({ scope: { method: ['active', new Date()] } }),
        this.getMentors({ scope: { method: ['active', new Date()] } }),
      ])
        .spread((officers, mentors) => {
          const groups = [];
          if (officers.length > 0) {
            groups.push('officers');
            if (officers[0].primaryOfficer) {
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
      const permission = nconf.get('permissions')[endpoint][action];
      return this
        .currentGroups()
        .filter(group => permission.groups[group] && level >= permission.level)
        .then((p) => {
          if (p.length === 0) {
            return Promise.reject(false);
          }
        });
    },
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
    paginate,
  },
});
