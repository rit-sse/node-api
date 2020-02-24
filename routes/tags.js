import { Router } from 'express';
import Tag from '../models/tag';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';
import sorting from '../middleware/sorting';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, sorting, (req, res, next) => {
      if (req.query.active === 'true') {
        req.query.active = true; // INNER JOIN quotes
      } else {
        req.query.active = false; // LEFT OUTER JOIN quotes
      }
      const scopes = scopify(req.query, 'active');
      Tag
        .scope(scopes)
        .findAndCountAll()
        .then(result => {
          const uniqueTags = {};
          result.rows.forEach((tag) => {
            const c = tag.get({ plain: true });
            Reflect.deleteProperty(c, 'quotes');
            uniqueTags[c.name] = c;
          });
          return res.send({
            total: Object.keys(uniqueTags).length,
            perPage: req.query.perPage,
            currentPage: req.query.page,
            data: Object.values(uniqueTags),
          });
        })
        .catch(err => next(err));
    });

export default router;
