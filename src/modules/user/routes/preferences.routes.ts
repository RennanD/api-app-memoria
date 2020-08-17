import { Router } from 'express';

import CreatePreferencesService from '../services/CreatePreferencesService';
import ListAllPreferencesService from '../services/ListAllPreferencesService';
import ListPersonPreferencesService from '../services/ListPersonPreferencesService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const preferencesRouter = Router();

preferencesRouter.use(ensureAuthenticated);

preferencesRouter.get('/list', async (request, response) => {
  const listPreferences = new ListAllPreferencesService();

  const preferences = await listPreferences.execute();

  return response.json(preferences);
});

preferencesRouter.get('/person/:person_id', async (request, response) => {
  const person_id = request.params.person_id as string;

  const listPreferences = new ListPersonPreferencesService();

  const preferences = await listPreferences.execute(person_id);

  return response.json(preferences);
});

preferencesRouter.post('/person/:id', async (request, response) => {
  const id = request.params.id as string;
  const { preferences: body_preferences } = request.body;

  const createPreferences = new CreatePreferencesService();

  const preferences = await createPreferences.execute({
    person_id: id,
    preferences: body_preferences,
  });

  return response.json(preferences);
});

export default preferencesRouter;
