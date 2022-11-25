import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import Jwt from '../utils/jwt/jwt';

export default class LoginController {
  loginService = new LoginService();
  jwt = new Jwt();

  async getUserWithToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    const result = await this.loginService.getUserByToken(authorization as string);
    if (result) {
      return res.status(200).json({ role: result.role });
    }
  }

  async validateLogin(req: Request, res: Response) {
    const { type } = await this.loginService.validateLogin(req.body);

    if (type !== 200) {
      const message = type === 400
        ? 'All fields must be filled' : 'Incorrect email or password';
      return res.status(type as number).json({ message });
    }

    const token = this.jwt.createToken(req.body);
    return res.status(type).json({ token });
  }
}
