import fs from 'fs';
import keygen from '../keygen';
import knex from '../config/bookshelf';

console.log('Generating Keys..');
keygen();
process.chdir('./config/');
if(knex.client.config.connection.filename){
  console.log('Creating Empty Sqlite database...');
  fs.closeSync(fs.openSync(knex.client.config.connection.filename, 'w'));
}

console.log('Migrating database...');
knex.migrate.latest()
  .spread(function(batchNo, log) {
    if (log.length === 0) {
      console.log('Already up to date');
    }
    console.log(`Batch ${batchNo} run: ${log.length} migrations \n${log.join('\n')}`);
    if(knex.client.config.seeds) {
      return knex.seed.run();
    }else {
      knex.destroy();
    }
  })
  .spread(function(log) {
    if (log.length === 0) {
      console.log('No seed files exist');
    }
    console.log(`Ran ${log.length} seed files \n${log.join('\n')}`);
    knex.destroy();
  })
  .catch(function(err){
    console.error(err.stack);
    knex.destroy();
  });

