import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class ValidatePasswordUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {
  }
  async execute(password: string, email: string): Promise<boolean> {
    console.log('Password validation started', password);
    if (!password) {
      throw new Error('Password hash and password are required');
    }

    // Assuming the repository has a method to validate the password
    return this.usersRepository.validatePassword(password, email);
  }
}
