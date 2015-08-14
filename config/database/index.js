'use strict';

import fs from 'fs';

var development =  fs.existsSync('config/database/development.json')
  ? JSON.parse(fs.readFileSync('config/database/development.json'))
  : null;
var production =  fs.existsSync('config/database/production.json')
  ? JSON.parse(fs.readFileSync('config/database/production.json'))
  : null;

export default {
  development,
  production,
  migrations: {
    path: 'db/migrations',
  },
};
