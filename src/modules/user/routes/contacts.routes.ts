import { Router } from 'express';
import multer from 'multer';

import CreateContactService from '../services/CreateContactService';
import ShowOnlyContactService from '../services/ShowOnlyContactService';
import EditContactService from '../services/EditContactService';
import DeleteContactService from '../services/DeleteContactService';
import ListContactUserService from '../services/ListContactUserService';
import UpdateContactAvatarService from '../services/UpdateContactAvatarService';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticate';
import uploadConfig from '../../../config/upload';

const contactsRouter = Router();
const upload = multer(uploadConfig);

contactsRouter.use(ensureAuthenticated);

contactsRouter.get('/', async (request, response) => {
  const listContacts = new ListContactUserService();

  const owner_id = request.user.id;

  const contacts = await listContacts.execute({
    owner_id,
  });

  return response.json(contacts);
});

contactsRouter.get('/:contact_id', async (request, response) => {
  const showContact = new ShowOnlyContactService();

  const contact_id = request.params.contact_id as string;

  const contact = await showContact.execute({
    contact_id,
  });

  return response.json(contact);
});

contactsRouter.post('/', async (request, response) => {
  const createContact = new CreateContactService();

  const owner_id = request.user.id;

  const { phone_number, relationship } = request.body;

  const contact = await createContact.execute({
    owner_id,
    phone_number,
    relationship,
  });

  return response.json(contact);
});

contactsRouter.put('/:contact_id', async (request, response) => {
  const contact_id = request.params.contact_id as string;

  const editContact = new EditContactService();

  const data = request.body;

  const contact = await editContact.execute({
    contact_id,
    ...data,
  });

  return response.json(contact);
});

contactsRouter.delete('/:contact_id', async (request, response) => {
  const contact_id = request.params.contact_id as string;

  const user_id = request.user.id;

  const deleteContact = new DeleteContactService();

  await deleteContact.execute({
    user_id,
    contact_id,
  });

  return response.send();
});

contactsRouter.patch(
  '/contact_id',
  upload.single('avatar'),
  async (request, response) => {
    const contact_id = request.params.contact_id as string;
    const { filename } = request.file;

    const updateAvatar = new UpdateContactAvatarService();

    await updateAvatar.execute({
      contact_id,
      filename,
    });

    return response.send();
  },
);

export default contactsRouter;
