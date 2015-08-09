import { Router } from 'express';
import auth from './auth';
import groups from './groups';
import officers from './officers';
import memberships from './memberships';
import terms from './terms';
import users from './users';

var router = Router();

router.use('/groups', groups );
router.use('/memberships', memberships );
router.use('/officers', officers);
router.use('/terms', terms );
router.use('/users', users );
router.use('/auth', auth);


export default router;
