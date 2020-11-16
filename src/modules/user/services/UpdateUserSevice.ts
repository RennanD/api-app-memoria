import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../../../errors/AppError';

interface Request {
  id: string;
  name?: string;
  birthday?: Date;
  email?: string;
  andress?: string;
  zipcode?: string;
}

class UpdateUserService {
  public async execute({ id, ...rest }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('usuário não encontrado', 401);
    }

    const updatedUser = {
      ...user,
      ...rest,
    };

    await userRepository.save(updatedUser);

    return updatedUser;
  }
}

export default UpdateUserService;
