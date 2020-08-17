import { getRepository } from 'typeorm';
import ImportantDate from '../models/ImportantDate';

interface Request {
  contact_id: string;
}

interface Response {
  id: string;
  date: Date;
  create_at: Date;
  updated_at: Date;
  contact: {
    id: string;
    name: string;
    avatar?: string;
  };
}

class ListContactDatesService {
  public async execute({
    contact_id,
  }: Request): Promise<Response[] | undefined> {
    const dateRepository = getRepository(ImportantDate);

    const dates = await dateRepository.find({
      where: {
        contact_id,
        deleted_at: null,
      },
    });

    const serialiazedDates = dates.map(date => ({
      id: date.id,
      date: date.date,
      create_at: date.created_at,
      updated_at: date.updated_at,
      contact: {
        id: date.contact.id,
        name: date.contact.name,
        avatar: date.contact.avatar,
      },
    }));

    return serialiazedDates;
  }
}

export default ListContactDatesService;
