import { Router } from 'express';
import Event from '../models/event';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';
import ical from '../helpers/ical';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'name', 'committee', 'location', 'between', 'before', 'after', 'featured', 'sort');
      if (req.accepts('json')) {
        Event
          .scope(scopes)
          .findAndCountAll()
          .then(result => res.send({
            total: result.count,
            perPage: req.query.perPage,
            currentPage: req.query.page,
            data: result.rows,
          }))
          .catch(err => next(err));
      } else if (req.accepts('ics')) { // NOTE: ACCEPT 'text/calendar'
        scopes.shift();
        return Event
          .scope(scopes)
          .findAll()
          .then(events => res.attachment('calendar.ics').send(ical(events)))
          .catch(err => next(err));
      } else {
        return next({ status: 406, message: `${req.headers.accept} is not acceptable` });
      }
    })
    .post(needs('events', 'create'), (req, res, next) => {
      Event.create(req.body, { fields: ['name', 'startDate', 'endDate', 'description', 'location', 'image', 'committeeName'] })
        .then(event => res.status(201).send(event))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Event
        .findById(req.params.id)
        .then((event) => {
          if (event) {
            return res.send(event);
          }
          return Promise.reject({ message: 'Event not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('events', 'update'), (req, res, next) => {
      Event
        .findById(req.params.id)
        .then((event) => {
          if (event) {
            return event.updateAttributes(req.body, {
              fields: ['name', 'startDate', 'endDate', 'description', 'location', 'image', 'committeeName'],
            });
          }
          return Promise.reject({ message: 'Event not found', status: 404 });
        })
        .then(event => res.send(event))
        .catch(err => next(err));
    })
    .delete(needs('events', 'destroy'), (req, res, next) => {
      Event
        .findById(req.params.id)
        .then((event) => {
          if (event) {
            return event.destroy();
          }
          return Promise.reject({ message: 'Event not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
