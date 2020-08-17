import { getRepository } from 'typeorm';

import ImportantDate from '../models/ImportantDate';
import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface Request {
  contact_id?: string;
  date_id: string;
  date: Date;
  description: string;
}

class EditImportantDateService {
  public async execute({
    date_id,
    contact_id,
    date,
    description,
  }: Request): Promise<ImportantDate> {
    const dateRepository = getRepository(ImportantDate);
    const contactRepository = getRepository(Contact);

    const importantDate = await dateRepository.findOne({
      where: {
        id: date_id,
      },
    });

    if (!importantDate) {
      throw new AppError('Registro não encontrado.');
    }

    importantDate.date = date;
    importantDate.description = description;

    if (contact_id) {
      const checkContact = await contactRepository.findOne({
        where: {
          id: contact_id,
        },
      });

      if (!checkContact) {
        throw new AppError('Contato não encontrado.');
      }

      importantDate.contact_id = contact_id;
    }

    await dateRepository.save(importantDate);

    return importantDate;
  }
}

export default EditImportantDateService;
