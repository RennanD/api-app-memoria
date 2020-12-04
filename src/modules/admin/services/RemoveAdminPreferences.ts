import AppError from '../../../errors/AppError';
import Preferences from '../schemas/Preference';

interface Request {
  category: string;
  subcategory: string;
}

class RemoveAdminPreferenceService {
  public async execute({ category, subcategory }: Request): Promise<void> {
    const preference = await Preferences.findOne({
      category,
    });

    if (!preference) {
      throw new AppError('Categoria não encontrado');
    }

    const filteredSubcategories = preference?.subcategories.filter(
      subcategoryItem => subcategory !== subcategoryItem,
    );

    if (filteredSubcategories && preference) {
      preference.subcategories = filteredSubcategories;

      await preference.save();
    }
  }
}

export default RemoveAdminPreferenceService;
