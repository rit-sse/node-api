import { Router } from 'express';
import users from './users';

var router = Router();

router.use('/users', users );

export default router;
