'use strict';

import { Router } from 'express';
import AgendaItem from '../models/agenda-item';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'body', 'officer', 'user', 'week');
      AgendaItem.scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    })
    .post(needs('agendas', 'create'), (req, res, next) => {
      req.body.userDce = req.auth.user.dce;
      AgendaItem.create(req.body, { fields: ['body', 'week', 'officerId', 'userDce'] })
        .then(agendaItem => res.status(201).send(agendaItem))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      AgendaItem
        .findById(req.params.id)
        .then(agendaItem => {
          if (agendaItem) {
            return res.send(agendaItem);
          }
          return Promise.reject({ message: 'Agenda not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('agendas', 'update'), (req, res, next) => {
      AgendaItem
        .findById(req.params.id)
        .then(agendaItem => {
          if (agendaItem) {
            return agendaItem.updateAttributes(req.body, {
              fields: ['body', 'week', 'officerId'],
            });
          }
          return Promise.reject({ message: 'Agenda not found', status: 404 });
        })
        .then(agendaItem => res.send(agendaItem))
        .catch(err => next(err));
    })
    .delete(needs('agendas', 'destroy'), (req, res, next) => {
      AgendaItem
        .findById(req.params.id)
        .then(agendaItem => {
          if (agendaItem) {
            return agendaItem.destroy();
          }
          return Promise.reject({ message: 'Agenda not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
