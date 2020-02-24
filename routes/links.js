import { Router } from 'express';
import Link from '../models/link';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import sorting from '../middleware/sorting';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, sorting, (req, res, next) => {
      const scopes = scopify(req.query, 'onlyPublic');
      Link.scope(scopes)
        .findAndCountAll({
          order: '"createdAt" DESC',
        })
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    })
    .post(needs('links', 'create'), (req, res, next) => {
      Link.create({
        shortLink: req.body.shortLink.toLocaleLowerCase(),
        longLink: req.body.longLink,
        description: req.body.description,
        public: req.body.public,
      }, { fields: ['shortLink', 'longLink', 'description', 'public'] })
        .then(link => res.status(201).send(link))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

// TODO: Move this to the top level of the API
// Instead of /api/v2/links/go/:shortLink
// it should be /go/:shortLink
router
  .route('/go/:shortLink')
    .get((req, res, next) => {
      Link
        .findByPk(req.params.shortLink.toLocaleLowerCase())
        .then((link) => {
          if (link) {
            return res.redirect(link.longLink);
          }
          return Promise.reject({ message: 'Link not found', status: 404 });
        })
        .catch(err => next(err));
    });

router
  .route('/:shortLink')
    .get((req, res, next) => {
      Link
        .findByPk(req.params.shortLink.toLocaleLowerCase())
        .then((link) => {
          if (link) {
            return res.send(link);
          }
          return Promise.reject({ message: 'Link not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('links', 'update'), (req, res, next) => {
      Link
        .findByPk(req.params.shortLink.toLocaleLowerCase())
        .then((link) => {
          if (link) {
            return link.updateAttributes(req.body, {
              fields: ['shortLink', 'longLink', 'description', 'public'],
            });
          }
          return Promise.reject({ message: 'Link not found', status: 404 });
        })
        .then(link => res.send(link))
        .catch(err => next(err));
    })
    .delete(needs('links', 'destroy'), (req, res, next) => {
      Link
        .findByPk(req.params.shortLink.toLocaleLowerCase())
        .then((link) => {
          if (link) {
            return link.destroy();
          }
          return Promise.reject({ message: 'Link not found', status: 404 });
        })
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    });

export default router;
