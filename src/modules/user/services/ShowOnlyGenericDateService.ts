import { getRepository } from 'typeorm';

import UserGenericDate from '../models/UserGenericDate';
import GenericDate from '../../admin/models/GenericDate';

import AppError from '../../../errors/AppError';

interface Request {
  date_id: string;
}

interface Response {
  id: string;
  date: Date;
  description: string;
}

class ShowOnlyGenericDateService {
  public async execute({ date_id }: Request): Promise<Response> {
    const dateRepository = getRepository(UserGenericDate);
    const genericDateRepository = getRepository(GenericDate);

    const date = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!date) {
      const genericDate = await genericDateRepository.findOne({
        where: {
          id: date_id,
        },
      });

      if (!genericDate) {
        throw new AppError('Resgistro não encontrado.');
      }

      return genericDate;
    }

    return date;
  }
}

export default ShowOnlyGenericDateService;
