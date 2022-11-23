import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  RouteNotFoundError,
  currentUser,
} from '@ticketing-rv/common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // jest would set NODE_ENV variable to 'test' when it runs the test
  })
);
app.use(currentUser);

app.all('*', async (req, res) => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
