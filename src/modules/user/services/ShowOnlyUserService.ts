import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../../../errors/AppError';

interface Request {
  user_id: string;
}

interface Response {
  id: string;
  name: string;
  avatar?: string;
}

class ShowOnlyUserService {
  public async execute({ user_id }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    console.log(user_id);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    console.log(user);

    if (!user) {
      throw new AppError('Resgistro não encontrado.');
    }

    return {
      ...user,
      avatar: user.avatar
        ? `${process.env.APP_URL}/${user.avatar}`
        : `${process.env.APP_AVATAR}`,
    };
  }
}

export default ShowOnlyUserService;
