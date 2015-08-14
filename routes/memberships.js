'use strict';

import { Router } from 'express';
import Membership from '../models/membership';
import Term from '../models/term';
import scopify from '../helpers/scopify';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(verifyUser, paginate, needsApprovedIndex('memberships'), (req, res, next) => {
      const scopes = scopify(req.query, 'reason', 'committee', 'user', 'term', 'approved');
      Membership
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
    .post(needs('create memberships'), (req, res, next) => {
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
          return Membership.create(req.body, {
            fields: ['reason', 'committeeId', 'userId', 'termId'],
          });
        })
        .then(membership => res.status(201).send(membership))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(verifyUser, needsApprovedOne('memberships'), (req, res, next) => {
      Membership
        .findById(req.params.id)
        .then(membership => {
          if (membership) {
            if (!membership.approved && !req.auth.allowed) {
              return Promise.reject({
                message: `User does not have permission: unapproved memberships`,
                status: 403,
              });
            }
            return res.send(membership);
          }
          return Promise.reject({ message: 'Membership not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('update memberships'), (req, res, next) => {
      Membership
        .findById(req.params.id)
        .then(membership => {
          if (membership) {
            return membership.updateAttributes(req.body, {
              fields: ['reason', 'approved', 'committeeId', 'userId', 'termId'],
            });
          }
          return Promise.reject({ message: 'Membership not found', status: 404 });
        })
        .then(membership => res.send(membership))
        .catch(err => next(err));
    })
    .delete(needs('destroy memberships'), (req, res, next) => {
      Membership
        .findById(req.params.id)
        .then(membership => {
          if (membership) {
            return membership.destroy();
          }
          return Promise.reject({ message: 'Membership not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
