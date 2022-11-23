import { Router } from 'express';

import Login from './loginRoutes';
import Team from './teamRoutes';

const router = Router();

router.use('/login', Login);
router.use('/teams', Team);

export default router;
