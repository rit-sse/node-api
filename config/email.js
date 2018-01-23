export default {
  mailgun: {
    secret: process.env.MAILGUN_SECRET,
    domain: process.env.MAILGUN_DOMAIN || 'sse.rit.edu',
  },
};
