import AppError from '../../../errors/AppError';
import PersonPreferences from '../schemas/PrersonPreferences';

interface Request {
  category: string;
  subcategory: string;
}

class RemovePreferenceService {
  public async execute({ category, subcategory }: Request): Promise<void> {
    const personPreference = await PersonPreferences.findOne({
      category,
    });

    if (!personPreference) {
      throw new AppError('Categoria não encontrado');
    }

    const filteredSubcategories = personPreference?.subcategories.filter(
      subcategoryItem => subcategory !== subcategoryItem,
    );

    if (filteredSubcategories && personPreference) {
      personPreference.subcategories = filteredSubcategories;

      await personPreference.save();
    }

    if (!personPreference.subcategories.length) {
      await PersonPreferences.deleteOne({ category });
    }
  }
}

export default RemovePreferenceService;
