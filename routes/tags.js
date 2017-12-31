import { Router } from 'express';
import Tag from '../models/tag';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      if (req.query.active === 'true') {
        req.query.active = true; // INNER JOIN quotes
      } else {
        req.query.active = false; // LEFT OUTER JOIN quotes
      }
      const scopes = scopify(req.query, 'active');
      Tag
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map((tag) => {
            const t = tag.get({ plain: true });
            Reflect.deleteProperty(t, 'quotes');
            return t;
          }),
        }))
        .catch(err => next(err));
    });

export default router;
