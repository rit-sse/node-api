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

console.log('Generating Keys..');
keygen();
if(sequelize.options.storage ){
  console.log('Creating Empty Sqlite database...');
  fs.closeSync(fs.openSync(sequelize.options.storage, 'w'));
}

console.log('Migrating database...');
umzug.up().then((migrations) => {
  var files = migrations.map((m) => m.file ).join('\n')
  console.log(`Ran migrations:\n${files}` );
})
.then(()=> {
  console.log('Seeding database...');

  seeder();
});
// knex.migrate.latest()
//   .spread(function(batchNo, log) {
//     if (log.length === 0) {
//       console.log('Already up to date');
//     }
//     console.log(`Batch ${batchNo} run: ${log.length} migrations \n${log.join('\n')}`);
//     if(knex.client.config.seeds) {
//       return knex.seed.run();
//     }else {
//       knex.destroy();
//     }
//   })
//   .spread(function(log) {
//     if (log.length === 0) {
//       console.log('No seed files exist');
//     }
//     console.log(`Ran ${log.length} seed files \n${log.join('\n')}`);
//     knex.destroy();
//   })
//   .catch(function(err){
//     console.error(err.stack);
//     knex.destroy();
//   });

