import { Router } from 'express';
import auth from './auth';
import committees from './committees';
import events from './events';
import links from './links';
import mentoring from './mentoring';
import memberships from './memberships';
import officers from './officers';
import qdb from './qdb';
import users from './users';

const router = Router(); // eslint-disable-line new-cap

router.use('/auth', auth);
router.use('/committees', committees);
router.use('/events', events);
router.use('/links', links);
router.use('/memberships', memberships );
router.use('/mentoring', mentoring);
router.use('/officers', officers);
router.use('/qdb', qdb);
router.use('/users', users );

export default router;
