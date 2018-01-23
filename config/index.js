import nconf from 'nconf';

import database from './database';
import permissions from './permissions';
import auth from './auth';
import email from './email';

nconf
  .argv()
  .env()
  .use('memory');

nconf.set('auth', auth);
nconf.set('api:prefix', 'api');
nconf.set('api:version', 'v2');
nconf.set('db', database);
nconf.set('email', email);
nconf.set('permissions', permissions);

nconf.set('pagination:perPage', 15);

nconf.defaults({
  NODE_ENV: 'development',
});

export default nconf;
