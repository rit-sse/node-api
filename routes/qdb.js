import { Router } from 'express';
import quotes from './quotes';
import tags from './tags';

const router = Router(); // eslint-disable-line new-cap

router.use('/quotes', quotes);
router.use('/tags', tags);

export default router;
