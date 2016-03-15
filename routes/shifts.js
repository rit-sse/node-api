import { Router } from 'express';
import Shift from '../models/shift';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'time', 'day', 'mentor', 'active');
      Shift
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map(shift => {
            const t = shift.get({ plain: true });
            Reflect.deleteProperty(t, 'mentor');
            return t;
          }),
        }))
        .catch(err => next(err));
    })
    .post(needs('shifts', 'create'), (req, res, next) => {
      Shift.create(req.body, { fields: ['startTime', 'endTime', 'day', 'mentorId'] })
        .then(shift => res.status(201).send(shift))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Shift
        .findById(req.params.id)
        .then(shift => {
          if (shift) {
            return res.send(shift);
          }
          return Promise.reject({ message: 'Shift not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('shifts', 'update'), (req, res, next) => {
      Shift
        .findById(req.params.id)
        .then(shift => {
          if (shift) {
            return shift.updateAttributes(req.body, {
              fields: ['startTime', 'endTime', 'day', 'mentorId'],
            });
          }
          return Promise.reject({ message: 'Shift not found', status: 404 });
        })
        .then(shift => res.send(shift))
        .catch(err => next(err));
    })
    .delete(needs('shifts', 'destroy'), (req, res, next) => {
      Shift
        .findById(req.params.id)
        .then(shift => {
          if (shift) {
            return shift.destroy();
          }
          return Promise.reject({ message: 'Shift not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
