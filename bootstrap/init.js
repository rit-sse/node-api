import fs from 'fs';
import Umzug from 'umzug';
import keygen from '../keygen';
import sequelize from '../config/sequelize';
import nconf from '../config';

import seeder from '../db/seeds';

export default function bootstrap() {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      path: nconf.get('db:migrations:path'),
      params: [sequelize.getQueryInterface(), sequelize.constructor],
    },
  });

  if (nconf.get('keygen')) {
    console.log('Generating Keys..');
    keygen();
  }
  if (sequelize.options.storage) {
    fs.closeSync(fs.openSync(sequelize.options.storage, 'w')); // eslint-disable-line no-sync
  }

  return umzug.up()
  .then(() => {
    if (nconf.get('seed')) {
      console.log('Seeding database...');
      return seeder();
    }
  });
}

if (require.main === module) {
  bootstrap()
    .then(() => sequelize.close());
}
