import { NotAuthorizedError, requireAuth } from '@ticketing-rv/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
