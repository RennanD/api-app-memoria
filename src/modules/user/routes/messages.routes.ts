import { Router } from 'express';

import ListMessagesSerive from '../services/ListMessagesService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const messagesRouter = Router();

messagesRouter.use(ensureAuthenticated);

messagesRouter.get('/', async (request, response) => {
  const listMessages = new ListMessagesSerive();

  const messages = await listMessages.execute();

  return response.json(messages);
});

export default messagesRouter;
