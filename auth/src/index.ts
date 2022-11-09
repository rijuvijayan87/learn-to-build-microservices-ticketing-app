import mongoose from 'mongoose';
import { app } from './app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
    console.log('Connected to Mongodb..');
  } catch (error) {
    console.error(error);
  }
};

app.listen(PORT, () => {
  console.log(`auth service is listening on port : ${PORT}`);
});

start();
