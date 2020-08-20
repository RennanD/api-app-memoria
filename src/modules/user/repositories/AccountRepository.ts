/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import { EntityRepository, Repository } from 'typeorm';

import Account from '../models/Account';
import AppError from '../../../errors/AppError';

interface Request {
  verification_code: string;
  phone_number: string;
}

interface Message {
  content: string;
}

@EntityRepository(Account)
class AccountRepository extends Repository<Account> {
  public async requestVerificationCode(phone_number: string): Promise<boolean> {
    // const verification_code = String(
    //   Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
    // );
    // const accountSid = process.env.SMS_SID;
    // const authToken = process.env.SMS_TOKEN;
    // const client = require('twilio')(accountSid, authToken);
    // const findAccount = await this.findOne({
    //   where: { phone_number },
    // });
    // if (findAccount?.has_verified) {
    //   throw new AppError('Seu telefone já foi verificado.');
    // }
    // client.messages.create({
    //   body: `Seu código de verificação é: ${verification_code}`,
    //   to: phone_number,
    //   from: '+12023185056',
    // });
    // if (findAccount) {
    //   findAccount.verification_code = verification_code;
    //   await this.save(findAccount);
    //   return {
    //     content: 'Código de verificação enviado com sucesso.',
    //   };
    // }
    // const newUserNumber = this.create({
    //   phone_number,
    //   verification_code,
    // });
    // await this.save(newUserNumber);
    // return {
    //   content: 'Código de verificação enviado com sucesso.',
    // };

    const checkUserAlreadyRegister = await this.findOne({
      where: { phone_number },
    });

    if (checkUserAlreadyRegister) {
      if (checkUserAlreadyRegister.user) {
        return true;
      }
    }
    return false;
  }

  public async verificateCodeNumber({
    verification_code,
    phone_number,
  }: Request): Promise<void> {
    const findAccount = await this.findOne({
      where: { phone_number },
    });

    if (!findAccount) {
      throw new AppError('Esse telefone ainda não foi cadastrado.', 401);
    }

    if (findAccount.verification_code !== verification_code) {
      throw new AppError('Código de verificação inválido!', 401);
    } else {
      findAccount.has_verified = true;
      await this.save(findAccount);
    }
  }
}

export default AccountRepository;
