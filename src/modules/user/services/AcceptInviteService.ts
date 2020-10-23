import { getRepository } from 'typeorm';

import Contact from '../models/Contact';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

import CreateImportantDateService from './CreateImportantDateService';
import CreateNotificationService from './CreateNotificationService';

interface Request {
  owner_id: string;
  guest_id: string;
}

class AcceptInviteService {
  public async execute({ owner_id, guest_id }: Request): Promise<Contact> {
    const accountRespository = getRepository(Account);
    const contactRespository = getRepository(Contact);

    const createImportantDate = new CreateImportantDateService();
    const createNotification = new CreateNotificationService();

    const ownerAccount = await accountRespository.findOne({
      where: { user_id: owner_id },
    });

    const guestAccount = await accountRespository.findOne({
      where: { user_id: guest_id },
    });

    if (!ownerAccount) {
      throw new AppError(
        'Este contato ainda não é usuário, covinde-o para poder adicionar à sua lista de contatos',
      );
    }

    if (!guestAccount) {
      throw new AppError(
        'Este contato ainda não é usuário, covinde-o para poder adicionar à sua lista de contatos',
      );
    }

    const isMyContact = await contactRespository.findOne({
      where: {
        user_id: owner_id,
        owner_id: guestAccount.user.id,
      },
    });

    if (isMyContact) {
      throw new AppError('Você já possui este contato na sua lista');
    }

    const owner = contactRespository.create({
      user_id: guestAccount.user.id,
      owner_id,
    });

    const guest = contactRespository.create({
      user_id: owner_id,
      owner_id: guestAccount.user.id,
    });

    await contactRespository.save(owner);
    await contactRespository.save(guest);

    const guestDate = await createImportantDate.execute({
      user_id: ownerAccount.user.id,
      contact_id: guestAccount.user.id,
      date: guestAccount.user.birthday,
      description: `Aniversário de ${guestAccount.user.name}`,
    });

    await createImportantDate.execute({
      user_id: guestAccount.user.id,
      contact_id: ownerAccount.user.id,
      date: ownerAccount.user.birthday,
      description: `Aniversário de ${ownerAccount.user.name}`,
    });

    await createNotification.execute({
      description: `${guestAccount.user.name}`,
      important_date_id: guestDate.id,
      user_id: ownerAccount.user.id,
    });

    return owner;
  }
}

export default AcceptInviteService;
