import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/jwt/jwt';

const authLogin = (req: Request, res:Response, next: NextFunction) => {
  const jwt = new Jwt();

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.validateToken(token as string);

    if (decoded.type) return res.status(401).json({ message: 'Token must be a valid token' });

    req.body.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authLogin;
