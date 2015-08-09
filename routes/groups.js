import { Router } from 'express';
import Group from '../models/group';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';
import { needs } from '../middleware/permissions';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'name', 'description');
      Group.paginate(scopes, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post(needs('create groups'), (req, res, next) => {
      Group.create(req.body, {fields: ['name', 'description']})
        .then((group) => res.send(group))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Group
        .findById(req.params.id)
        .then((group) => {
          if(group) {
            res.send(group)
          } else {
            next({ message: "Group not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    })
    .put(needs('update groups'), (req, res, next) => {
      Group
        .findById(req.params.id)
        .then((group) => group.updateAttributes(req.body, ({ fields: ['name', 'description']})))
        .then((group) => res.send(group))
        .catch((err) => next(err));
    })
    .delete(needs('destroy groups'), (req, res, next) => {
      Group
        .findById(req.params.id)
        .then((group) => group.destroy())
        .then(() => res.send(204));
    });

export default router;