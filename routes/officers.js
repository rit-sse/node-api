'use strict';

import { Router } from 'express';
import Officer from '../models/officer';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      if (req.query.primary === 'true') {
        req.query.primary = true;
      } else if (req.query.primary === 'false') {
        req.query.primary = false;
      } else {
        Reflect.deleteProperty(req.query, 'primary');
      }
      const scopes = scopify(req.query, 'display', 'email', 'user', 'term', 'primary', 'committee', 'active');
      Officer
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map(officer => {
            const o = officer.get({ plain: true });
            Reflect.deleteProperty(o, 'term');
            return o;
          }),
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
          req.body.termName = term.name;
          Officer.create(req.body, { fields: ['display', 'email', 'primary', 'userId', 'termName', 'committeeId'] })
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
            return res.send(officer);
          }
          return Promise.reject({ message: 'Officer not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('officers', 'update'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then(officer => {
          if (officer) {
            return officer.updateAttributes(req.body, {
              fields: ['display', 'email', 'userId', 'termName', 'committeeId', 'primary'],
            });
          }
          return Promise.reject({ message: 'Officer not found', status: 404 });

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
          }
          return Promise.reject({ message: 'Officer not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
