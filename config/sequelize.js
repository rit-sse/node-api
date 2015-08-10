import Sequelize from 'sequelize';
import nconf from './index';

var env = nconf.get('NODE_ENV');
var dbConfig = nconf.get('db')[env];

export default new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);
