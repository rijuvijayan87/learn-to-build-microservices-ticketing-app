import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseError } from '../errors/DatabaseValidationError';
import { RequestValidationError } from '../errors/RequestValidationError';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('invalid email entered'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('password length should be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DatabaseError();
  }
);

export { router as signupRouter };
