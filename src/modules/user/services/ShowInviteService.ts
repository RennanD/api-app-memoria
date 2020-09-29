import { getRepository } from 'typeorm';
import AppError from '../../../errors/AppError';
import Account from '../models/Account';
import Invite from '../schemas/Invite';

interface Request {
  inviteId: string;
}

interface Response {
  guested: string;
  ownerId: string;
  ownnerAvatar: string;
  ownerName: string;
}

class ShowInviteService {
  public async execute({ inviteId }: Request): Promise<Response> {
    const invite = await Invite.findById(inviteId);
    const accountRespository = getRepository(Account);

    if (!invite) {
      throw new AppError('Convite não encontrado, por favor tente novamente.');
    }

    const ownerInvite = await accountRespository.findOne({
      where: {
        id: invite.ownerInviteId,
      },
    });

    if (!ownerInvite) {
      throw new AppError('Não encontramos uma conta para esse convite');
    }

    return {
      guested: invite.guestId,
      ownerId: invite.ownerInviteId,
      ownerName: ownerInvite?.user.name,
      ownnerAvatar: ownerInvite.user.avatar
        ? `${process.env.APP_URL}/${ownerInvite.user.avatar}`
        : `${process.env.APP_AVATAR}`,
    };
  }
}

export default ShowInviteService;
