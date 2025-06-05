import { UsersRepository } from '../../domain/repositories/users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Users } from '../../domain/entities/user.entity';

@Injectable()
export class FindUsersUsecase {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: UsersRepository
  ) {}

  async execute(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }
}
