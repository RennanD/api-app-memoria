import { Router } from 'express';

import preferencesRouter from './preferences.routes';
import messagesRouter from './messages.routes';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import genericDatesRouter from './generic_dates.routes';
import datesRouter from './dates.routes';

const adminRoutes = Router();

adminRoutes.use(ensureAuthenticated);

adminRoutes.use('/preferences', preferencesRouter);
adminRoutes.use('/messages', messagesRouter);
adminRoutes.use('/generic-dates', genericDatesRouter);
adminRoutes.use('/dates', datesRouter);

export default adminRoutes;
