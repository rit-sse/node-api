'use strict';

import { Router } from 'express';
import auth from './auth';
import committees from './committees';
import lingo from './lingo';
import links from './links';
import mentoring from './mentoring';
import memberships from './memberships';
import officers from './officers';
import terms from './terms';
import tips from './tips';
import users from './users';

var router = Router(); // eslint-disable-line new-cap

router.use('/auth', auth);
router.use('/committees', committees);
router.use('/lingo', lingo);
router.use('/links', links);
router.use('/memberships', memberships );
router.use('/mentoring', mentoring);
router.use('/officers', officers);
router.use('/terms', terms );
router.use('/tips', tips);
router.use('/users', users );

export default router;
