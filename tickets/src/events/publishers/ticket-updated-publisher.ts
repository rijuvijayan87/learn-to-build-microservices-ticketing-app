import {
  BasePublisher,
  Subjects,
  TicketUpdatedEvent,
} from '@ticketing-rv/common';

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
