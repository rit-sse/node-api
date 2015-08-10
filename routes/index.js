import { Router } from 'express';
import auth from './auth';
import groups from './groups';
import links from './links';
import memberships from './memberships';
import officers from './officers';
import terms from './terms';
import tips from './tips';
import users from './users';

var router = Router();

router.use('/auth', auth);
router.use('/groups', groups );
router.use('/links', links);
router.use('/memberships', memberships );
router.use('/officers', officers);
router.use('/terms', terms );
router.use('/tips', tips);
router.use('/users', users );

export default router;
