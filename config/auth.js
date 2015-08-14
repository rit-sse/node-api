'use strict';

import fs from 'fs';
import google from '../keys/google.json';

export default {
  jwt: {
    secret: fs.readFileSync('./keys/private.key').toString(), // eslint-disable-line no-sync
    pub: fs.readFileSync('./keys/public.key').toString(), // eslint-disable-line no-sync
    expiresInMinutes: 60*24*2,
  },

  slack: {
    secret: fs.readFileSync('./keys/slack-secret').toString(), // eslint-disable-line no-sync
  },

  google: {
    id: google.web.client_id,
    secret: google.web.client_secret,
  },
};
