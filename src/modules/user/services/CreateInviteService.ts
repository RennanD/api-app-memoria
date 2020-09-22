import { getRepository } from 'typeorm';
import { Document } from 'mongoose';

import Invite from '../schemas/Invite';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

interface Request {
  guestNumber: string;
  ownerId: string;
}

class CreateInviteService {
  public async execute({ guestNumber, ownerId }: Request): Promise<Document> {
    const accountRespository = getRepository(Account);

    const checkUserExists = await accountRespository.findOne({
      where: {
        phone_number: guestNumber,
      },
    });

    if (!checkUserExists) {
      throw new AppError('Este contato ainda não é usuário do memória');
    }

    const invite = await Invite.create({
      guestId: checkUserExists.phone_number,
      ownerInviteId: ownerId,
    });

    return invite;
  }
}

export default CreateInviteService;
