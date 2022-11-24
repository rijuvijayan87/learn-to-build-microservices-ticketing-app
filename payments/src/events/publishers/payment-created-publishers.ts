import {
  BasePublisher,
  PaymentCreatedEvent,
  Subjects,
} from '@ticketing-rv/common';

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
