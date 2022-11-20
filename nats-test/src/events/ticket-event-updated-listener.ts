import { Message } from 'node-nats-streaming';
import { EventListener } from './event-listener';
import { Subjects } from './subjects';
import { TicketUpdatedEvent } from './ticket-updated-event';

export class TicketEventUpdatedListener extends EventListener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;

  queueGroupName = 'sample-group-name';

  onMessage(data: TicketUpdatedEvent['data'], msg: Message): void {
    console.log(`Message received : ${JSON.stringify(data)}`);
    console.log(`Price : ${data.price}`);
    console.log(`Title : ${data.title}`);

    msg.ack();
  }
}
