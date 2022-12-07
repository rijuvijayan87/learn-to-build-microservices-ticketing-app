import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@ticketing-rv/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('invalid email entered'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('password length should be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // // store it in session object
    // req.session = {
    //   jwt: userJwt,
    // };
    res.status(201).json({
      user,
      jwt: userJwt,
    });
  }
);

export { router as signupRouter };
