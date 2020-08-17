import { Router } from 'express';

import phoneRouter from './account.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import preferencesRouter from './preferences.routes';
import contactsRouter from './contacts.routes';
import datesRouter from './dates.routes';
import messagesRouter from './messages.routes';
import remindersRouter from './reminders.routes';

const routes = Router();

routes.use('/account', phoneRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/preferences', preferencesRouter);
routes.use('/contacts', contactsRouter);
routes.use('/dates', datesRouter);
routes.use('/messages', messagesRouter);
routes.use('/reminders', remindersRouter);

export default routes;
