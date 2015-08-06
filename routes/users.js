import { Router } from 'express';
import User from '../models/user';
import whitelist from '../helpers/whitelist';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var query = whitelist(req.query, 'firstName', 'lastName', 'dce');
      User
        .paginate(query, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
      var body = whitelist(req.body, 'firstName', 'lastName', 'dce');
      new User(body).save()
        .then((user) => res.send(user))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      User
        .where({id: req.params.id})
        .fetch()
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
      var body = whitelist(req.body, 'firstName', 'lastName', 'dce');
      User
        .where({id: req.params.id})
        .fetch()
        .then((user) => user.set(body).save())
        .then((user) => res.send(user))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
      User
        .where({id: req.params.id})
        .destroy(req.params.id)
        .then(() => res.send(204));
    });

export default router;