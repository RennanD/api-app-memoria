import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import NotificationsToken from '../schemas/NotificationsToken';
import Notification from '../schemas/Notification';

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

notificationsRouter.patch(
  '/notifications/:notification_id',
  async (request, response) => {
    const { notification_id } = request.params;

    const notification = await Notification.findById(notification_id);

    if (!notification) {
      return response
        .status(400)
        .json({ message: 'Notificação não encontrada', statusCode: '400' });
    }

    notification.read = true;

    await notification.save();

    console.log(notification);

    return response.json(notification);
  },
);

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
