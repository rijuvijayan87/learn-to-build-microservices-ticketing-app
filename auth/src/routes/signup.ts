import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseError } from '../errors/DatabaseValidationError';
import { RequestValidationError } from '../errors/RequestValidationError';
import { User } from '../models/user';

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

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = User.build({ email, password });
    await user.save();

    res.json({ user });
  }
);

export { router as signupRouter };
