import mongoose from 'mongoose';
import { app } from './app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
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
