import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError';
import { DatabaseError } from '../errors/DatabaseValidationError';
import { RequestValidationError } from '../errors/RequestValidationError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }
  res.status(404).json({ errors: 'something went wrong' });
};
