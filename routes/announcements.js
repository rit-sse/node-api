import { Router } from 'express';
import Announcement from '../models/announcement';
import scopify from '../helpers/scopify';
import { needs } from '../middleware/permissions';
import sorting from '../middleware/sorting';
import paginate from '../middleware/paginate';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get(paginate, sorting, (req, res, next) => {
    const scopes = scopify(req.query, 'onlyActive');
    Announcement.scope(scopes)
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
      })
      .then(result => res.send({
        total: result.count,
        perPage: req.query.perPage,
        currentPage: req.query.page,
        data: result.rows,
      }))
      .catch(err => next(err));
  })
  .post(needs('announcements', 'create'), (req, res, next) => {
    Announcement.create({
      announcement: req.body.announcement,
      announcementType: req.body.announcementType,
      active: req.body.active,
    }, { fields: ['announcement', 'announcementType', 'active'] })
      .then(announcement => res.status(201).send(announcement))
      .catch((err) => {
        err.status = 422;
        next(err);
      });
  });

router
  .route('/:id')
  .get((req, res, next) => {
    Announcement
      .findByPk(req.params.id)
      .then((announcement) => {
        if (announcement) {
          return res.send(announcement);
        }
        return Promise.reject({ message: 'Announcement not found', status: 404 });
      })
      .catch(err => next(err));
  })
  .put(needs('announcements', 'update'), (req, res, next) => {
    Announcement
      .findByPk(req.params.id)
      .then((announcement) => {
        if (announcement) {
          return announcement.update(req.body, {
            fields: ['announcement', 'announcementType', 'active'],
          });
        }
        return Promise.reject({ message: 'Announcement not found', status: 404 });
      })
      .then(announcement => res.send(announcement))
      .catch(err => next(err));
  })
  .delete(needs('announcements', 'destroy'), (req, res, next) => {
    Announcement
      .findByPk(req.params.id)
      .then((announcement) => {
        if (announcement) {
          return announcement.destroy();
        }
        return Promise.reject({ message: 'Announcement not found', status: 404 });
      })
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  });

export default router;
