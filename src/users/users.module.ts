import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/services/users.service';
import { UsersController } from './infrastructure/controllers/users.controller';
import { User } from './infrastructure/persistence/users.orm-entity';
import { FindUserUseCase } from './application/use-cases/find-user.usecase';
import { FindUsersByEmailUsecase } from './application/use-cases/find-users-by-email.usecase';
import { CreateUsersUseCase } from './application/use-cases/create-users.usecase';
import { UsersRepository, USERS_REPOSITORY } from './domain/repositories/users.repository';
import { UsersTypeormRepository } from './infrastructure/persistence/users.typeorm.repository';
import { ValidatePasswordUseCase } from './application/use-cases/validate-password.usecase';
import { FindUsersUsecase } from './application/use-cases/find-users.usecase';
import { UpdateUsersUsecase } from './application/use-cases/update-users.usecase';
import { DeleteUsersUsecase } from './application/use-cases/delete-users.usecase';
import { ActivateUsersUsecase } from './application/use-cases/activate-users.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindUserUseCase,
    FindUsersByEmailUsecase,
    CreateUsersUseCase,
    ValidatePasswordUseCase,
    FindUsersUsecase,
    UpdateUsersUsecase,
    DeleteUsersUsecase,
    ActivateUsersUsecase,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersTypeormRepository,
    },
  ],
  exports: [UsersService, 'USERS_REPOSITORY'],
})
export class UsersModule {}
