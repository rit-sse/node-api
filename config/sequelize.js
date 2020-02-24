import { Sequelize } from 'sequelize';
import nconf from './index';

const env = nconf.get('NODE_ENV');
const dbConfig = nconf.get('db')[env];

export default new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig
);
