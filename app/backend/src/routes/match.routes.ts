import { Router } from 'express';
import authLogin from '../middlewares/auth.middleware';
import MatchController from '../controllers/match.controller';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getMatches.bind(matchController));
router.post('/', authLogin, matchController.createMatch.bind(matchController));
router.patch('/:id/finish', authLogin, matchController.updateMatchProgress.bind(matchController));

export default router;
