import { BasePublisher } from './base-publisher';
import { Subjects } from './subjects';
import { TicketUpdatedEvent } from './ticket-updated-event';

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
