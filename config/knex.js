import knex from 'knex';
import nconf from './index';

var env = nconf.get('NODE_ENV');
var knexConfig = nconf.get('knex')[env];

export default knex(knexConfig);