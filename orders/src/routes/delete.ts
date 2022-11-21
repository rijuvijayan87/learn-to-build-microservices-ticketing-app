import {
  NotAuthorizedError,
  OrderStatus,
  ResourceNotFoundError,
} from '@ticketing-rv/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ResourceNotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  // publish an event saying that this order was cancelled

  res.status(204).json(order);
});

export { router as deleteOrderRouter };
