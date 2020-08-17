import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default function globalExceptionHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server',
  });
}
