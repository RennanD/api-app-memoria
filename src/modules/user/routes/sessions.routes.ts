import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import LogOutUserService from '../services/LogOutUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthenticateUserService();

  const session = await authUser.execute({
    email,
    password,
  });

  delete session.account.user.password;

  return response.json(session);
});

sessionsRouter.delete('/:id', async (request, response) => {
  const user_id = request.params.id as string;

  const logout = new LogOutUserService();

  await logout.execute(user_id);

  return response.send();
});

export default sessionsRouter;
