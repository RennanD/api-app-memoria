import socketio from 'socket.io';
import cron from 'node-cron';
import { format } from 'date-fns';

import server from './server';

import Reminder from './modules/user/schemas/Reminder';

interface ConnectedUsers {
  [key: string]: string;
}

export async function getReminders(): Promise<void> {
  const io = socketio(server);
  const connectedUsers: ConnectedUsers = {} as ConnectedUsers;
  const parsedNewDate = format(new Date(), "MM'-'dd");

  io.on('connection', async socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

    const reminders = await Reminder.find({
      user_id,
      parsed_date: parsedNewDate,
    });

    const ownerSocktet = connectedUsers[user_id];

    if (ownerSocktet) {
      reminders.forEach(reminder => {
        cron.schedule(`${reminder.date} *`, () => {
          io.to(ownerSocktet).emit('notification', reminder);
        });
      });
    }

    socket.on('disconnect', () => {
      delete connectedUsers[user_id];
    });
  });
}
