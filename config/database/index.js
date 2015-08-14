'use strict';

import fs from 'fs';

var development =  fs.existsSync('config/database/development.json') // eslint-disable-line no-sync
  ? JSON.parse(fs.readFileSync('config/database/development.json')) // eslint-disable-line no-sync
  : null;
var production =  fs.existsSync('config/database/production.json') // eslint-disable-line no-sync
  ? JSON.parse(fs.readFileSync('config/database/production.json')) // eslint-disable-line no-sync
  : null;

export default {
  development,
  production,
  migrations: {
    path: 'db/migrations',
  },
};
