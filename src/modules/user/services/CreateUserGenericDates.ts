import { getRepository } from 'typeorm';

import UserGenericDate from '../models/UserGenericDate';

interface Request {
  user_id: string;
  date: Date;
  description: string;
}

class CreateUserGenericDateService {
  public async execute({
    user_id,
    date,
    description,
  }: Request): Promise<UserGenericDate> {
    const dateRepository = getRepository(UserGenericDate);

    const userGenericDate = dateRepository.create({
      user_id,
      date,
      description,
    });

    await dateRepository.save(userGenericDate);

    return userGenericDate;
  }
}

export default CreateUserGenericDateService;
