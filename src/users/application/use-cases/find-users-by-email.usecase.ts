import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { User } from '../../infrastructure/persistence/users.orm-entity';
import { Users } from '../../domain/entities/user.entity';

@Injectable()
export class FindUsersByEmailUsecase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly userRepository: UsersRepository,
  ) {}

  async execute(email: string): Promise<Users | null> {
    if (!email) {
      throw new Error('Email is required');
    }
    return this.userRepository.findByEmail(email);
  }
}
