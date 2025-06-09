import { UsersRepository } from '../../domain/repositories/users.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ActivateUsersUsecase {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UsersRepository
  ) {
  }

  async execute(userId: string, isActive: boolean): Promise<boolean> {
    await this.userRepository.activateUser(userId, isActive);
    return true;
  }
}
