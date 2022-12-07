import {
  NotAuthorizedError,
  requireAuth,
  ResourceNotFoundError,
} from '@ticketing-rv/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new ResourceNotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  }
);

export { router as showOrderRouter };
