import sequelize from '../config/sequelize';
import Sequelize from 'sequelize';
import {paginateScope, paginate} from '../helpers/paginate';
import Permission from './permission';
import Promise from 'bluebird';

export default sequelize.define('groups', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: Sequelize.STRING,
}, {
  instanceMethods: {
    addPermissionsByName(...names) {
      return Promise
        .map(names, name => Permission.find({ where: {name}}))
        .map(permission => this.addPermission(permission));
    }
  },
  classMethods: { paginate },
  scopes: {
    name(name) {
      return { where: { name } };
    },
    description(description) {
      return { where: { description } };
    },
    paginate: paginateScope
  }
});
