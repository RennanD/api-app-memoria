import { Router } from 'express';
import multer from 'multer';

import CreateMessageService from '../services/CreateMessageService';

import controllUserAccess from '../../../middlewares/controllUserAccess';
import uploadConfig from '../../../config/messageUpload';

const messagesRouter = Router();
const upload = multer(uploadConfig);

messagesRouter.use(controllUserAccess);

messagesRouter.post(
  '/',
  upload.single('message_content'),
  async (request, response) => {
    const message_content = request.file.filename;
    const { message_type } = request.body;

    const createMessage = new CreateMessageService();

    const message = await createMessage.execute({
      message_type,
      message_content,
    });

    return response.json(message);
  },
);

export default messagesRouter;
