import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class EventListener<T extends Event> {
  abstract queueGroupName: string;
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Stan;
  private ackWait: number = 5 * 1000;
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName);
  }

  subscribe() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received on channel : ${this.subject} / ${this.queueGroupName}`
      );
      const data = this.parseData(msg);
      this.onMessage(data, msg);
    });
  }

  parseData(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data.toString())
      : JSON.parse(data.toString('utf-8'));
  }
}
