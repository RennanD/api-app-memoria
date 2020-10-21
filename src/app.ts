import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cron from 'node-cron';
import { resolve } from 'path';
import cors from 'cors';

import './database';
import './database/mongoConnect';

import { getReminders } from './socketio';

import appErrors from './middlewares/exceptionHandlers';
import userRoutes from './modules/user/routes';
import adminRoutes from './modules/admin/routes';

// import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use('/admin', adminRoutes);

app.use(appErrors);

cron.schedule('*/4 20-21 * * *', async () => {
  const message = {
    to: 'ExponentPushToken[v_SRqyMrHuM9ejem04RU91]',
    sound: 'default',
    title: 'Notificação',
    body: 'Ele passou daqui, fica ligago',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  await getReminders();
});

app.use('/files', express.static(resolve(__dirname, '..', 'tmp')));
app.use(
  '/files/messages',
  express.static(resolve(__dirname, '..', 'tmp', 'messages')),
);

export default app;
