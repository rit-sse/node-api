import { Router } from 'express';
import auth from './auth';
import committees from './committees';
import events from './events';
import links from './links';
import mentoring from './mentoring';
import memberships from './memberships';
import officers from './officers';
import qdb from './qdb';
import users from './users';
import status from './status';
import nconf from '../config';

const router = Router(); // eslint-disable-line new-cap
const apiConfig = nconf.get('api');
const apiPath = `/${apiConfig.prefix}/${apiConfig.version}`;

router.use((req, res, next) => {
  res.header('Cache-Control', 'max-age=60');
  return next();
});

router.use('/auth', auth);
router.use('/committees', committees);
router.use('/events', events);
router.use('/links', links);
router.use('/memberships', memberships);
router.use('/mentoring', mentoring);
router.use('/officers', officers);
router.use('/qdb', qdb);
router.use('/status', status);
router.use('/users', users);

router
  .route('/')
  .get((req, res) => res.send({
    authUrl: `${apiPath}/auth`,
    committeesUrl: `${apiPath}/committees`,
    eventsUrl: `${apiPath}/events`,
    linksUrl: `${apiPath}/links`,
    membershipsUrl: `${apiPath}/memberships`,
    mentoringUrl: `${apiPath}/mentoring`,
    officersUrl: `${apiPath}/officers`,
    qdbUrl: `${apiPath}/qdb`,
    statusUrl: `${apiPath}/status`,
    usersUrl: `${apiPath}/users`,
  }));


export default router;
