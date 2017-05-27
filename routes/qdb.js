import { Router } from 'express';
import quotes from './quotes';
import tags from './tags';

import nconf from '../config';

const router = Router(); // eslint-disable-line new-cap
const apiConfig = nconf.get('api');
const apiPath = `/${apiConfig.prefix}/${apiConfig.version}/qdb`;

router.use('/quotes', quotes);
router.use('/tags', tags);

router
  .route('/')
  .get((req, res) => res.send({
    quotesUrl: `${apiPath}/quotes`,
    tagsUrl: `${apiPath}/tags`,
  }));

export default router;
