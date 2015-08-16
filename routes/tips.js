'use strict';

import { Router } from 'express';
import Tip from '../models/tip';
import scopify from '../helpers/scopify';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(verifyUser, paginate, needsApprovedIndex('tips'), (req, res, next) => {
      const scopes = scopify(req.query, 'body', 'user', 'search');
      Tip
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
      req.body.userId = req.auth.user.id;
      Tip.create(req.body, { fields: ['body', 'userId'] })
        .then(tip => res.status(201).send(tip))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(verifyUser, needsApprovedOne('tips'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            if (!tip.approved && !req.auth.allowed) {
              return next({
                message: `User does not have permission: unapproved tips`,
                status: 403,
              });
            }
            return res.send(tip);
          }
          return Promise.reject({ message: 'Tip not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('tips', 'update'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            return tip.updateAttributes(req.body, {
              fields: ['body', 'approved'],
            });
          }
          return Promise.reject({ message: 'Tip not found', status: 404 });

        })
        .then(tip => res.send(tip))
        .catch(err => next(err));
    })
    .delete(needs('tips', 'destroy'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            return tip.destroy();
          }
          return Promise.reject({ message: 'Tip not found', status: 404 });
        })
        .then(tip => res.send(tip))
        .catch(err => next(err));
    });

export default router;
