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

cron.schedule('*/4 20-21 * * *', async () => {
  console.log('passou');
  await getReminders();
});

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
