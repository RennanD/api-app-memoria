import { getRepository } from 'typeorm';

import UserGenericDate from '../models/UserGenericDate';

import AppError from '../../../errors/AppError';

interface Request {
  date_id: string;
}

class ShowOnlyGenericDateService {
  public async execute({ date_id }: Request): Promise<UserGenericDate> {
    const dateRepository = getRepository(UserGenericDate);

    const date = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!date) {
      throw new AppError('Resgistro não encontrado.');
    }

    return date;
  }
}

export default ShowOnlyGenericDateService;
