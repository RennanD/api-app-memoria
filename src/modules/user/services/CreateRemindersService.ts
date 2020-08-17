import { Document } from 'mongoose';

import Reminder from '../schemas/Reminder';

interface Request {
  user_id: string;
  title: string;
  reminderDate: Date;
  date: string;
  important_date_id: string;
  parsed_date: string;
  notification_message: string;
}

class CreateRemindersService {
  public async execute({
    user_id,
    date,
    important_date_id,
    title,
    reminderDate,
    parsed_date,
    notification_message,
  }: Request): Promise<Document> {
    const reminder = await Reminder.create({
      user_id,
      important_date_id,
      title,
      date,
      reminderDate,
      parsed_date,
      notification_message,
    });

    return reminder;
  }
}

export default CreateRemindersService;
