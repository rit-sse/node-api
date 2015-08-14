'use strict';

import nconf from '../config';
import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  var token;
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
  }

  jwt.verify(token, nconf.get('auth:jwt:pub'), { algorithm: 'RS256' }, (err, decoded) => { // eslint-disable-line handle-callback-err
    req.auth = decoded;
    next();
  });
}
