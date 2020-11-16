import { Router } from 'express';

import CreateUserGenericDateService from '../services/CreateUserGenericDates';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import ShowOnlyGenericDateService from '../services/ShowOnlyGenericDateService';

const userGenericDateRouter = Router();

userGenericDateRouter.use(ensureAuthenticated);

userGenericDateRouter.get('/:date_id', async (request, response) => {
  const showDate = new ShowOnlyGenericDateService();

  const date_id = request.params.date_id as string;

  const date = await showDate.execute({
    date_id,
  });

  return response.json(date);
});

userGenericDateRouter.post('/', async (request, response) => {
  const { date, description, relationship, friend_name } = request.body;

  const { id } = request.user;

  const createDate = new CreateUserGenericDateService();

  const userGenericDate = await createDate.execute({
    user_id: id,
    date,
    description,
    friend_name,
    relationship,
  });

  return response.json(userGenericDate);
});

export default userGenericDateRouter;
