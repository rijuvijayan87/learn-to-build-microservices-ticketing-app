import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, RouteNotFoundError } from '@ticketing-rv/common';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
