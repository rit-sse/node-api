'use strict';

import { Router } from 'express';
import User from '../models/user';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'firstName', 'lastName', 'dce');
      User
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      User
        .findById(req.params.id)
        .then(user => {
          if (user) {
            return res.send(user);
          }
          return Promise.reject({ message: 'User not found', status: 404 });
        })
        .catch(err => next(err));
    });

export default router;
