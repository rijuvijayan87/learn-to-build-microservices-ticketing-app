import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

interface User {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.session?.jwt;
  if (!jwtToken) {
    return next();
  }
  try {
    const user = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as User;
    req.currentUser = user;
  } catch (error) {}

  next();
};
