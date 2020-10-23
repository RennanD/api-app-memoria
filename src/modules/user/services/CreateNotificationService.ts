import { Document } from 'mongoose';

import axios from 'axios';

import Notification from '../schemas/Notification';
import NotificationsToken from '../schemas/NotificationsToken';
import AppError from '../../../errors/AppError';

interface Request {
  important_date_id: string;
  description: string;
  user_id: string;
}

class CreateNotificationService {
  public async execute({
    important_date_id,
    user_id,
    description,
  }: Request): Promise<Document> {
    console.log('entrou no service');
    const notification = await Notification.create({
      description,
      important_date_id,
      user_id,
      read: false,
    });

    const pushUserToken = await NotificationsToken.findOne({
      user_id,
    });

    if (!pushUserToken) {
      throw new AppError('Voçê ainda não possui um token de notificações');
    }

    const response = await axios.post('https://exp.host/--/api/v2/push/send', {
      to: pushUserToken.token,
      sound: 'default',
      title: 'Data importante chegando, fique de olho :)',
      body: description,
      data: {
        route: 'notifications',
      },
    });

    console.log(response.data);

    return notification;
  }
}

export default CreateNotificationService;
