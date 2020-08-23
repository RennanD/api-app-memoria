import { Router } from 'express';

import CreateImportantDateService from '../services/CreateImportantDateService';
import ListUserDatesService from '../services/ListUserDatesService';
import ListUserGenericDatesService from '../services/ListUserGenericDatesService';
import ShowOnlyDateService from '../services/ShowOnlyDateService';
import EditImportantDateService from '../services/EditImportantDateService';
import DeleteImportantDateService from '../services/DeleteImportantDateService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const datesRouter = Router();

datesRouter.use(ensureAuthenticated);

datesRouter.get('/:date_id', async (request, response) => {
  const showDate = new ShowOnlyDateService();

  const date_id = request.params.date_id as string;

  const date = await showDate.execute({
    date_id,
  });

  return response.json(date);
});

datesRouter.get('/', async (request, response) => {
  const listDates = new ListUserDatesService();
  const listUserGenericDates = new ListUserGenericDatesService();

  const { id } = request.user;
  const month = request.query.month as string;

  const dates = await listDates.execute({
    user_id: id,
    month: Number(month),
  });

  const userGenericdates = await listUserGenericDates.execute({
    user_id: id,
    month: Number(month),
  });

  const responseDates = [...dates, ...userGenericdates];

  return response.json(responseDates);
});

datesRouter.post('/', async (request, response) => {
  const { contact_id, date, description } = request.body;

  const { id } = request.user;

  const createDate = new CreateImportantDateService();

  const importantDate = await createDate.execute({
    user_id: id,
    contact_id,
    date,
    description,
  });

  return response.json(importantDate);
});

datesRouter.put('/:date_id', async (request, response) => {
  const date_id = request.params.date_id as string;

  const editDate = new EditImportantDateService();

  const data = request.body;

  const date = await editDate.execute({
    date_id,
    ...data,
  });

  return response.json(date);
});

datesRouter.delete('/:date_id', async (request, response) => {
  const date_id = request.params.date_id as string;
  const user_id = request.user.id;

  const deleteDate = new DeleteImportantDateService();

  await deleteDate.execute({
    user_id,
    date_id,
  });

  return response.send();
});

export default datesRouter;
