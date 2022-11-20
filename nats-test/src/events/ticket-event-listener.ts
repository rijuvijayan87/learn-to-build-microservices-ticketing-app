import { Message } from 'node-nats-streaming';
import { EventListener } from './event-listener';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketEventListener extends EventListener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

  queueGroupName = 'sample-group-name';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(`Message received : ${JSON.stringify(data)}`);
    console.log(`Price : ${data.price}`);
    console.log(`Title : ${data.title}`);

    msg.ack();
  }
}
