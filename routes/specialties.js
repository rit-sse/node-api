import { Router } from 'express';
import Specialty from '../models/specialty';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'active');
      Specialty
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map((specialty) => {
            const s = specialty.get({ plain: true });
            Reflect.deleteProperty(s, 'mentors');
            return s;
          }),
        }))
        .catch(err => next(err));
    });

export default router;
