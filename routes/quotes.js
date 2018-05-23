import { Router } from 'express';
import Promise from 'bluebird';
import Quote from '../models/quote';
import Tag from '../models/tag';
import scopify from '../helpers/scopify';
import { needs, needsApprovedIndex, needsApprovedOne } from '../middleware/permissions';
import verifyUser from '../middleware/verify-user';
import paginate from '../middleware/paginate';
import sorting from '../middleware/sorting';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(verifyUser, paginate, sorting, needsApprovedIndex('quotes'), (req, res, next) => {
      const scopes = scopify(req.query, 'body', 'tag', 'search', 'approved');
      Quote
        .scope(scopes)
        .findAndCountAll({
          order: [['id', 'DESC']],
        })
        .then((result) => {
          const count = typeof result.count !== 'number' ? result.count.length : result.count;
          return [count, Promise.map(result.rows, quote => quote.reload({ include: [{ model: Tag, attributes: ['name'] }] }))];
        })
        .spread((count, quotes) => {
          res.send({
            total: count,
            perPage: req.query.perPage,
            currentPage: req.query.page,
            data: quotes,
          });
        })
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      req.body.tags = req.body.tags || [];
      Quote.create(req.body, { fields: ['body', 'description'] })
        .then((quote) => {
          const arr = [quote];
          req.body.tags.forEach((tag) => {
            arr.push(Tag.findOrCreate({ where: { name: tag } }));
          });
          return arr;
        })
        .spread((quote, ...tags) => [quote, quote.setTags(tags.map(tag => tag[0]))])
        .spread(quote => quote.reload({ include: [Tag] }))
        .then(quote => res.status(201).send(quote))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(verifyUser, needsApprovedOne('quotes'), (req, res, next) => {
      Quote
        .findById(req.params.id, {
          include: [Tag],
        })
        .then((quote) => {
          if (quote) {
            if (!quote.approved && !req.auth.allowed) {
              return next({
                message: 'User does not have permission: unapproved quotes',
                status: 403,
              });
            }
            return res.send(quote);
          }
          return Promise.reject({ message: 'Quote not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('quotes', 'update'), (req, res, next) => {
      req.body.tags = req.body.tags || [];
      Quote
        .findById(req.params.id, {
          include: [Tag],
        })
        .then((quote) => {
          if (quote) {
            return quote.updateAttributes(req.body, {
              fields: ['body', 'description', 'approved'],
            });
          }
          return Promise.reject({ message: 'Quote not found', status: 404 });
        })
        .then((quote) => {
          const arr = [quote];
          req.body.tags.forEach((tag) => {
            arr.push(Tag.findOrCreate({ where: { name: tag } }));
          });
          return arr;
        })
        .spread((quote, ...tags) => {
          if (tags.length !== 0) {
            return [quote, quote.setTags(tags.map(tag => tag[0]))];
          }
          return [quote];
        })
        .spread(quote => quote.reload({ include: [Tag] }))
        .then(quote => res.send(quote))
        .catch(err => next(err));
    })
    .delete(needs('quotes', 'destroy'), (req, res, next) => {
      Quote
        .findById(req.params.id)
        .then((quote) => {
          if (quote) {
            return quote.destroy();
          }
          return Promise.reject({ message: 'Quote not found', status: 404 });
        })
        .then(quote => res.send(quote))
        .catch(err => next(err));
    });

export default router;
