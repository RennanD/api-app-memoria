import { getRepository } from 'typeorm';

import Account from '../models/Account';

import AppError from '../../../errors/AppError';

class LogOutUserService {
  public async execute(user_id: string): Promise<void> {
    const accountRepository = getRepository(Account);

    const account = await accountRepository.findOne({
      where: {
        user: user_id,
      },
    });

    if (!account) {
      throw new AppError('Conta não encontrada', 401);
    }

    account.has_verified = false;

    await accountRepository.save(account);
  }
}

export default LogOutUserService;
