import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import controllUserAccess from '../../../middlewares/controllUserAccess';

import Dates from '../schemas/Dates';

const datesRouter = Router();
datesRouter.use(ensureAuthenticated);
datesRouter.use(controllUserAccess);

datesRouter.get('/', async (request, response) => {
  const dates = await Dates.find();

  return response.json(dates);
});

datesRouter.post('/', async (request, response) => {
  const { title } = request.body;

  const date = await Dates.create({
    title,
  });

  return response.json(date);
});

export default datesRouter;
