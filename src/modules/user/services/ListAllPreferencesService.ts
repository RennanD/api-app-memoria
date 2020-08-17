import { Document } from 'mongoose';
import Preference from '../../admin/schemas/Preference';

class ListAllPreferencesService {
  public async execute(): Promise<Document[]> {
    const preferences = await Preference.find();

    return preferences;
  }
}

export default ListAllPreferencesService;
