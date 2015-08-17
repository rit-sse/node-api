'use strict';

import { Router } from 'express';
import headcounts from './headcounts';
import mentors from './mentors';
import shifts from './shifts';

const router = Router(); // eslint-disable-line new-cap

router.use('/headcounts', headcounts);
router.use('/mentors', mentors);
router.use('/shifts', shifts);

export default router;
