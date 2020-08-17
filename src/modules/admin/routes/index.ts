import { Router } from 'express';

import preferencesRouter from './preferences.routes';
import messagesRouter from './messages.routes';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const adminRoutes = Router();

adminRoutes.use(ensureAuthenticated);

adminRoutes.use('/preferences', preferencesRouter);
adminRoutes.use('/messages', messagesRouter);

export default adminRoutes;
