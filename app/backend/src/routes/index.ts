import { Router } from 'express';

import Login from './loginRoutes';

const router = Router();

router.use('/login', Login);

export default router;
