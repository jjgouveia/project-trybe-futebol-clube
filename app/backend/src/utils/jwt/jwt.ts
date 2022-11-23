import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IJwt from './IJwt';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JWTService {
  createToken = (data: IJwt) => {
    const token = jwt.sign(data, secret);
    return token;
  };

  validateToken = (token: string): jwt.JwtPayload => {
    try {
      const validation = jwt.verify(token, secret);
      return validation as jwt.JwtPayload;
    } catch (error) {
      throw new Error('Token must be a valid number');
    }
  };
}
