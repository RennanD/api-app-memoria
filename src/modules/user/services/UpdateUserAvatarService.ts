import { getRepository } from 'typeorm';
import { resolve } from 'path';
import { promises } from 'fs';

import User from '../models/User';

import AppError from '../../../errors/AppError';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const userRespository = getRepository(User);

    const userExists = await userRespository.findOne(user_id);

    if (!userExists) {
      throw new AppError('Você não pode atualizar esta informação', 401);
    }

    if (userExists.avatar) {
      const userAvatarFilePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        userExists.avatar,
      );

      const userAvatarExists = await promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }

    userExists.avatar = filename;
    await userRespository.save(userExists);

    return {
      ...userExists,
      avatar: userExists.avatar
        ? `${process.env.APP_URL}/${userExists.avatar}`
        : `${process.env.APP_AVATAR}`,
    };
  }
}

export default UpdateUserAvatarService;
