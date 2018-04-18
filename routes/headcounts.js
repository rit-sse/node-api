import { Router } from 'express';
import Headcount from '../models/headcount';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import sorting from '../middleware/sorting';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, sorting, (req, res, next) => {
      const scopes = scopify(req.query, 'count', 'greaterThan', 'lessThan', 'between', 'date', 'user');
      Headcount.scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    })
    .post(needs('headcounts', 'create'), (req, res, next) => {
      req.body.userDce = req.auth.user.dce;
      Headcount.create(req.body, { fields: ['count', 'userDce'] })
        .then(headcount => res.status(201).send(headcount))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Headcount
        .findById(req.params.id)
        .then((headcount) => {
          if (headcount) {
            return res.send(headcount);
          }
          return Promise.reject({ message: 'Headcount not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('headcounts', 'update'), (req, res, next) => {
      Headcount
        .findById(req.params.id)
        .then((headcount) => {
          if (headcount) {
            return headcount.updateAttributes(req.body, {
              fields: ['count'],
            });
          }
          return Promise.reject({ message: 'Headcount not found', status: 404 });
        })
        .then(headcount => res.send(headcount))
        .catch(err => next(err));
    })
    .delete(needs('headcounts', 'destroy'), (req, res, next) => {
      Headcount
        .findById(req.params.id)
        .then((headcount) => {
          if (headcount) {
            return headcount.destroy();
          }
          return Promise.reject({ message: 'Headcount not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
