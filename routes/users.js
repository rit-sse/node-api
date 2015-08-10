import { Router } from 'express';
import User from '../models/user';
import scopify from '../helpers/scopify';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'firstName', 'lastName', 'dce');
      User.paginate(scopes, req.query.perPage, req.query.page)
        .then(body => res.send(body))
        .catch(err => next(err));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      User
        .findById(req.params.id)
        .then(user => {
          if (user) {
            res.send(user);
          } else {
            next({ message: 'User not found', status: 404 });
          }
        })
        .catch(err => next(err));
    });

export default router;
