import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cron from 'node-cron';
import { resolve } from 'path';
import cors from 'cors';
import fetch from 'node-fetch';

import './database';
import './database/mongoConnect';

import { getReminders } from './socketio';

import appErrors from './middlewares/exceptionHandlers';
import userRoutes from './modules/user/routes';
import adminRoutes from './modules/admin/routes';

cron.schedule(
  '0 0 * * *',
  async () => {
    console.log('passou');
    const message = {
      to: 'ExponentPushToken[v_SRqyMrHuM9ejem04RU91]',
      sound: 'default',
      title: 'Data importante chegando, fique de olho :)',
      body: 'Pelo menos daqui enviou po',
      data: { data: 'goes here' },
    };

    try {
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
      console.log('beleza, foi');
    } catch (error) {
      console.log(error);
    }
  },
  {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  },
);

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use('/admin', adminRoutes);

app.use(appErrors);

app.use('/files', express.static(resolve(__dirname, '..', 'tmp')));
app.use(
  '/files/messages',
  express.static(resolve(__dirname, '..', 'tmp', 'messages')),
);

export default app;
