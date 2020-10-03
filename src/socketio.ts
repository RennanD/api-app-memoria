import socketio from 'socket.io';
// import cron from 'node-cron';
import { CronJob } from 'cron';
import { format } from 'date-fns';

import server from './server';

import Reminder from './modules/user/schemas/Reminder';
import NotificationsToken from './modules/user/schemas/NotificationsToken';

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

    const notificationToken = await NotificationsToken.findOne({ user_id });

    const ownerSocktet = connectedUsers[user_id];

    if (ownerSocktet) {
      reminders.forEach(reminder => {
        const schedule = new CronJob(
          `${reminder.date} *`,
          async () => {
            const message = {
              to: notificationToken?.token,
              sound: 'default',
              title: 'Data importante chegando, fique de olho :)',
              body: reminder.notification_message,
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
          },
          null,
          reminder.active,
          'America/Sao_Paulo',
        );

        console.log(schedule);

        // cron.schedule(`${reminder.date} *`, () => {
        //   io.to(ownerSocktet).emit('notification', reminder);
        // });
      });
    }

    socket.on('disconnect', () => {
      delete connectedUsers[user_id];
    });
  });
}
