import fs from 'fs';

export default {
  jwt: {
    secret: fs.readFileSync('./keys/private.key').toString(), // eslint-disable-line no-sync
    pub: fs.readFileSync('./keys/public.key').toString(), // eslint-disable-line no-sync
    expiresInMinutes: 60*24*2,
  },

  slack: {
    secret: process.env.SLACK_SECRET || 'my_super_secret',
  },

  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
};
