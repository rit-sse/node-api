import fs from 'fs';
import google from '../keys/google.json';

export default {
  jwt: {
    secret: fs.readFileSync('./keys/private.key').toString(),
    pub: fs.readFileSync('./keys/public.key').toString(),
    expiresInMinutes: 60*24*2
  },

  slack: {
    secret: fs.readFileSync('./keys/slack-secret').toString()
  },

  google: {
    id: google.web.client_id,
    secret: google.web.client_secret
  },

  levels: {
    low: 10,
    high: 100
  }
}