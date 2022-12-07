import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, RouteNotFoundError } from '@ticketing-rv/common';
import cookieSession from 'cookie-session';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes';
import { deleteOrderRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure: process.env.NODE_ENV !== 'test', // jest would set NODE_ENV variable to 'test' when it runs the test
    secure: false,
  })
);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async (req, res) => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
