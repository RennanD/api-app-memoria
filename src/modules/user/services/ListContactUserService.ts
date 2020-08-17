import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

interface Request {
  owner_id: string;
}

class ListContactUserService {
  public async execute({ owner_id }: Request): Promise<Contact[]> {
    const contactRepository = getRepository(Contact);

    const contacts = await contactRepository.find({
      where: {
        owner_id,
        deleted_at: null,
      },
    });

    const serializaredContacts = contacts.map(contact => {
      // eslint-disable-next-line no-param-reassign
      delete contact.user.password;

      return {
        ...contact,
        user: {
          ...contact.user,
          avatar: contact.user.avatar
            ? `http://10.0.0.102:3333/files/${contact.user.avatar}`
            : 'https://siac.ufrj.br/wp-content/uploads/2020/02/Profile_avatar_placeholder_large.png',
        },
      };
    });

    return serializaredContacts;
  }
}

export default ListContactUserService;
