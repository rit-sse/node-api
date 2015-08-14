'use strict';

import { Router } from 'express';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';

var router = Router();

router
  .route('/')
    .get(paginate, (req, res, next) => {
      var scopes = scopify(req.query, 'name', 'date');
      Term
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
      Term
        .findById(req.params.id)
        .then(term => {
          if (term) {
            return res.send(term);
          }
          return Promise.reject({ message: 'Term not found', status: 404 });
        })
        .catch(err => next(err));
    });

export default router;
