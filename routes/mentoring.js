import { Router } from 'express';
import headcounts from './headcounts';
import mentors from './mentors';
import shifts from './shifts';
import specialties from './specialties';
import nconf from '../config';

const router = Router(); // eslint-disable-line new-cap
const apiConfig = nconf.get('api');
const apiPath = `/${apiConfig.prefix}/${apiConfig.version}/mentoring`;

router.use('/headcounts', headcounts);
router.use('/mentors', mentors);
router.use('/shifts', shifts);
router.use('/specialties', specialties);

router
  .route('/')
  .get((req, res) => res.send({
    headcountsUrl: `${apiPath}/headcounts`,
    mentorsUrl: `${apiPath}/mentors`,
    shiftsUrl: `${apiPath}/shifts`,
    specialtiesUrl: `${apiPath}/specialties`,
  }));

export default router;
