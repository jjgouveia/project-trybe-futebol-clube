import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import Jwt from '../utils/jwt/jwt';

export default class LoginController {
  private _loginService = new LoginService();
  private _jwt = new Jwt();

  constructor() {
    this.getUserWithToken = this.getUserWithToken.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  async getUserWithToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    const query = await this._loginService.getUserByToken(authorization as string);

    res.status(200).json({ role: query?.role });
  }

  async validateLogin(req: Request, res: Response) {
    await this._loginService.validateLogin(req.body);

    const token = this._jwt.createToken(req.body);
    res.status(200).json({ token });
  }
}
