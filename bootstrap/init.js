import fs from 'fs';
import keygen from '../keygen';
import childProcess from 'child_process';

console.log('Generating Keys..');
keygen();

console.log('Creating Empty Sqlite database...');
fs.closeSync(fs.openSync('./db/development.db', 'w'));

console.log('Migrating database...');
childProcess.exec('knex migrate:latest --knexfile ./config/knexfile.js', function (error, stdout, stderr) {
  console.log(stdout);
  if (error !== null) {
    console.log('exec error: ' + error);
  } else {
    console.log('Seeding database...');
    childProcess.exec('knex migrate:latest --knexfile ./config/knexfile.js', function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
});


