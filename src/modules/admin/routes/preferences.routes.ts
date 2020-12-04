import { Router } from 'express';

import CreatePreferenceServices from '../services/CreatePreferenceService';
import CreateSubcategoriesService from '../services/CreateSubcategoriesService';

import controllUserAccess from '../../../middlewares/controllUserAccess';
import RemoveAdminPreferenceService from '../services/RemoveAdminPreferences';

const preferencesRouter = Router();

preferencesRouter.use(controllUserAccess);

preferencesRouter.post('/', async (request, response) => {
  const { category } = request.body;

  const createPreference = new CreatePreferenceServices();

  const preference = await createPreference.execute(category);

  return response.json(preference);
});

preferencesRouter.post(
  '/:preference_id/subcategories',
  async (request, response) => {
    const { preference_id } = request.params;

    const data: string[] = request.body.subcategories;

    const createSubcategories = new CreateSubcategoriesService();

    const preference = await createSubcategories.execute({
      preference_id,
      subcategories: data,
    });

    return response.json(preference);
  },
);

preferencesRouter.delete(
  '/:category/:subcatecory',
  async (request, response) => {
    const { params } = request;
    const deletePreference = new RemoveAdminPreferenceService();

    await deletePreference.execute({
      category: params.category,
      subcategory: params.subcatecory,
    });

    return response.send();
  },
);

export default preferencesRouter;
