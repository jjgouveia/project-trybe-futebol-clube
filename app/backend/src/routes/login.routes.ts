import { Router } from 'express';
import authLogin from '../middlewares/auth.middleware';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.get('/validate', authLogin, loginController.getUserWithToken.bind(loginController));
router.post('/', loginController.validateLogin.bind(loginController));

export default router;
