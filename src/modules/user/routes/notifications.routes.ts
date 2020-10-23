import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import NotificationsToken from '../schemas/NotificationsToken';

import CreateNotificationService from '../services/CreateNotificationService';
import CreateNotificationTokenService from '../services/CreateNotificationTokenService';

const notificationsRouter = Router();

notificationsRouter.use(ensureAuthenticated);

// Notifications

notificationsRouter.post('/', async (request, response) => {
  const createNotification = new CreateNotificationService();

  const { important_date_id, description, user_id } = request.body;

  const notification = await createNotification.execute({
    description,
    important_date_id,
    user_id,
  });

  return response.json(notification);
});

// Token

notificationsRouter.get('/token/:my_token', async (request, response) => {
  const { my_token } = request.params;

  const token = await NotificationsToken.findOne({
    token: my_token,
  });

  if (!token) {
    return response.json({ hasToken: false });
  }

  return response.json({ hasToken: true });
});

notificationsRouter.post('/token', async (request, response) => {
  const createToken = new CreateNotificationTokenService();

  const token = request.body.token as string;

  const { id } = request.user;

  const notificationToken = await createToken.execute({
    token,
    user_id: id,
  });

  return response.json(notificationToken);
});

export default notificationsRouter;
