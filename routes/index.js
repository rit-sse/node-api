'use strict';

import { Router } from 'express';
import agenda from './agenda';
import auth from './auth';
import committees from './committees';
import events from './events';
import lingo from './lingo';
import links from './links';
import mentoring from './mentoring';
import memberships from './memberships';
import officers from './officers';
import qdb from './qdb';
import tips from './tips';
import users from './users';

const router = Router(); // eslint-disable-line new-cap

router.use('/agenda', agenda);
router.use('/auth', auth);
router.use('/committees', committees);
router.use('/events', events);
router.use('/lingo', lingo);
router.use('/links', links);
router.use('/memberships', memberships );
router.use('/mentoring', mentoring);
router.use('/officers', officers);
router.use('/qdb', qdb);
router.use('/tips', tips);
router.use('/users', users );

export default router;
