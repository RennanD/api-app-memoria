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
          ? `http://10.0.0.102:3333/files/${date.contact.user.avatar}`
          : 'https://siac.ufrj.br/wp-content/uploads/2020/02/Profile_avatar_placeholder_large.png',
      },
    };
  }
}

export default ShowOnlyDateService;
