import { Document } from 'mongoose';

import Reminder from '../schemas/Reminder';

interface Request {
  user_id: string;
  important_date_id: string;
}

class ListRemindersService {
  public async execute({
    user_id,
    important_date_id,
  }: Request): Promise<Document[]> {
    const reminders = await Reminder.find({ important_date_id, user_id });

    return reminders;
  }
}

export default ListRemindersService;
