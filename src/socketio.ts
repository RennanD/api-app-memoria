import cron from 'node-cron';
import { format } from 'date-fns';
import fetch from 'node-fetch';

import Reminder from './modules/user/schemas/Reminder';
import NotificationsToken from './modules/user/schemas/NotificationsToken';

export async function getReminders(): Promise<void> {
  // const connectedUsers: ConnectedUsers = {} as ConnectedUsers;
  const parsedNewDate = format(new Date(), "MM'-'dd");

  const notificationToken = await NotificationsToken.find();

  notificationToken.forEach(async notification => {
    const reminders = await Reminder.find({
      user_id: notification.user_id,
      parsed_date: parsedNewDate,
    });

    reminders.forEach(reminder => {
      console.log(reminder);
      cron.schedule(
        `${reminder.date}`,
        async () => {
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

          console.log('opaaaa');
        },
        {
          scheduled: reminder.active,
          timezone: 'America/Sao_Paulo',
        },
      );
    });
  });
}
