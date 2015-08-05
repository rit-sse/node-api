import nconf from 'nconf';
import fs from 'fs';

nconf
  .env()
  .file('database', './database.json')

nconf.set("keys:secret", fs.readFileSync('./keys/private.key'))
nconf.set("keys:pub", fs.readFileSync('./keys/public.key'))
nconf.set("api:prefix", "api")
nconf.set("api:version", "v1")

nconf.defaults({
  'NODE_ENV': 'development'
});

export default nconf;