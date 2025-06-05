import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository, USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { UserResponseDto } from '../../infrastructure/dto/user-response.dto';
import { Users } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<Users> {
    const user = new Users(
      '',
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone || '',
      dto.role || 'patient',
      true,   // isActive
      false,  // isEmailVerified
      dto.password,
      ''    // resetPasswordToken
    );

    const existingUser = await this.usersRepository.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.usersRepository.create(user);
  }
}
