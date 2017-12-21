import { Router } from 'express';
import jwt from 'jsonwebtoken';
import nconf from '../config';
import providers from '../providers';
import verifyUser from '../middleware/verify-user';

const router = Router(); // eslint-disable-line new-cap

router.use((req, res, next) => {
  res.header('Cache-Control', 'max-age=0');
  return next();
});


const jwtConfig = nconf.get('auth:jwt');

function sign(payload) {
  // Since version 6.0.0 of 'node-jsonwebtoken', 'expiresIn' and 'exp' are
  // mutually exclusive (and will error if both are provided). This means
  // if the 'payload' provided has an 'exp' key - which will happen if
  // we're refreshing an old token - we have to remove it. We also need
  // to remove the 'iat' key so that the new token will have a new 'iat'.
  // If we don't remove 'iat', then the new token's 'exp' will be based
  // off of the old 'iat' - we will not have actually refreshed the token.
  // See: https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md#600---2016-04-27
  delete payload.iat; // delete works even if 'iat' doesn't exist
  delete payload.exp; // delete works even if 'exp' doesn't exist

  return {
    token: jwt.sign(
      payload,
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn, algorithm: 'RS256' }
    ),
  };
}

router
  .route('/')
    .get(verifyUser, (req, res, next) => {
      if (req.auth) {
        return res.send({
          firstName: req.auth.user.firstName,
          lastName: req.auth.user.lastName,
          dce: req.auth.user.dce,
        });
      }
      return next({ message: 'not logged in', status: 401 });
    });

router
  .route('/googleClientID')
    .get((req, res) => {
      const token = nconf.get('auth').google.id;
      res.send({ token });
    });

router
  .route('/:provider')
    .post((req, res, next) => {
      if (req.params.provider === 'refresh') {
        return res.send(sign(req.auth));
      }

      if (!providers[req.params.provider]) {
        return next({ message: 'invalid provider', status: 401 });
      }

      const provider = new providers[req.params.provider](
        req.body.secret,
        req.body.id
      );

      provider
        .verify()
        .then(() => provider.findOrCreateUser())
        .then(user => res.send(sign({
          user: user[0], level: provider.authLevel,
        })))
        .catch((err) => {
          err.status = 401;
          next(err);
        });
    });

export default router;
