import fs from 'fs';
import keygen from '../keygen';
import bookshelf from '../config/bookshelf';

console.log('Generating Keys..');
keygen();
console.log('Creating Empty Sqlite database...');
fs.closeSync(fs.openSync('./db/development.db', 'w'));


console.log('Migrating database...');
bookshelf.knex.migrate.latest()
  .spread(function(batchNo, log) {
    if (log.length === 0) {
      console.log('Already up to date');
    }
    console.log('Batch ' + batchNo + ' run: ' + log.length + ' migrations \n' + log.join('\n'));
    if(bookshelf.knex.client.config.seeds) {
      return bookshelf.knex.seed.run();
    }else {
      bookshelf.knex.destroy();
    }
  })
  .spread(function(log) {
    if (log.length === 0) {
      console.log('No seed files exist');
    }
    console.log('Ran ' + log.length + ' seed files \n' + log.join('\n'));
    bookshelf.knex.destroy();
  })
  .catch(function(err){
    console.error(err.stack);
    bookshelf.knex.destroy();
  });

