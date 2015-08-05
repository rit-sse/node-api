import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'express-jwt';
import nconf from './config';

var app = express();

export default app;

app.use(cors());
app.use(jwt({secret: nconf.get('keys:pub')}).unless({method: 'GET', path: ['/token'] }));
if(nconf.get('NODE_ENV') === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes')();

// error handlers
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (env === 'production') {
    res.status(err.status || 500).send('internal server error!');
  }
  else {
    if(env === 'development' && err.stack) {
      console.error(err.stack);
    }
    var status = err.status;
    delete err.status;
    res.status(status || 500).send(err);
  }
});