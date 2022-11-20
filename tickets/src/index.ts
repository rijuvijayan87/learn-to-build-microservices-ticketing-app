import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await natsWrapper.connect('ticketing', 'rwrw', 'http://nats-service:4222');
    natsWrapper.client.on('close', () => {
      console.log('Connection to NATS server closed.');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to tickets mongodb..');
  } catch (error) {
    console.error(error);
  }
};

app.listen(PORT, () => {
  console.log(`auth service is listening on port : ${PORT}`);
});

start();
