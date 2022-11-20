import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot connect to NATS before connecting');
    }

    return this._client;
  }

  connect(cluserId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(cluserId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('NATS server connected');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
