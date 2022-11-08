import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { RouteNotFoundError } from './errors/RouteNotFoundError';
import mongoose from 'mongoose';

const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

const startMongoDB = async () => {
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

//startMongoDB();
