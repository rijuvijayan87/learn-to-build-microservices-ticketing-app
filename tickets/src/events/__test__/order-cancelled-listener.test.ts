import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from '@ticketing-rv/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';
import { OrderCancelledListener } from '../listeners/order-cancelled-listener';

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'user',
  });

  const orderId = new mongoose.Types.ObjectId().toHexString();
  ticket.set({ orderId });

  await ticket.save();

  //create fake data event
  const data: OrderCancelledEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, orderId, data, msg };
};

it('udpates the ticket and publish the event', async () => {
  const { listener, ticket, orderId, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const cancelledTicket = await Ticket.findById(ticket.id);
  expect(cancelledTicket?.orderId).not.toBeDefined();
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket cancelled event', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const cancelledTicket = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(cancelledTicket.orderId).not.toBeDefined();
});
