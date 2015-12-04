'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import nconf from './config';
import router from './routes';
import models from './models';
import mime from 'mime';

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
  path: [new RegExp(`^${apiPath}/auth/(?!refresh)[a-z]+$`)],
}));

if (env === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const regexp = /\.(json|ics)$/;

  const match = req.path.match(regexp);

  if (!match) {
    return next();
  }
  req.headers.accept = mime.lookup(match[1]);
  req.url = req.url.replace(regexp, '');
  next();
});

models();
app.use(apiPath, router);

// error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.stack) {
    console.error(err.stack);
  }
  const status = err.status;
  Reflect.deleteProperty(err, 'status');
  res.status(status || 500).send({ error: err.message });
});

export default app;
