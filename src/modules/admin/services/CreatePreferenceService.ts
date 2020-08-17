import { Document } from 'mongoose';

import Preference from '../schemas/Preference';

import AppError from '../../../errors/AppError';

class CreatePreferenceServices {
  public async execute(category: string): Promise<Document> {
    const checkCategory = await Preference.findOne({
      category,
    });

    // console.log(checkCategory);

    if (checkCategory) {
      throw new AppError('Esta categoria já foi cadastrada.');
    }

    const preference = await Preference.create({
      category,
      subcategories: [],
    });

    return preference;
  }
}

export default CreatePreferenceServices;
