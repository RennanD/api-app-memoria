import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import NotificationsToken from '../schemas/NotificationsToken';

import CreateNotificationTokenService from '../services/CreateNotificationTokenService';
import ListNotificationsService from '../services/ListNotificationsService';

const notificationsRouter = Router();

notificationsRouter.use(ensureAuthenticated);

// Notifications

notificationsRouter.get('/', async (request, response) => {
  const listNotifications = new ListNotificationsService();

  const user_id = request.user.id;

  const notifications = await listNotifications.execute(user_id);

  return response.json(notifications);
});

// Token

notificationsRouter.get('/token/:my_token', async (request, response) => {
  const { my_token } = request.params;

  const user_id = request.user.id;

  const token = await NotificationsToken.findOne({
    token: my_token,
    user_id,
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
