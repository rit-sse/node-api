import { Router } from 'express';
import mentors from './mentors';

var router = Router();

router.use('/mentors', mentors);

export default router;
