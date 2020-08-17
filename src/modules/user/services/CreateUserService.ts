import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import Account from '../models/Account';

import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  birthday: Date;
  phone: string;
  email: string;
  cpf: string;
  gender: 'masculino' | 'feminino';
  zipcode: string;
  address: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    birthday,
    phone,
    email,
    cpf,
    gender,
    zipcode,
    address,
    password,
  }: Request): Promise<Account> {
    const userRepository = getRepository(User);
    const accountRepository = getRepository(Account);

    const hash_password = await hash(password, 8);

    const userExists = await userRepository.findOne({
      where: { email } || { cpf },
    });

    if (userExists) {
      throw new AppError('Usuário já possui uma conta.');
    }

    const account = await accountRepository.findOne({
      where: {
        phone_number: phone,
      },
    });

    if (!account) {
      throw new AppError(
        'O número de telefone ainda não foi verificado, tente novamente.',
      );
    }

    if (!account.has_verified) {
      throw new AppError(
        'O número de telefone ainda não foi verificado, tente novamente.',
      );
    }

    if (account.user) {
      throw new AppError('Já existe uma conta com esse número de telefone.');
    }

    const user = userRepository.create({
      name,
      birthday,
      cpf,
      email,
      gender,
      address,
      zipcode,
      password: hash_password,
      role: 'user',
    });

    await userRepository.save(user);

    account.user = user;

    await accountRepository.save(account);

    return account;
  }
}

export default CreateUserService;
