import cron from 'node-cron';

import { getRepository } from 'typeorm';

import Reminder from './modules/user/schemas/Reminder';

import User from './modules/user/models/User';
import CreateNotificationService from './modules/user/services/CreateNotificationService';

export async function getReminders(): Promise<void> {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  let reminders: any[] = [];

  users.forEach(async user => {
    reminders = await Reminder.find({
      user_id: user.id,
      // parsed_date: parsedNewDate,
    });

    reminders.forEach(reminder => {
      cron.schedule(
        `${reminder.date}`,
        async () => {
          const createNotification = new CreateNotificationService();

          await createNotification.execute({
            notification_title: 'Data importante chegando!',
            description: reminder.notification_message,
            important_date_id: reminder.important_date_id,
            user_id: reminder.user_id,
          });
        },
        {
          scheduled: reminder.active,
          timezone: 'America/Sao_Paulo',
        },
      );
    });
  });

  console.log(reminders.length);
}
