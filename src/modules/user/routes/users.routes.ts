import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserSevice';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import uploadConfig from '../../../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  const createUser = new CreateUserService();

  const account = await createUser.execute(body);

  delete account.user.password;

  return response.json(account);
});

usersRouter.put('/', ensureAuthenticated, async (request, response) => {
  const updatedUser = new UpdateUserService();
  const { id } = request.user;

  const data = request.body;

  const user = await updatedUser.execute({ id, ...data });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const user_id = request.user.id;
    const { filename } = request.file;

    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id,
      filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
