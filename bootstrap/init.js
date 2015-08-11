import fs from 'fs';
import Umzug from 'umzug';
import keygen from '../keygen';
import sequelize from '../config/sequelize';
import nconf from '../config';

import seeder from '../db/seeds';

var umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize
  },
  migrations: {
    path: nconf.get('db:migrations:path'),
    params: [sequelize.getQueryInterface(), sequelize.constructor]
  }
});

if (nconf.get('keygen')) {
  console.log('Generating Keys..');
  keygen();
}
if (sequelize.options.storage ){
  console.log('Creating Empty Sqlite database...');
  fs.closeSync(fs.openSync(sequelize.options.storage, 'w'));
}

console.log('Migrating database...');
umzug.up().then(migrations => {
  var files = migrations.map(m => m.file ).join('\n');
  console.log(`Ran migrations:\n${files}` );
})
.then(() => {
  if (nconf.get('seed')) {
    console.log('Seeding database...');
    return seeder();
  }
})
.then(() => {
  sequelize.close();
});
