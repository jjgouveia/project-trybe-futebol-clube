import 'express-async-errors';
import { Router } from 'express';
import authLogin from '../middlewares/auth.middleware';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.get('/validate', authLogin, loginController.getUserWithToken);
router.post('/', loginController.validateLogin);

export default router;
