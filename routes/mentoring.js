import { Router } from 'express';
import headcounts from './headcounts';
import mentors from './mentors';
import shifts from './shifts';
import specialties from './specialties';

const router = Router(); // eslint-disable-line new-cap

router.use('/headcounts', headcounts);
router.use('/mentors', mentors);
router.use('/shifts', shifts);
router.use('/specialties', specialties);

export default router;
