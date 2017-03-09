import { Router } from 'express';
import Mentor from '../models/mentor';
import User from '../models/user';
import Specialty from '../models/specialty';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';
import Promise from 'bluebird';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get(paginate, (req, res, next) => {
    const scopes = scopify(req.query, 'specialty', 'user', 'time', 'day', 'active');
    Mentor
      .scope(scopes)
      .findAndCountAll()
      .then(result => [result.count, Promise.map(result.rows, mentor => mentor.reload({ include: [
        {
          model: Specialty,
          attributes: ['name'],
        },
        User,
      ] }))])
      .spread((count, mentors) => {
        res.send({
          total: count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: mentors,
        });
      })
      .catch(err => next(err));
  })
  .post(needs('mentors', 'create'), (req, res, next) => {
    User
      .findOrCreate({ where: { dce: req.body.user.dce } })
      .spread(user => {
        if (!user.firstName && !user.lastName) {
          user.firstName = req.body.user.firstName;
          user.lastName = req.body.user.lastName;
        }

        if (req.body.user.image) {
          user.image = req.body.user.image;
        }
        return user.save();
      })
      .then(user => {
        req.body.userDce = user.dce;
        return Mentor
          .create(req.body, { fields: ['bio', 'userDce', 'startDate', 'endDate'] });
      })
      .then(mentor => {
        req.body.specialties = req.body.specialties || [];
        const arr = [mentor];
        for (const spec of req.body.specialties) {
          arr.push(Specialty.findOrCreate({ where: { name: spec } }));
        }
        return arr;
      })
      .spread((mentor, ...specialties) => [mentor, mentor.setSpecialties(specialties.map(spec => spec[0]))])
      .spread(mentor => mentor.reload({ include: [Specialty] }))
      .then(mentor => res.status(201).send(mentor))
      .catch(err => {
        err.status = 422;
        next(err);
      });
  });

router
  .route('/:id')
  .get((req, res, next) => {
    Mentor
      .findById(req.params.id, {
        include: [Specialty],
      })
      .then(mentor => {
        if (mentor) {
          return res.send(mentor);
        }
        return Promise.reject({ message: 'Mentor not found', status: 404 });
      })
      .catch(err => next(err));
  })
  .put(needs('mentors', 'update'), (req, res, next) => {
    Mentor
      .findById(req.params.id, {
        include: [Specialty],
      })
      .then(mentor => {
        if (mentor) {
          return mentor.updateAttributes(req.body, {
            fields: ['bio', 'userDce', 'startDate', 'endDate'],
          });
        }
        return Promise.reject({ message: 'Mentor not found', status: 404 });
      })
      .then(mentor => {
        const arr = [mentor];
        for (const spec of req.body.specialties) {
          arr.push(Specialty.findOrCreate({ where: { name: spec } }));
        }
        return arr;
      })
      .spread((mentor, ...specialties) => [mentor, mentor.setSpecialties(specialties.map(spec => spec[0]))])
      .spread(mentor => mentor.reload({ include: [Specialty] }))
      .then(mentor => res.send(mentor))
      .catch(err => next(err));
  })
  .delete(needs('mentors', 'destroy'), (req, res, next) => {
    Mentor
      .findById(req.params.id)
      .then(mentor => {
        if (mentor) {
          return mentor.setSpecialties([]).then(() => mentor.destroy());
        }
        return Promise.reject({ message: 'Mentor not found', status: 404 });
      })
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  });

export default router;
