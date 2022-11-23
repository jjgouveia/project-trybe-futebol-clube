import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.get('/validate', loginController.getUserWithToken.bind(loginController));
router.post('/', loginController.validateLogin.bind(loginController));

export default router;
