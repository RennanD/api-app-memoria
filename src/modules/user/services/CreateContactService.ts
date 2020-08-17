import { getRepository } from 'typeorm';

import Contact from '../models/Contact';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

interface Request {
  owner_id: string;
  phone_number: string;
  relationship: string;
}

class CreateContactService {
  public async execute({
    owner_id,
    phone_number,
    relationship,
  }: Request): Promise<Contact> {
    const accountRespository = getRepository(Account);
    const contactRespository = getRepository(Contact);

    const checkAccount = await accountRespository.findOne({
      where: { phone_number },
    });

    if (!checkAccount) {
      throw new AppError(
        'Este contato ainda não é usuário, covinde-o para poder adicionar à sua lista de contatos',
      );
    }

    const contact = contactRespository.create({
      user_id: checkAccount.user.id,
      owner_id,
      relationship,
    });

    await contactRespository.save(contact);

    return contact;
  }
}

export default CreateContactService;
