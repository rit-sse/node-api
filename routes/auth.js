import { Router } from 'express';
import jwt from 'jsonwebtoken';
import nconf from '../config';
import providers from '../providers';

var router = Router();
var jwtConfig = nconf.get('auth:jwt');

function sign(payload) {
  return {
    token: jwt.sign(
      payload,
      jwtConfig.secret,
      {expiresInMinutes: jwtConfig.expiresInMinutes, algorithm: 'RS256'}
    )
  };
}

router
  .route('/:provider')
    .post((req, res, next) => {
      if (req.params.provider === 'refresh') {
        return res.send(sign(req.auth));
      }

      if (!providers[req.params.provider]) {
        return next({message: 'invalid provider', status: 401});
      }

      var provider = new providers[req.params.provider](req.body.secret, req.body.id);

      provider
        .verify()
        .then(() => provider.findOrCreateUser())
        .then(user => res.send(sign({user: user[0], level: provider.authLevel})))
        .catch(err =>  next({ err, message: err.message, status: 401}));
    });

export default router;
