import fs from 'fs';

const development =  fs.existsSync('config/database/development.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/development.json')) : // eslint-disable-line no-sync
  null;
const production =  fs.existsSync('config/database/production.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/production.json')) : // eslint-disable-line no-sync
  null;

const test =  fs.existsSync('config/database/test.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('config/database/test.json')) :  // eslint-disable-line no-sync
  null;

export default {
  development,
  production,
  test,
  migrations: {
    path: 'db/migrations',
  },
};
