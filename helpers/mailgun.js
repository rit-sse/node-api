import nodemailer from 'nodemailer';
import mailgun from 'nodemailer-mailgun-transport';

import config from '../config';

const mailer = nodemailer.createTransport(mailgun({
  auth: {
    api_key: config.get('email:mailgun:secret'),
    domain: config.get('email:mailgun:domain'),
  },
}));

export default mailer;
