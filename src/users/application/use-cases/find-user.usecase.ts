import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { User } from '../../infrastructure/persistence/users.orm-entity';
import { Users } from '../../domain/entities/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string): Promise<Users> {
    console.log(`Finding user with ID: ${id}`);
    return this.usersRepository.findById(id);
  }
}
