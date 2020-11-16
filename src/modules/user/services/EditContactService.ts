import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id: string;
  name: string;
  phone_number: string;
  avatar?: string;
}

class EditContactService {
  public async execute({
    contact_id,
    phone_number,
    ...rest
  }: Request): Promise<Contact> {
    const contactRepository = getRepository(Contact);

    const contact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!contact) {
      throw new AppError('Conato não encontrado');
    }

    const checkPhone = await contactRepository.findOne({
      where: {
        id: phone_number,
      },
    });

    if (checkPhone) {
      throw new AppError('Um conato já está cadastrado com este número');
    }

    contact.phone_number = phone_number;
    contact.name = rest.name;

    if (rest.avatar) {
      contact.avatar = rest.avatar;
    }

    contactRepository.save(contact);

    return contact;
  }
}

export default EditContactService;
