import { Document } from 'mongoose';
import Notification from '../schemas/Notification';

class ListNotificationsService {
  public async execute(user_id: string): Promise<Document[]> {
    const notifications = await Notification.find({
      user_id,
    });

    return notifications;
  }
}

export default ListNotificationsService;
