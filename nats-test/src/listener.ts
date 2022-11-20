import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketEventListener } from './events/ticket-event-listener';
import { TicketUpdatedPublisher } from './events/ticket-updated-publisher';
import { TicketEventUpdatedListener } from './events/ticket-event-updated-listener';

console.clear();
const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

client.on('connect', () => {
  console.log(`Listener connected to NATS server`);

  client.on('close', () => {
    console.log('NATS listener connection closed');
    process.exit(1);
  });

  new TicketEventListener(client).subscribe();
  new TicketEventUpdatedListener(client).subscribe();
});

process.on('SIGTERM', () => client.close());
process.on('SIGINT', () => client.close());
