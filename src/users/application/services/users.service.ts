import { Injectable } from '@nestjs/common';
import { CreateUsersUseCase } from '../use-cases/create-users.usecase';
import { FindUsersByEmailUsecase } from '../use-cases/find-users-by-email.usecase';
import { FindUserUseCase } from '../use-cases/find-user.usecase';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { UserResponseDto } from '../../infrastructure/dto/user-response.dto';
import { ValidatePasswordUseCase } from '../use-cases/validate-password.usecase';
import { FindUsersUsecase } from '../use-cases/find-users.usecase';
import { UpdateUsersUsecase } from '../use-cases/update-users.usecase';
import { DeleteUsersUsecase } from '../use-cases/delete-users.usecase';
import { ActivateUsersUsecase } from '../use-cases/activate-users.usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUsersUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findUsersByEmailUseCase: FindUsersByEmailUsecase,
    private readonly validatePasswordUseCase: ValidatePasswordUseCase,
    private readonly findUsersUsecase: FindUsersUsecase,
    private readonly updateUserUseCase: UpdateUsersUsecase,
    private readonly deleteUserUseCase: DeleteUsersUsecase,
    private readonly activateUserUseCase: ActivateUsersUsecase,
  ) {
    console.log('UsersService initialized');
    console.log('findOne', this.findOne);
  }

  get findOne() {
    return this.findUserUseCase;
  }

  get findByEmail() {
    return this.findUsersByEmailUseCase;
  }

  get create(){
    return this.createUserUseCase;
  }

  get validatePassword() {
    return this.validatePasswordUseCase;
  }

  get findAll() {
    return this.findUsersUsecase;
  }

  get update() {
    return this.updateUserUseCase;
  }

  get delete() {
    return this.deleteUserUseCase;
  }

  get activate() {
    return this.activateUserUseCase;
  }
}
