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
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('No user found for the provided ID');
    }
    user.isActive = isActive;
    await this.userRepository.update(user.id, user);
    return true;
  }
}
