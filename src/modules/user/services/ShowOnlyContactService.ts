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
        ? `${process.env.APP_URL}/${contact.user.avatar}`
        : `${process.env.APP_AVATAR}`,
      relationship: contact.relationship,
    };
  }
}

export default ShowOnlyContactService;
