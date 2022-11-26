import { Request, Response } from 'express';

export interface ILogin {
  email: string,
  password: string
}

export interface ILoginController {
  getUserWithToken(req: Request, res: Response): Promise<void>;
  validateLogin(req: Request, res: Response): Promise<void>;
}
