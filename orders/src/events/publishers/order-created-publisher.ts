import {
  BasePublisher,
  OrderCreatedEvent,
  Subjects,
} from '@ticketing-rv/common';

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
