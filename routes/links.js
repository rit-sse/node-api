import { Router } from 'express';
import Link from '../models/link';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import paginate from '../middleware/paginate';

var router = Router();

router
  .route('/')
    .get(paginate, (req, res, next) => {
      var scopes = scopify(req.query, 'shortLink', 'longLink');
      Link.scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows
        }))
        .catch(err => next(err));
    })
    .post(needs('links', 'create'), (req, res, next) => {
      Link.create(req.body, {fields: ['shortLink', 'longLink']})
        .then(link => res.send(link))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Link
        .findById(req.params.id)
        .then(link => {
          if (link) {
            res.send(link);
          } else {
            next({ message: 'Link not found', status: 404 });
          }
        })
        .catch(err => next(err));
    })
    .put(needs('links', 'update'), (req, res, next) => {
      Link
        .findById(req.params.id)
        .then(link => {
          if (link) {
            return link.updateAttributes(req.body, {
              fields: ['shortLink', 'longLink']
            });
          } else {
            next({ message: 'Link not found', status: 404 });
          }
        })
        .then(link => {
          if (link) {
            res.send(link);
          }
        })
        .catch(err => next(err));
    })
    .delete(needs('links', 'destroy'), (req, res, next) => {
      Link
        .findById(req.params.id)
        .then(link => {
          if (link) {
            return link.destroy();
          } else {
            next({ message: 'Link not found', status: 404 });
          }
        })
        .then(link => {
          if (link){
            res.sendStatus(204);
          }
        })
        .catch(err => next(err));
    });

export default router;
