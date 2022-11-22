import {
  BasePublisher,
  OrderCancelledEvent,
  Subjects,
} from '@ticketing-rv/common';

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
