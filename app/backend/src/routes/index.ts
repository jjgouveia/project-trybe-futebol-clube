import { Router } from 'express';

import Login from './login.routes';
import Team from './team.routes';
import Match from './match.routes';

const router = Router();

router.use('/login', Login);
router.use('/teams', Team);
router.use('/matches', Match);

export default router;
