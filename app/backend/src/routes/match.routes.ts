import 'express-async-errors';
import { Router } from 'express';
import authLogin from '../middlewares/auth.middleware';
import MatchController from '../controllers/match.controller';

const router = Router();

const matchController = new MatchController();

router.post('/', authLogin, matchController.createMatch);
router.get('/', matchController.getMatches);
router.get('/:id', matchController.getMatchById);
router.patch('/:id', authLogin, matchController.updateScoreMatch);
router.patch('/:id/finish', authLogin, matchController.updateMatchProgress);

export default router;
