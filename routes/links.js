import { Router } from 'express';
import Link from '../models/link';
import scopify from '../helpers/scopify';
import {paginate} from '../helpers/paginate';
import { needs } from '../middleware/permissions';

var router = Router();

router
  .route('/')
    .get((req, res, next) => {
      var scopes = scopify(req.query, 'shortLink', 'longLink');
      Link.paginate(scopes, req.query.perPage, req.query.page)
        .then((body) => res.send(body))
        .catch((err) => next(err));
    })
    .post(needs('create links'), (req, res, next) => {
      Link.create(req.body, {fields: ['shortLink', 'longLink']})
        .then((link) => res.send(link))
        .catch((err) => next({ err: err, status: 422}));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Link
        .findById(req.params.id)
        .then((link) => {
          if(link) {
            res.send(link)
          } else {
            next({ message: "Link not found", status: 404 })
          }
        })
        .catch((err) => next(err));
    })
    .put(needs('update links'), (req, res, next) => {
      Link
        .findById(req.params.id)
        .then((link) => link.updateAttributes(req.body, ({ fields: ['shortLink', 'longLink']})))
        .then((link) => res.send(link))
        .catch((err) => next(err));
    })
    .delete(needs('destroy links'), (req, res, next) => {
      Link
        .findById(req.params.id)
        .then((link) => link.destroy())
        .then(() => res.sendStatus(204));
    });

export default router;