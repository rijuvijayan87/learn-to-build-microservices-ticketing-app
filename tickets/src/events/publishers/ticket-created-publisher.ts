import {
  BasePublisher,
  Subjects,
  TicketCreatedEvent,
} from '@ticketing-rv/common';

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
