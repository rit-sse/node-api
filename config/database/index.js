import fs from 'fs';

const development =  fs.existsSync('config/database/configs/development.json') // eslint-disable-line no-sync
  ? JSON.parse(fs.readFileSync('config/database/configs/development.json')) // eslint-disable-line no-sync
  : null;
const production =  fs.existsSync('config/database/configs/production.json') // eslint-disable-line no-sync
  ? JSON.parse(fs.readFileSync('config/database/configs/production.json')) // eslint-disable-line no-sync
  : null;

const test =  fs.existsSync('config/database/configs/test.json') // eslint-disable-line no-sync
  ? JSON.parse(fs.readFileSync('config/database/configs/test.json')) // eslint-disable-line no-sync
  : null;

export default {
  development,
  production,
  test,
  migrations: {
    path: 'db/migrations',
  },
};
