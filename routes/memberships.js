import { Router } from 'express';
import Membership from '../models/membership';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'reason', 'group', 'user', 'term');
      Membership.paginate(scopes, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
      Term
        .findOrInitialize({ where: { name: req.body.term.name } })
        .spread((term, created) => {
          if(created) {
            term.startDate = req.body.term.startDate;
            term.endDate = req.body.term.endDate;
            term.save();
          }
          return term;
        })
        .then((term) => {
          req.body.termId = term.id;
          return Membership.create(req.body, {fields: ['reason', 'groupId', 'userId', 'termId' ]})
        })
        .then((membership) => res.send(membership))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Membership
        .findById(req.params.id)
        .then((membership) => {
          if(membership) {
            res.send(membership)
          } else {
            next({ message: "Membership not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    })
    .put((req, res, next) => {
      Membership
        .findById(req.params.id)
        .then((membership) => membership.updateAttributes(req.body, ({ fields: ['reason', 'groupId', 'userId', 'termId' ]})))
        .then((membership) => res.send(membership))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
      Membership
        .findById(req.params.id)
        .then((membership) => membership.destroy())
        .then(() => res.send(204));
    });

export default router;