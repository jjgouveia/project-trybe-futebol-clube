import 'express-async-errors';
import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
