'use strict';

import { Router } from 'express';
import Lingo from '../models/lingo';
import scopify from '../helpers/scopify';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(verifyUser, paginate, needsApprovedIndex('lingo'), (req, res, next) => {
      const scopes = scopify(req.query, 'phrase', 'definition', 'search');
      Lingo
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      Lingo.create(req.body, { fields: ['phrase', 'definition'] })
        .then(lingo => res.status(201).send(lingo))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(verifyUser, needsApprovedOne('lingo'), (req, res, next) => {
      Lingo
        .findById(req.params.id)
        .then(lingo => {
          if (lingo) {
            if (!lingo.approved && !req.auth.allowed) {
              return next({
                message: `User does not have permission: unapproved lingo`,
                status: 403,
              });
            }
            return res.send(lingo);
          }
          return Promise.reject({ message: 'Lingo not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('lingo', 'update'), (req, res, next) => {
      Lingo
        .findById(req.params.id)
        .then(lingo => {
          if (lingo) {
            return lingo.updateAttributes(req.body, {
              fields: ['phrase', 'definition', 'approved'],
            });
          }
          return Promise.reject({ message: 'Lingo not found', status: 404 });

        })
        .then(lingo => res.send(lingo))
        .catch(err => next(err));
    })
    .delete(needs('lingo', 'destroy'), (req, res, next) => {
      Lingo
        .findById(req.params.id)
        .then(lingo => {
          if (lingo) {
            return lingo.destroy();
          }
          return Promise.rejtect({ message: 'Lingo not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
