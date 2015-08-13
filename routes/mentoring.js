import { Router } from 'express';
import mentors from './mentors';
import shifts from './shifts';

var router = Router();

router.use('/mentors', mentors);
router.use('/shifts', shifts);

export default router;
