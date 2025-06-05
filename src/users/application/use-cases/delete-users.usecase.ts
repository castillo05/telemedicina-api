import { USERS_REPOSITORY, UsersRepository } from '../../domain/repositories/users.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUsersUsecase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.delete(userId);
  }
}
