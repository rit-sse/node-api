import { Router } from 'express';
import Promise from 'bluebird';
import Officer from '../models/officer';
import User from '../models/user';
import Committee from '../models/committee';
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
      const scopes = scopify(req.query, 'title', 'email', 'user', 'primary', 'committee', 'active');
      Officer
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
    .post(needs('officers', 'create'), (req, res, next) => {
      Committee
        .findOrCreate({ where: { name: req.body.committeeName } })
        .spread((committee) => {
          req.body.committeeName = committee.name;
          return Officer
            .create(req.body, {
              fields: ['title', 'email', 'primaryOfficer', 'userDce', 'startDate', 'endDate', 'committeeName'],
            });
        })
        .then(officer => officer.reload({ include: [User] }))
        .then(officer => res.status(201).send(officer))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Officer
        .findById(req.params.id, {
          include: [User],
        })
        .then((officer) => {
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
        .then((officer) => {
          if (officer) {
            return officer.updateAttributes(req.body, {
              fields: ['title', 'email', 'userDce', 'committeeName', 'primaryOfficer', 'startDate', 'endDate'],
            });
          }
          return Promise.reject({ message: 'Officer not found', status: 404 });
        })
        .then(officer => officer.reload({ include: [User] }))
        .then(officer => res.send(officer))
        .catch(err => next(err));
    })
    .delete(needs('officers', 'destroy'), (req, res, next) => {
      Officer
        .findById(req.params.id)
        .then((officer) => {
          if (officer) {
            return officer.destroy();
          }
          return Promise.reject({ message: 'Officer not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
