import Promise from 'bluebird';
import { Router } from 'express';

import sequelize from '../config/sequelize';
import scopify from '../helpers/scopify';
import Membership from '../models/membership';
import User from '../models/user';
import paginate from '../middleware/paginate';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/scoreboard')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'user', 'active', 'between', 'approved');
      Membership
        .scope(scopes)
        .findAll({
          attributes: [
            'userDce',
            [sequelize.fn('count', sequelize.col('userDce')), 'memberships'],
          ],
          group: ['userDce'],
          order: 'memberships DESC',
        })
        .then(scoreboard => res.send(scoreboard))
        .catch(err => next(err));
    });

router
  .route('/')
  .get(verifyUser, paginate, needsApprovedIndex('memberships'), (req, res, next) => {
    const scopes = scopify(req.query, 'reason', 'committee', 'user', 'active', 'between', 'approved');
    Membership
      .scope(scopes)
      .findAndCountAll({
        include: [User],
      })
      .then(result => res.send({
        total: result.count,
        perPage: req.query.perPage,
        currentPage: req.query.page,
        data: result.rows,
      }))
      .catch(err => next(err));
  })
  .post(needs('memberships', 'create'), (req, res, next) => Membership
      .create(req.body, {
        fields: ['reason', 'committeeName', 'userDce', 'startDate', 'endDate'],
      })
      .then(membership => membership.reload({ include: [User] }))
      .then(membership => res.status(201).send(membership))
      .catch((err) => {
        err.status = 422;
        next(err);
      }));

router
  .route('/:id')
  .get(verifyUser, needsApprovedOne('memberships'), (req, res, next) => {
    Membership
      .findById(req.params.id, {
        include: [User],
      })
      .then((membership) => {
        if (membership) {
          if (!membership.approved && !req.auth.allowed) {
            return Promise.reject({
              message: 'User does not have permission: unapproved memberships',
              status: 403,
            });
          }
          return res.send(membership);
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .catch(err => next(err));
  })
  .put(needs('memberships', 'update'), (req, res, next) => {
    Membership
      .findById(req.params.id)
      .then((membership) => {
        if (membership) {
          return membership.updateAttributes(req.body, {
            fields: ['reason', 'approved', 'committeeName', 'userDce', 'startDate', 'endDate'],
          });
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .then(membership => membership.reload({ include: [User] }))
      .then(membership => res.send(membership))
      .catch(err => next(err));
  })
  .delete(needs('memberships', 'destroy'), (req, res, next) => {
    Membership
      .findById(req.params.id)
      .then((membership) => {
        if (membership) {
          return membership.destroy();
        }
        return Promise.reject({ message: 'Membership not found', status: 404 });
      })
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  });

export default router;
