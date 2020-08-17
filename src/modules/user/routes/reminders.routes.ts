import { Router } from 'express';

import CreateRemindersService from '../services/CreateRemindersService';
import ListRemindersService from '../services/ListRemindersService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const remindersRouter = Router();

remindersRouter.use(ensureAuthenticated);

remindersRouter.get('/', async (request, response) => {
  const important_date_id: string = request.query.important_date_id as string;
  const { id } = request.user;

  const listReminders = new ListRemindersService();

  const reminders = await listReminders.execute({
    important_date_id,
    user_id: id,
  });

  return response.json(reminders);
});

remindersRouter.post('/', async (request, response) => {
  const data = request.body;
  const user_id = request.user.id;

  const createReminder = new CreateRemindersService();

  const reminder = await createReminder.execute({
    user_id,
    ...data,
  });

  return response.json(reminder);
});

export default remindersRouter;
