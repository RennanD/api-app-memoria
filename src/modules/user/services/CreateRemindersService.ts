import { Document } from 'mongoose';

import Reminder from '../schemas/Reminder';

interface Reminder {
  user_id: string;
  title: string;
  reminderDate: Date;
  date: string;
  important_date_id: string;
  parsed_date: string;
  notification_message: string;
}

interface Request {
  reminders: Reminder[];
}

class CreateRemindersService {
  public async execute({ reminders }: Request): Promise<Document[]> {
    const reminder = await Reminder.create(
      reminders.map(reminderObjetc => ({
        user_id: reminderObjetc.user_id,
        important_date_id: reminderObjetc.important_date_id,
        title: reminderObjetc.title,
        date: reminderObjetc.date,
        reminderDate: reminderObjetc.reminderDate,
        parsed_date: reminderObjetc.parsed_date,
        notification_message: reminderObjetc.notification_message,
        active: true,
      })),
    );

    return reminder;
  }
}

export default CreateRemindersService;
