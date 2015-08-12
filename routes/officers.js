import { Router } from 'express';
import Officer from '../models/officer';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'display', 'email');
      Officer.paginate(scopes, req.query.perPage, req.query.page)
        .then(body => res.send(body))
        .catch(err => next(err));
    })
    .post(needs('officers', 'create'), (req, res, next) => {
      Officer.create(req.body, {fields: ['display', 'email', 'userId']})
        .then(officer => res.send(officer))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Officer
        .findById(req.params.id)
        .then(officer => {
          if (officer) {
            res.send(officer);
          } else {
            next({ message: 'Officer not found', status: 404 });
          }
        })
        .catch(err => next(err));
    })
    .put(needs('officers', 'update'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then(officer => {
          if (officer) {
            return officer.updateAttributes(req.body, {
              fields: ['display', 'email']
            });
          } else {
            next({ message: 'Officer not found', status: 404 });
          }
        })
        .then(officer => {
          if (officer) {
            res.send(officer);
          }
        })
        .catch(err => next(err));
    })
    .delete(needs('officers', 'destroy'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then(officer => {
          if (officer) {
            return officer.destroy();
          } else {
            next({ message: 'Officer not found', status: 404 });
          }
        })
        .then(officer => {
          if (officer){
            res.sendStatus(204);
          }
        })
        .catch(err => next(err));
    });

export default router;
