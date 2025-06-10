import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../../application/services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: any;

  beforeEach(async () => {
    usersServiceMock = {
      create: { execute: jest.fn() },
      findAll: { execute: jest.fn() },
      findOne: { execute: jest.fn() },
      update: { execute: jest.fn() },
      delete: { execute: jest.fn() },
      activate: { execute: jest.fn() },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UsersService,
          useValue: usersServiceMock,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new user and return UserResponseDto', async () => {
      const dto: CreateUserDto = { email: 'test@example.com', firstName: 'Test User', lastName:'LastName', password: 'secret' };
      const expectedResult = { id: 'uuid', email: dto.email, firstName: dto.firstName };

      usersServiceMock.create.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);
      expect(result).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 'uuid1', email: 'a@example.com', firstName: 'A' }, { id: 'uuid2', email: 'b@example.com', firstName: 'B' }];
      usersServiceMock.findAll.execute.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toHaveLength(2);
      expect(result[0].email).toBe('a@example.com');
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = { id: 'uuid1', email: 'a@example.com', firstName: 'A' };
      usersServiceMock.findOne.execute.mockResolvedValue(user);

      const result = await controller.findOne('uuid1');
      expect(result).toEqual(expect.objectContaining(user));
    });

    it('should throw error if user not found', async () => {
      usersServiceMock.findOne.execute.mockResolvedValue(null);
      await expect(controller.findOne('invalid-id')).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update a user and return updated UserResponseDto', async () => {
      const dto: UpdateUserDto = { firstName: 'Updated firstName' };
      const updatedUser = { id: 'uuid1', firstName: 'Updated firstName', email: 'a@example.com' };
      usersServiceMock.update.execute.mockResolvedValue(updatedUser);

      const result = await controller.update('uuid1', dto);
      expect(result.firstName).toBe('Updated firstName');
    });

    it('should throw error if user not found during update', async () => {
      usersServiceMock.update.execute.mockResolvedValue(null);
      await expect(controller.update('uuid1', {})).rejects.toThrow('User not found');
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      usersServiceMock.delete.execute.mockResolvedValue(undefined);
      await expect(controller.remove('uuid1')).resolves.toBeUndefined();
    });
  });

  describe('activate', () => {
    it('should activate a user', async () => {
      usersServiceMock.activate.execute.mockResolvedValue(true);
      const result = await controller.activate('uuid1', true);
      expect(result).toBe(true);
    });
  });
});
