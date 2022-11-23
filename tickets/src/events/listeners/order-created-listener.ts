import {
  EventListener,
  OrderCreatedEvent,
  Subjects,
} from '@ticketing-rv/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './order-queuegroup-name';
export class OrderCreatedListener extends EventListener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    // mark the ticket as reserved by setting its orderid property
    ticket.set({ orderId: data.id });

    // save
    await ticket.save();
    // ack message
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    msg.ack();
  }
}
