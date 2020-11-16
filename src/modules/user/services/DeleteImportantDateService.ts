import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';

import AppError from '../../../errors/AppError';

interface Request {
  date_id: string;
  user_id: string;
}

class DeleteImportantDateService {
  public async execute({ date_id, user_id }: Request): Promise<void> {
    const dateRepository = getRepository(ImportantDate);

    const date = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!date) {
      throw new AppError('Registro não encontrado');
    }

    if (date.user_id !== user_id) {
      throw new AppError('Você não tem autorização para isso.');
    }

    date.deleted_at = new Date();

    await dateRepository.save(date);
  }
}

export default DeleteImportantDateService;
