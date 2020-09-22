import { Router } from 'express';

import CreateInviteService from '../services/CreateInviteService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';

const invitesRouter = Router();

invitesRouter.use(ensureAuthenticated);

invitesRouter.get('/', async (request, response) => {
  const createInvite = new CreateInviteService();

  const { id } = request.user;

  const { guestNumber } = request.body;

  const invite = await createInvite.execute({
    guestNumber,
    ownerId: id,
  });

  return response.json(invite);
});

export default invitesRouter;
