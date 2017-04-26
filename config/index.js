import nconf from 'nconf';
import database from './database';
import permissions from './permissions';
import auth from './auth';

nconf
  .argv()
  .env()
  .use('memory');

nconf.set('auth', auth);
nconf.set('api:prefix', 'api');
nconf.set('api:version', 'v1');
nconf.set('db', database);
nconf.set('permissions', permissions);

nconf.set('pagination:perPage', 15);

nconf.defaults({
  NODE_ENV: 'development',
  REDIS_PORT_6379_TCP_ADDR: '127.0.0.1',
});

export default nconf;
