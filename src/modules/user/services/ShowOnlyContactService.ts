import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id: string;
}

interface Response {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
}

class ShowOnlyContactService {
  public async execute({ contact_id }: Request): Promise<Response> {
    const contactRepository = getRepository(Contact);

    const contact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!contact) {
      throw new AppError('Resgistro não encontrado.');
    }

    delete contact.user.password;

    return {
      ...contact.user,
      avatar: contact.user.avatar
        ? `http://10.0.0.102:3333/files/${contact.user.avatar}`
        : 'https://siac.ufrj.br/wp-content/uploads/2020/02/Profile_avatar_placeholder_large.png',
      relationship: contact.relationship,
    };
  }
}

export default ShowOnlyContactService;
