import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';

import AppError from '../../../errors/AppError';

interface Request {
  date_id: string;
}

interface Response {
  id: string;
  date: Date;
  description: string;
  create_at: Date;
  updated_at: Date;
  contact: {
    id: string;
    name: string;
    avatar?: string;
  };
}

class ShowOnlyDateService {
  public async execute({ date_id }: Request): Promise<Response> {
    const dateRepository = getRepository(ImportantDate);

    // console.log(date_id);

    const date = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!date) {
      throw new AppError('Resgistro não encontrado.');
    }

    return {
      id: date.id,
      date: date.date,
      create_at: date.created_at,
      description: date.description,
      updated_at: date.updated_at,
      contact: {
        id: date.contact.id,
        name: date.contact.user.name,
        avatar: date.contact.user.avatar
          ? `${process.env.APP_URL}/${date.contact.user.avatar}`
          : `${process.env.APP_AVATAR}`,
      },
    };
  }
}

export default ShowOnlyDateService;
