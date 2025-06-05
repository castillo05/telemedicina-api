import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { Users } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUsersUsecase {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UsersRepository
  ) {}

  async execute(userId: string, updateData: Partial<Users>): Promise<Users> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateData);
    return await this.userRepository.update(userId, user);
  }
}
