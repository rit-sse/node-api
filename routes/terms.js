import { Router } from 'express';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'name', 'date');
      Term.paginate(scopes, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })

router
  .route('/:id')
    .get((req, res, next) => {
      Term
        .findById(req.params.id)
        .then((term) => {
          if(term) {
            res.send(term)
          } else {
            next({ message: "Term not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    });

export default router;