import { Test, TestingModule } from '@nestjs/testing';
import { ActivateUsersUsecase } from './activate-users.usecase';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { FindUsersUsecase } from './find-users.usecase';
import { FindUserUseCase } from './find-user.usecase';
import { FindUsersByEmailUsecase } from './find-users-by-email.usecase';
import { CreateUsersUseCase } from './create-users.usecase';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { ValidatePasswordUseCase } from './validate-password.usecase';
import { DeleteUsersUsecase } from './delete-users.usecase';
import { UpdateUsersUsecase } from './update-users.usecase';
import { UpdateUserDto } from '../../infrastructure/dto/update-user.dto';

describe('UsersUsecase', () => {
  let useCase: ActivateUsersUsecase;
  let useCaseFindAll: FindUsersUsecase;
  let findByIdUseCase: FindUserUseCase;
  let findByEmailUseCase: FindUsersByEmailUsecase;
  let createUserUseCase: CreateUsersUseCase;
  let validatePasswordUseCase: ValidatePasswordUseCase;
  let deleteUserUseCase: DeleteUsersUsecase;
  let updateUserUseCase: UpdateUsersUsecase;
  let mockUsersRepository: jest.Mocked<UsersRepository>;


  enum UserRole {
    ADMIN = 'admin',
    USER = 'doctor',
    PATIENT = 'patient',
  }

  const mockUsers = [{ id: '1', firstName: 'John', lastName: 'Doe', email: 'test@test.cl', isActive: true,
    phone: '123456789',role: UserRole.ADMIN, isEmailVerified: true, password: 'password123', resetPasswordToken: '',
  }];

  const mockUserCreate: CreateUserDto = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'testnew@test.cl',
    phone: '987654321',
    role: UserRole.PATIENT as any,
    password: 'newpassword123',
    clinicId: 'clinic-id-123',
  };

  const mockUserUpdate: UpdateUserDto = {
    firstName: 'Jane',
    lastName: 'Doe',
  }

  mockUsersRepository = {
    activateUser: jest.fn().mockResolvedValue(undefined),
    findAll: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    findByEmail: jest.fn().mockResolvedValue(mockUsers || null),
    create: jest.fn().mockResolvedValue(mockUserCreate),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(undefined),
    validatePassword: jest.fn().mockResolvedValue(false),
  };

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivateUsersUsecase,
        FindUsersUsecase,
        FindUserUseCase,
        FindUsersByEmailUsecase,
        CreateUsersUseCase,
        ValidatePasswordUseCase,
        DeleteUsersUsecase,
        UpdateUsersUsecase,
        {
          provide: 'USERS_REPOSITORY',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    useCase = module.get<ActivateUsersUsecase>(ActivateUsersUsecase);
    useCaseFindAll = module.get<FindUsersUsecase>(FindUsersUsecase);
    findByIdUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    findByEmailUseCase = module.get<FindUsersByEmailUsecase>(FindUsersByEmailUsecase);
    createUserUseCase = module.get<CreateUsersUseCase>(CreateUsersUseCase);
    validatePasswordUseCase = module.get<ValidatePasswordUseCase>(ValidatePasswordUseCase);
    deleteUserUseCase = module.get<DeleteUsersUsecase>(DeleteUsersUsecase);
    updateUserUseCase = module.get<UpdateUsersUsecase>(UpdateUsersUsecase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should instantiate ActivateUsersUsecase', () => {
    const useCase = new ActivateUsersUsecase(mockUsersRepository);
    expect(useCase).toBeDefined();
  });

  it('should call repository with correct parameters and return true', async () => {
    const userId = 'test-user-id';
    const isActive = true;

    const result = await useCase.execute(userId, isActive);
    expect(mockUsersRepository.activateUser).toHaveBeenCalledWith(userId, isActive);
    expect(result).toBe(true);
  });

  it('should call repository with correct parameters and return false', async () => {
    const userId = 'test-user-id';
    const isActive = false;

    const result = await useCase.execute(userId, isActive);
    expect(mockUsersRepository.activateUser).toHaveBeenCalledWith(userId, isActive);
    expect(result).toBe(true);
  });

  it('should handle repository errors', async () => {
    const userId = 'test-user-id';
    const isActive = false;
    mockUsersRepository.activateUser.mockRejectedValue(new Error('Database error'));
    await expect(useCase.execute(userId, isActive)).rejects.toThrow('Database error');
  });

  it('should call repository findAll and return Users[]', async () => {
    const result = await useCaseFindAll.execute();
    expect(mockUsersRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result).toBeInstanceOf(Array);
  });

  it('should call repository findAll and return an empty array if no users exist', async () => {
    mockUsersRepository.findAll.mockResolvedValue([]);
    const users = await mockUsersRepository.findAll();
    expect(users).toEqual([]);
    expect(mockUsersRepository.findAll).toHaveBeenCalled();
    expect(users).toBeInstanceOf(Array);
  });

  it('should call repository findById and return a User', async () => {
   const result = await findByIdUseCase.execute('1');
    expect(mockUsersRepository.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(null);
    expect(result).toBeNull();
  });

  it('should call repository findByEmail and return null', async () => {
    const email = 'tes2t@test.cl';
    mockUsersRepository.findByEmail.mockResolvedValue(null)
    const result = await findByEmailUseCase.execute(email);
    console.log(result);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(null);
  });

  it('should call repository findByEmail and return an Users', async () => {
    const email = 'test2@test.cl';
    mockUsersRepository.findByEmail.mockResolvedValueOnce(mockUsers as any);
    const result = await findByEmailUseCase.execute(email);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toEqual(mockUsers);
  });

  it('should call repository create and return if exist the email', async () => {
    mockUsersRepository.findByEmail.mockResolvedValueOnce(mockUsers[0]);
    await expect(createUserUseCase.execute(mockUserCreate)).rejects.toThrow('Email already exists');
  });

  it('should call repository create and return a User', async () => {
    const email = mockUserCreate.email;
    const expectedUser= {
      ...mockUserCreate,
      id: expect.any(String),
      isActive: true,
      isEmailVerified: false,
      resetPasswordToken: '',
    }
    mockUsersRepository.findByEmail.mockResolvedValueOnce(null);
    const result = await createUserUseCase.execute(mockUserCreate);
    expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(mockUsersRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(mockUserCreate),
    );
    expect(result).toEqual(expect.objectContaining(mockUserCreate));
  });

  it('should call repository validatePassword and return true', async () => {
    const email = mockUsers[0].email;
    const password = mockUsers[0].password;

    mockUsersRepository.validatePassword.mockResolvedValue(true);
    const result = await validatePasswordUseCase.execute(password, email);
    expect(mockUsersRepository.validatePassword).toHaveBeenCalledWith(password, email);
    expect(result).toBe(true);
  });

  it('should call repository delete', async () => {
    const userId = mockUsers[0].id;
    const searchUser = mockUsers[0];
    mockUsersRepository.findById.mockResolvedValue(searchUser);
    await deleteUserUseCase.execute(userId);
    expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
  });

  it('should call repository update and return a User', async () => {
    const userId = mockUsers[0].id;
    mockUsersRepository.findById.mockResolvedValue(mockUsers[0]);
    mockUsersRepository.update.mockResolvedValue(
      expect.objectContaining(mockUserUpdate)
    );
    const result = await updateUserUseCase.execute(userId, mockUserUpdate);
    expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
    expect(mockUsersRepository.update).toHaveBeenCalledWith(userId, expect.objectContaining(mockUserUpdate));
  });

  it('should throw an error if user not found when updating', async () => {
    const userId = 'non-existing-id';
    mockUsersRepository.findById.mockResolvedValue(null as unknown as any);
    await expect(updateUserUseCase.execute(userId, mockUserUpdate)).rejects.toThrow('User not found');
  });
});
