import { Router } from 'express';

import CreateRemindersService from '../services/CreateRemindersService';
import ListRemindersService from '../services/ListRemindersService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import Reminder from '../schemas/Reminder';

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

  const reminders = data.map((reminderObject: any) => ({
    ...reminderObject,
    user_id,
  }));

  const createReminder = new CreateRemindersService();

  const reminder = await createReminder.execute({
    reminders,
  });

  return response.json(reminder);
});

remindersRouter.patch('/:reminder_id', async (request, response) => {
  const { reminder_id } = request.params;

  const { active } = request.body;

  const reminder = await Reminder.findById(reminder_id);

  if (!reminder) {
    return response.status(400).json({ error: 'Erro' });
  }

  reminder.active = active;

  await reminder?.save();

  return response.send();
});

export default remindersRouter;
