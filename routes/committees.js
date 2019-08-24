import { Router } from 'express';
import Committee from '../models/committee';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';
import sorting from '../middleware/sorting';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, sorting, (req, res, next) => {
      const scopes = scopify(req.query, 'name', 'active');
      Committee
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows.map((committee) => {
            const c = committee.get({ plain: true });
            Reflect.deleteProperty(c, 'officer');
            return c;
          }),
        }))
        .catch(err => next(err));
    });

router
  .route('/:id')
    .get((req, res, next) => {
      Committee
        .findByPk(req.params.id)
        .then((committee) => {
          if (committee) {
            return res.send(committee);
          }
          return Promise.reject({ message: 'Committee not found', status: 404 });
        })
        .catch(err => next(err));
    });

export default router;
