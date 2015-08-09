import { Router } from 'express';
import Officer from '../models/officer';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';
import { needs } from '../middleware/permissions';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'display', 'email', 'user');
      Officer.paginate(scopes, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post(needs('create officers'), (req, res, next) => {
      Officer.create(req.body, {fields: ['display', 'email', 'userId']})
        .then((officer) => res.send(officer))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Officer
        .findById(req.params.id)
        .then((officer) => {
          if(officer) {
            res.send(officer)
          } else {
            next({ message: "Officer not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    })
    .put(needs('update officers'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then((officer) => officer.updateAttributes(req.body, ({ fields: ['display', 'email', 'userId']})))
        .then((officer) => res.send(officer))
        .catch((err) => next(err));
    })
    .delete(needs('destroy officers'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then((officer) => officer.destroy())
        .then(() => res.send(204));
    });

export default router;