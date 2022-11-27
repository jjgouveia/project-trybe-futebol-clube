import 'express-async-errors';

import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getHomeLeaderboard);
router.get('/away', leaderboardController.getAwayLeaderboard);
router.get('/', leaderboardController.getLeaderboard);

export default router;
