import { Router } from 'express';

import CreateInviteService from '../services/CreateInviteService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import ShowInviteService from '../services/ShowInviteService';

const invitesRouter = Router();

invitesRouter.use(ensureAuthenticated);

invitesRouter.get('/', async (request, response) => {
  const showInvite = new ShowInviteService();

  const inviteId = request.params.inviteId as string;

  const invite = await showInvite.execute({
    inviteId,
  });

  return response.json(invite);
});

invitesRouter.post('/', async (request, response) => {
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
