import { resolve } from 'path';
import { randomBytes } from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp', 'messages');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, cb) => {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
