import { Request, Response, NextFunction } from 'express';

import { getRepository } from 'typeorm';

import User from '../modules/user/models/User';

import AppError from '../errors/AppError';

export default async function controllUserAccess(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  const userRepository = getRepository(User);

  try {
    const user_id = request.user.id;

    const checkUser = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (checkUser?.role !== 'admin') {
      throw new AppError(
        'Somente administradores podem acessar esta rota',
        401,
      );
    }

    return next();
  } catch (err) {
    throw new AppError(
      'Impossível carregar as informações, tente novamente',
      401,
    );
  }
}
