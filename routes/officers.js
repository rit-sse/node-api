import { Router } from 'express';
import Officer from '../models/officer';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';

var router = Router();

router
  .route('/')
    .get(paginate, (req, res, next) => {
      if (req.query.primary === 'true') {
        req.query.primary = true;
      } else if (req.query.primary === 'false') {
        req.query.primary = false;
      } else {
        delete req.query.primary;
      }
      var scopes = scopify(req.query, 'display', 'email', 'user', 'term', 'primary', 'committee', 'active');
      Officer
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map(officer => {
            var o = officer.get({
              plain: true
            });
            delete o.term;
            return o;
          })
        }))
        .catch(err => next(err));
    })
    .post(needs('officers', 'create'), (req, res, next) => {
      Term
        .findOrInitialize({ where: { name: req.body.term.name } })
        .spread((term, created) => {
          if (created) {
            term.startDate = req.body.term.startDate;
            term.endDate = req.body.term.endDate;
            term.save();
          }
          return term;
        })
        .then(term => {
          req.body.termId = term.id;
          Officer.create(req.body, {fields: ['display', 'email', 'primary', 'userId', 'termId', 'committeeId']})
            .then(officer => res.status(201).send(officer))
            .catch(err => {
              err.status = 422;
              next(err);
            });
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
            Promise.reject({ message: 'Officer not found', status: 404 });
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
              fields: ['display', 'email', 'userId', 'termId', 'committeeId', 'primary']
            });
          } else {
            Promise.reject({ message: 'Officer not found', status: 404 });
          }
        })
        .then(officer => res.send(officer))
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
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
