import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import NotificationsToken from '../schemas/NotificationsToken';

import CreateNotificationTokenService from '../services/CreateNotificationTokenService';

const notificationsRouter = Router();

notificationsRouter.use(ensureAuthenticated);

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
