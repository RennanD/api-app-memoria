// import socketio from 'socket.io';
import cron, { schedule } from 'node-cron';
// import { CronJob } from 'cron';
import { format } from 'date-fns';

// import server from './server';

import Reminder from './modules/user/schemas/Reminder';
import NotificationsToken from './modules/user/schemas/NotificationsToken';

// interface ConnectedUsers {
//   [key: string]: string;
// }

export async function getReminders(): Promise<void> {
  // const io = socketio(server);
  // const connectedUsers: ConnectedUsers = {} as ConnectedUsers;
  const parsedNewDate = format(new Date(), "MM'-'dd");

  // const { user_id } = socket.handshake.query;
  // connectedUsers[user_id] = socket.id;

  const notificationToken = await NotificationsToken.find();
  console.log(notificationToken);

  // const ownerSocktet = connectedUsers[user_id];

  notificationToken.forEach(async notification => {
    const reminders = await Reminder.find({
      user_id: notification.user_id,
      parsed_date: parsedNewDate,
    });

    reminders.forEach(reminder => {
      console.log(reminder);
      cron.schedule(`${reminder.date} *`, async () => {
        const message = {
          to: notification.token,
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
        console.log('passou oh');
      });

      // cron.schedule(`${reminder.date} *`, () => {
      //   io.to(ownerSocktet).emit('notification', reminder);
      // });
    });
  });
}
