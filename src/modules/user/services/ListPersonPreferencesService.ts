import { Document } from 'mongoose';

import Preferences from '../schemas/PrersonPreferences';

class ListPersonPreferencesService {
  public async execute(person_id: string): Promise<Document[]> {
    const preferences = await Preferences.find({ person_id });

    return preferences;
  }
}

export default ListPersonPreferencesService;
