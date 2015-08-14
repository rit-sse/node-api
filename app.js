'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import nconf from './config';
import router from './routes';
import models from './models';

var app = express();

var env = nconf.get('NODE_ENV');
var apiConfig = nconf.get('api');
var apiPath = `/${apiConfig.prefix}/${apiConfig.version}`;

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

models();
app.use(apiPath, router);

// error handlers
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (env === 'development' && err.stack) {
    console.error(err.stack);
  }
  var status = err.status;
  delete err.status;
  res.status(status || 500).send({ error: err.message });
});

export default app;
