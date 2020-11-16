import { Document } from 'mongoose';
import { getRepository } from 'typeorm';
import AppError from '../../../errors/AppError';

import User from '../models/User';
import NotificationsToken from '../schemas/NotificationsToken';

interface Request {
  user_id: string;
  token: string;
}

class CreateNotificationTokenService {
  public async execute({ token, user_id }: Request): Promise<Document> {
    const userRepository = getRepository(User);

    const checkUser = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!checkUser) {
      throw new AppError('Usuário não encontrado');
    }

    const notificationToken = await NotificationsToken.create({
      token,
      user_id,
    });

    return notificationToken;
  }
}

export default CreateNotificationTokenService;
