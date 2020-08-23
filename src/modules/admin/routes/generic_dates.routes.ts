import { Router } from 'express';
import CreateGenericDateService from '../services/CreateUserGenericDates';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import controllUserAccess from '../../../middlewares/controllUserAccess';

const genericDatesRouter = Router();
genericDatesRouter.use(ensureAuthenticated);
genericDatesRouter.use(controllUserAccess);

genericDatesRouter.post('/', async (request, response) => {
  const { date, description } = request.body;

  const createDate = new CreateGenericDateService();

  const userGenericDate = await createDate.execute({
    date,
    description,
  });

  return response.json(userGenericDate);
});

export default genericDatesRouter;
