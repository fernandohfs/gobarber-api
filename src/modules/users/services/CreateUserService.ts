import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public static async execute({
    name,
    email,
    password,
  }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);
    /**
     * Checks if user already exists
     */
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('Email address already exists');
    }

    /**
     * Generate hash of user password
     */

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
