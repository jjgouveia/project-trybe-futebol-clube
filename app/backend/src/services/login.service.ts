import * as bcryptjs from 'bcryptjs';
import IResponse from '../interfaces/IResponse';
import Users from '../database/models/Users';
import Jwt from '../utils/jwt/jwt';

export default class LoginService {
  jwt = new Jwt();

  constructor(
    private users = Users,
  ) {}

  public async getUserByToken(token: string): Promise<Users | null> {
    const userToken = this.jwt.validateToken(token);
    const query = await this.users.findOne({ where: { email: userToken.email } });

    return query;
  }

  public async validateLogin(email: string, password: string): Promise<IResponse> {
    if (!email || !password) {
      return { type: 400 };
    }
    const query = await this.users.findOne({ where: { email } });
    const validation = query && bcryptjs.compareSync(password, query.password);
    if (!validation) {
      return { type: 401 };
    }
    return { type: 200, message: query };
  }
}
