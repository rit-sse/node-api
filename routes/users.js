import { Router } from 'express';
import User from '../models/user';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'firstName', 'lastName', 'dce');
      paginate(User.scope(scopes), req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
      User.create(req.body, {fields: ['firstName', 'lastName', 'dce' ]})
        .then((user) => res.send(user))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      User
        .findById(req.params.id)
        .then((user) =>{
          if(user) {
            res.send(user)
          } else {
            next({ message: "User not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    })
    .put((req, res, next) => {
      User
        .findById(req.params.id)
        .then((user) => user.updateAttributes(req.body, ({ fields: ['firstName', 'lastName', 'dce']})))
        .then((user) => res.send(user))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
      User
        .findById(req.params.id)
        .then((user) => user.destroy())
        .then(() => res.send(204));
    });

export default router;