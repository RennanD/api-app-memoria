import { getRepository } from 'typeorm';
import { resolve } from 'path';
import { promises } from 'fs';

import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id: string;
  filename: string;
}

class UpdateContactAvatarService {
  public async execute({ contact_id, filename }: Request): Promise<Contact> {
    const userRespository = getRepository(Contact);

    const contact = await userRespository.findOne(contact_id);

    if (!contact) {
      throw new AppError('Você não pode atualizar esta informação', 401);
    }

    if (contact.avatar) {
      const userAvatarFilePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        contact.avatar,
      );

      const userAvatarExists = await promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await promises.unlink(userAvatarFilePath);
      }
    }

    contact.avatar = filename;
    await userRespository.save(contact);

    return {
      ...contact,
      avatar: contact.avatar
        ? `http://10.0.0.102:3333/files/${contact.avatar}`
        : 'https://siac.ufrj.br/wp-content/uploads/2020/02/Profile_avatar_placeholder_large.png',
    };
  }
}

export default UpdateContactAvatarService;
