import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/HttpException';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next): void => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
