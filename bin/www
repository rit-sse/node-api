#!/usr/bin/env node
import app from '../app';
import nconf from '../config';

const server = app.listen(nconf.get('PORT') || 3000, () => {
  console.log(`Express server listening on port ${server.address().port}`); // eslint-disable-line no-console
});
