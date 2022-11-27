import { Router } from 'express';

import Login from './login.routes';
import Team from './team.routes';
import Match from './match.routes';
import Leaderboard from './leaderboard.routes';

const router = Router();

router.use('/login', Login);
router.use('/teams', Team);
router.use('/matches', Match);
router.use('/leaderboard', Leaderboard);

export default router;
