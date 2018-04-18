export default {
  mailgun: {
    // NOTE: 'test' prevents 'mailgun-js' from complaining that no secret has been set
    // TODO: Read in environment variables from a '.env' file so we can set these default values in development
    secret: process.env.MAILGUN_SECRET || 'test',
    domain: process.env.MAILGUN_DOMAIN || 'sse.rit.edu',
  },
};
