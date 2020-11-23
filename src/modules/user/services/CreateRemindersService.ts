import { Document } from 'mongoose';

import Reminder from '../schemas/Reminder';

interface Reminder {
  user_id: string;
  title: string;
  start_date?: Date;
  end_date?: Date;
  reminderDate: Date;
  date: string;
  important_date_id: string;
  parsed_date: string;
  notification_message: string;
}

class CreateRemindersService {
  public async execute(reminderObjetc: Reminder): Promise<Document> {
    const reminder = await Reminder.create({
      user_id: reminderObjetc.user_id,
      important_date_id: reminderObjetc.important_date_id,
      title: reminderObjetc.title,
      date: reminderObjetc.date,
      reminderDate: reminderObjetc.reminderDate,
      parsed_date: reminderObjetc.parsed_date,
      notification_message: reminderObjetc.notification_message,
      active: true,
    });

    return reminder;
  }
}

export default CreateRemindersService;
