import { getRepository } from 'typeorm';
import { format } from 'date-fns';

import Contact from '../models/Contact';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

import CreateNotificationService from './CreateNotificationService';
import CreateRemindersService from './CreateRemindersService';
import CreateImportantDateService from './CreateImportantDateService';
import CreateContactService from './CreateContactService';

interface Request {
  owner_id: string;
  guest_id: string;
}

class AcceptInviteService {
  public async execute({ owner_id, guest_id }: Request): Promise<Contact> {
    const accountRespository = getRepository(Account);
    const contactRespository = getRepository(Contact);

    const createNotification = new CreateNotificationService();
    const createReminders = new CreateRemindersService();
    const createImportantDate = new CreateImportantDateService();
    const createContact = new CreateContactService();

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

    const ownerContact = await createContact.execute({
      owner_id: ownerAccount.user.id,
      phone_number: guestAccount.phone_number,
    });

    const guestContact = await createContact.execute({
      owner_id: guestAccount.user.id,
      phone_number: ownerAccount.phone_number,
    });

    const ownerDate = await createImportantDate.execute({
      user_id: ownerAccount.user.id,
      contact_id: ownerContact.id,
      date: guestAccount.user.birthday,
      description: `Aniversário de ${guestAccount.user.name}`,
    });

    const guestDate = await createImportantDate.execute({
      user_id: guestAccount.user.id,
      contact_id: guestContact.id,
      date: ownerAccount.user.birthday,
      description: `Aniversário de ${ownerAccount.user.name}`,
    });

    const stringDateGuest = format(guestDate.date, "MM'-'dd");
    const getMonthGuest = guestDate.date.getMonth() + 1;
    const getDayGuest = guestDate.date.getDate();

    const stringDateOwner = format(ownerDate.date, "MM'-'dd");
    const getMonthOwner = ownerDate.date.getMonth() + 1;
    const getDayOwner = ownerDate.date.getDate();

    const reminders = [
      {
        user_id: ownerAccount.user.id,
        important_date_id: ownerDate.id,
        title: `Aniversário de ${guestAccount.user.name}`,
        date: `10 ${getDayGuest} ${getMonthGuest} * *`,
        reminderDate: ownerDate.date,
        parsed_date: stringDateOwner,
        notification_message: `Aniversário de ${guestAccount.user.name}, lhe deseje feliz aniversário! :)`,
        active: true,
      },
      {
        user_id: guestAccount.user.id,
        important_date_id: guestDate.id,
        title: `Aniversário de ${ownerAccount.user.name}`,
        date: `10 ${getDayOwner} ${getMonthOwner} * *`,
        reminderDate: guestDate.date,
        parsed_date: stringDateGuest,
        notification_message: `Aniversário de ${ownerAccount.user.name}, lhe deseje feliz aniversário! :)`,
        active: true,
      },
    ];

    await createReminders.execute({
      reminders,
    });

    await createNotification.execute({
      notification_title: `Sua lista de contatos está maior.`,
      description: `${guestAccount.user.name} aceitou seu convite.`,
      important_date_id: guestDate.id,
      user_id: ownerAccount.user.id,
    });

    return ownerContact;
  }
}

export default AcceptInviteService;
