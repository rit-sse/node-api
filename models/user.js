import DataTypes from 'sequelize';
import Promise from 'bluebird';
import sequelize from '../config/sequelize';
import paginate from '../helpers/paginate';
import sorting from '../helpers/sorting';
import nconf from '../config';
import Officers from './officer';
import Mentors from './mentor';

const Users = sequelize.define('users', {
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
    orderBy(field, direction) {
      return sorting(field, direction, [
        'firstName',
        'lastName',
        'dce',
        'image',
        'createdAt',
        'updatedAt',
      ]);
    },
  },
});

Users.prototype.currentGroups = () => Promise.all([
  Officers.scope(
    { method: ['active', new Date()] }
  ).findAll(),
  Mentors.scope(
    { method: ['active', new Date()] }
  ).findAll(),
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

Users.prototype.can = (endpoint, action, level) => {
  const permission = nconf.get('permissions')[endpoint][action];
  return Users.prototype
    .currentGroups()
    .filter(group => permission.groups[group] && level >= permission.level)
    .then((p) => {
      if (p.length === 0) {
        return Promise.reject(false);
      }
    });
};

export default Users;
