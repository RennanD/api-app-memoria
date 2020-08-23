import { getRepository } from 'typeorm';

import GenericDate from '../models/GenericDate';

interface Request {
  date: Date;
  description: string;
}

class CreateGenericDateService {
  public async execute({ date, description }: Request): Promise<GenericDate> {
    const dateRepository = getRepository(GenericDate);

    const userGenericDate = dateRepository.create({
      date,
      description,
    });

    await dateRepository.save(userGenericDate);

    return userGenericDate;
  }
}

export default CreateGenericDateService;
