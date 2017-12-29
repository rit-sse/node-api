import { Router } from 'express';
import User from '../models/user';
import scopify from '../helpers/scopify';
import paginate from '../middleware/paginate';
import { needs } from '../middleware/permissions';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
    .get(paginate, (req, res, next) => {
      const scopes = scopify(req.query, 'firstName', 'lastName');
      User
        .scope(scopes)
        .findAndCountAll()
        .then(result => res.send({
          total: result.count,
          perPage: req.query.perPage,
          currentPage: req.query.page,
          data: result.rows,
        }))
        .catch(err => next(err));
    });

router
  .route('/:dce')
    .get((req, res, next) => {
      User
        .findById(req.params.dce)
        .then((user) => {
          if (user) {
            return res.send(user);
          }
          return Promise.reject({ message: 'User not found', status: 404 });
        })
        .catch(err => next(err));
    })
    .put(needs('users', 'update'), (req, res, next) => {
      User
        .findOrCreate({
          where: {
            dce: req.params.dce,
          },
          defaults: {
            image: null, // If creating a new User, default 'image' to 'null'
          },
        })
        .spread((user) => {
          if (!user.firstName && !user.lastName) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
          }
          if (req.body.image) {
            user.image = req.body.image;
          }
          return user.save();
        })
        .then(user => res.status(200).send(user))
        .catch((err) => {
          err.status = 422;
          next(err);
        });
    });

export default router;
