import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUsersUseCase } from '../use-cases/create-users.usecase';
import { FindUsersByEmailUsecase } from '../use-cases/find-users-by-email.usecase';
import { FindUserUseCase } from '../use-cases/find-user.usecase';
import { ValidatePasswordUseCase } from '../use-cases/validate-password.usecase';
import { FindUsersUsecase } from '../use-cases/find-users.usecase';
import { UpdateUsersUsecase } from '../use-cases/update-users.usecase';
import { DeleteUsersUsecase } from '../use-cases/delete-users.usecase';
import { ActivateUsersUsecase } from '../use-cases/activate-users.usecase';

describe('UsersService', () => {
  let service: UsersService;
  let createUsersUseCase: jest.Mocked<CreateUsersUseCase>;
  let findUserUseCase: jest.Mocked<FindUserUseCase>;
  let findUsersByEmailUseCase: jest.Mocked<FindUsersByEmailUsecase>;
  let validatePasswordUseCase: jest.Mocked<ValidatePasswordUseCase>;
  let findUsersUsecase: jest.Mocked<FindUsersUsecase>;
  let updateUsersUseCase: jest.Mocked<UpdateUsersUsecase>;
  let deleteUsersUsecase: jest.Mocked<DeleteUsersUsecase>;
  let activateUsersUsecase: jest.Mocked<ActivateUsersUsecase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CreateUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUsersByEmailUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ValidatePasswordUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUsersUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUsersUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUsersUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ActivateUsersUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    createUsersUseCase = module.get(CreateUsersUseCase);
    findUserUseCase = module.get(FindUserUseCase);
    findUsersByEmailUseCase = module.get(FindUsersByEmailUsecase);
    validatePasswordUseCase = module.get(ValidatePasswordUseCase);
    findUsersUsecase = module.get(FindUsersUsecase);
    updateUsersUseCase = module.get(UpdateUsersUsecase);
    deleteUsersUsecase = module.get(DeleteUsersUsecase);
    activateUsersUsecase = module.get(ActivateUsersUsecase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the findUserUseCase instance', () => {
    expect(service.findOne).toBe(findUserUseCase);
  });

  it('should return the findUsersByEmailUseCase instance', () => {
    expect(service.findByEmail).toBe(findUsersByEmailUseCase);
  });

  it('should return the createUserUseCase instance', () => {
    expect(service.create).toBe(createUsersUseCase);
  });

  it('should return the validatePasswordUseCase instance', () => {
    expect(service.validatePassword).toBe(validatePasswordUseCase);
  });

  it('should return the findUsersUsecase instance', () => {
    expect(service.findAll).toBe(findUsersUsecase);
  });

  it('should return the updateUsersUsecase instance', () => {
    expect(service.update).toBe(updateUsersUseCase);
  });

  it('should return the deleteUsersUsecase instance', () => {
    expect(service.delete).toBe(deleteUsersUsecase);
  });

  it('should return the activateUsersUsecase instance', () => {
    expect(service.activate).toBe(activateUsersUsecase);
  });
});
