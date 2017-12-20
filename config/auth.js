import fs from 'fs';

const google = fs.existsSync('./keys/google.json') ? // eslint-disable-line no-sync
  JSON.parse(fs.readFileSync('./keys/google.json')).web : {}; // eslint-disable-line no-sync

export default {
  jwt: {
    secret: fs.readFileSync('./keys/private.key').toString(), // eslint-disable-line no-sync
    pub: fs.readFileSync('./keys/public.key').toString(), // eslint-disable-line no-sync
    expiresIn: '2 days',
  },

  slack: {
    secret: process.env.SLACK_SECRET || 'my_super_secret',
  },

  google: {
    id: google.client_id || process.env.GOOGLE_CLIENT_ID,
    secret: google.client_secret || process.env.GOOGLE_CLIENT_SECRET,
    key: google.api_key || process.env.GOOGLE_API_KEY,
    calendars: {
      mentor: (google.calendars ? google.calendars.mentor : null) || process.env.MENTOR_GOOGLE_CALENDAR,
    },
  },
};
