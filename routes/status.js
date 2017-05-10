import { Router } from 'express';

const router = Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get((req, res, next) => {
    res.sendStatus(200);
  });

export default router;
