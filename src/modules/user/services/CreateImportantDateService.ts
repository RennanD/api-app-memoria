import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';
import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id: string;
  user_id: string;
  date: Date;
  description: string;
}

class CreateImportantDateService {
  public async execute({
    contact_id,
    user_id,
    date,
    description,
  }: Request): Promise<ImportantDate> {
    const contactRepository = getRepository(Contact);
    const dateRepository = getRepository(ImportantDate);

    const checkContact = await contactRepository.findOne({
      where: {
        id: contact_id,
      },
    });

    if (!checkContact) {
      throw new AppError('Contato não encontrado.');
    }

    const importantDate = dateRepository.create({
      user_id,
      contact_id,
      date,
      description,
    });

    await dateRepository.save(importantDate);

    return importantDate;
  }
}

export default CreateImportantDateService;
