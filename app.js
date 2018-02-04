import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import mime from 'mime';
import nconf from './config';
import router from './routes';
import './models';
import './events';

const app = express();

const env = nconf.get('NODE_ENV');
const apiConfig = nconf.get('api');
const apiPath = `/${apiConfig.prefix}/${apiConfig.version}`;

app.use(cors());
app.use(jwt({
  secret: nconf.get('auth:jwt:pub'),
  requestProperty: 'auth',
  algorithms: ['RS256', 'RS384', 'RS512'],
}).unless({
  method: 'GET',
  path: [
    new RegExp(`^${apiPath}/auth/(?!refresh)[a-z]+$`),
  ],
}));

if (env === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// If an extension is provided in the route, we set the proper ACCEPT header
// This is primarily used for events
// /api/v2/events.json    Set the ACCEPT 'application/json' header
// /api/v2/events.ics     Set the ACCEPT 'text/calendar' header
app.use((req, res, next) => {
  const regexp = /\.(json|ics)$/;

  const match = req.path.match(regexp);

  if (!match) {
    return next();
  }

  // NOTE: Will overwrite any/invalid existing ACCEPT header if the route extension matches
  req.headers.accept = mime.getType(match[1]);
  req.url = req.url.replace(regexp, ''); // Remove the extension so that the router routes properly
  return next();
});

app.use(apiPath, router);

// error handlers
app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.path}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.stack && env === 'development') {
    console.error(err.stack); // eslint-disable-line no-console
  }
  const status = err.status;
  Reflect.deleteProperty(err, 'status');
  res.status(status || 500).send({ error: err.message });
});

export default app;
