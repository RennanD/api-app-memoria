/* eslint-disable no-unused-expressions */
import { getRepository } from 'typeorm';

import Preferences from '../schemas/PrersonPreferences';

import User from '../models/User';
import Contact from '../models/Contact';

import AppError from '../../../errors/AppError';

interface RequestDTO {
  category: string;
  subcategories: string[];
}

interface Response {
  status: number;
  content: string;
}

interface Request {
  person_id: string;
  preferences: RequestDTO[];
}

class CreatePreferencesService {
  public async execute({ person_id, preferences }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const contactRepository = getRepository(Contact);

    const checkUser = await userRepository.findOne({
      where: { id: person_id },
    });

    if (!checkUser) {
      const checkContact = await contactRepository.findOne({
        where: { id: person_id },
      });

      if (!checkContact) {
        throw new AppError(
          'Não foi possível localizar um usuário ou um contato com este ID',
        );
      }
    }

    const preferencesDatabase = await Preferences.find({ person_id });

    const preferencesDatabaseCategory = preferencesDatabase.map(
      preference => preference.category,
    );

    const existentPreferences = preferences.filter(preference =>
      preferencesDatabaseCategory.includes(preference.category),
    );

    const newCategories = preferences.filter(
      preference => !preferencesDatabaseCategory.includes(preference.category),
    );

    existentPreferences.map(async updatedPreference => {
      const findPreference = await Preferences.findOne({
        category: updatedPreference.category,
        person_id,
      });

      const newSubcategories = updatedPreference.subcategories.filter(
        newPreference => !findPreference?.subcategories.includes(newPreference),
      );

      findPreference?.subcategories.push(...newSubcategories);

      await findPreference?.save();

      return findPreference;
    });

    if (!newCategories.length) {
      return {
        status: 200,
        content: 'Preferências atualizadas com sucesso',
      };
    }

    await Preferences.create(
      newCategories.map(preference => ({
        person_id,
        category: preference.category,
        subcategories: [...preference.subcategories],
      })),
    );

    return {
      status: 200,
      content: 'Preferências criadas com sucesso!',
    };
  }
}

export default CreatePreferencesService;
