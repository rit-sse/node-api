import nconf from 'nconf';
import fs from 'fs';
import database from './database.json';

nconf
  .env()
  .use('memory');

nconf.set("keys:secret", fs.readFileSync('./keys/private.key'));
nconf.set("keys:pub", fs.readFileSync('./keys/public.key'));
nconf.set("api:prefix", "api");
nconf.set("api:version", "v1");
nconf.set("db", database);

nconf.set("pagination:perPage", 15);

nconf.defaults({
  'NODE_ENV': 'development'
});

export default nconf;