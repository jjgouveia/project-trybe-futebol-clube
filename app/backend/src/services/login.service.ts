import * as bcryptjs from 'bcryptjs';
import HttpException from '../utils/HttpException';
import { ILogin } from '../interfaces/ILogin';
import Users from '../database/models/Users';
import Jwt from '../utils/jwt/jwt';
import loginSchema from './validations/schemas';

export default class LoginService {
  private _jwt = new Jwt();

  constructor(
    private users = Users,
  ) {}

  private static validateLoginSchema(credentials: ILogin): void {
    const { error } = loginSchema.validate(credentials);
    if (error) {
      const status = error.message.includes('filled') ? 400 : 401;
      throw new HttpException(status, error.message);
    }
  }

  public async getUserByToken(token: string): Promise<Users | null> {
    const userToken = this._jwt.validateToken(token);
    const query = await this.users.findOne({ where: { email: userToken.email } });
    if (!query) throw new HttpException(401, 'User not found');
    return query;
  }

  public async validateLogin(crendentials: ILogin): Promise<unknown> {
    LoginService.validateLoginSchema(crendentials);
    const { email, password } = crendentials;

    const query = await this.users.findOne({ where: { email } });
    const validation = query && bcryptjs.compareSync(password, query.password);
    if (!validation) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    return query;
  }
}
