import cron from 'node-cron';
// import { format } from 'date-fns';
// import fetch from 'node-fetch';

import { getRepository } from 'typeorm';

import Reminder from './modules/user/schemas/Reminder';
// import NotificationsToken from './modules/user/schemas/NotificationsToken';

import User from './modules/user/models/User';
import CreateNotificationService from './modules/user/services/CreateNotificationService';

export async function getReminders(): Promise<void> {
  // const connectedUsers: ConnectedUsers = {} as ConnectedUsers;
  // const parsedNewDate = format(new Date(), "MM'-'dd");

  // const notificationToken = await NotificationsToken.find();

  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  let reminders = [];

  users.forEach(async user => {
    reminders = await Reminder.find({
      user_id: user.id,
      // parsed_date: parsedNewDate,
    });

    reminders.forEach(reminder => {
      console.log(reminder);
      cron.schedule(
        `${reminder.date}`,
        async () => {
          console.log('entrou aqui');

          const createNotification = new CreateNotificationService();

          const notification = await createNotification.execute({
            description: reminder.notification_message,
            important_date_id: reminder.important_date_id,
            user_id: reminder.user_id,
          });

          console.log(notification);
        },
        {
          scheduled: reminder.active,
          timezone: 'America/Sao_Paulo',
        },
      );
    });
  });
}
