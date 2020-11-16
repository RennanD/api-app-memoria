import { Document } from 'mongoose';
import Preference from '../schemas/Preference';
import AppError from '../../../errors/AppError';

interface Request {
  preference_id: string;
  subcategories: string[];
}

class CreateSubcategoriesService {
  public async execute({
    preference_id,
    subcategories,
  }: Request): Promise<Document> {
    const checkPreference = await Preference.findById(preference_id);

    if (!checkPreference) {
      throw new AppError('Preferência não encontrada');
    }

    const existentSubcategories = checkPreference.subcategories;

    const finalSubcategories = subcategories
      .filter(subcategory => !existentSubcategories?.includes(subcategory))
      .filter((value, index, self) => self.indexOf(value) === index);

    checkPreference.subcategories.push(...finalSubcategories);

    await checkPreference.save();

    return checkPreference;
  }
}

export default CreateSubcategoriesService;
