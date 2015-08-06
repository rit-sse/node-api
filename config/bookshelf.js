import knex from 'knex';
import bookshelf from 'bookshelf';
import nconf from './index';

var env = nconf.get('NODE_ENV');
var knexConfig = nconf.get('knex')[env];
var k = knex(knexConfig);

export default bookshelf(k);