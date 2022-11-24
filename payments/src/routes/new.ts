import {
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
  requireAuth,
  ResourceNotFoundError,
  validateRequest,
} from '@ticketing-rv/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('token cannot be empty'),
    body('orderId').not().isEmpty().withMessage('orderId cannot be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for a cancelled order');
    }

    try {
      await stripe.charges.create({
        currency: 'nzd',
        amount: order.price * 100,
        source: token,
      });
    } catch (error) {
      console.error(error);
    }
    res.json({ success: true });
  }
);

export { router as createChargeRouter };
