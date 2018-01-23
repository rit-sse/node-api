import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

import nconf from '../config';

const mailer = nodemailer.createTransport(mailgun({
  auth: {
    api_key: nconf.get('email:mailgun:secret'),
    domain: nconf.get('email:mailgun:domain'),
  },
}));

export default mailer;
