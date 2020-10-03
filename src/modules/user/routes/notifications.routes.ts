import { Router } from 'express';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

import CreateNotificationTokenService from '../services/CreateNotificationTokenService';

const notificationsRouter = Router();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.post('/token', async (request, response) => {
  const createToken = new CreateNotificationTokenService();

  const token = request.params.token as string;

  const { id } = request.user;

  const notificationToken = await createToken.execute({
    token,
    user_id: id,
  });

  return response.json(notificationToken);
});

export default notificationsRouter;
