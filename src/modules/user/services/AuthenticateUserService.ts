import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import User from '../models/User';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface SerialiazedAccount extends Account {
  avatar_url: string | undefined;
}

interface Session {
  token: string;
  account: Account;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Session> {
    const userRepository = getRepository(User);
    const accountRepository = getRepository(Account);

    const userExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new AppError('Usuário não encontrado.', 401);
    }

    const checkAccount = await accountRepository.findOne({
      where: {
        user: userExists.id,
      },
    });

    if (!checkAccount) {
      throw new AppError('Usuário não encontrado.', 401);
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn,
    });

    checkAccount.user.avatar = checkAccount.user.avatar
      ? `${process.env.APP_URL}/${checkAccount.user.avatar}`
      : `${process.env.APP_AVATAR}`;

    return {
      account: checkAccount,
      token,
    };
  }
}

export default AuthenticateUserService;
