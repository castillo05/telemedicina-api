

import { Test, TestingModule } from '@nestjs/testing';
import { UsersTypeormRepository } from './users.typeorm.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.orm-entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersTypeormRepository', () => {
  let repository: UsersTypeormRepository;
  let userRepoMock: jest.Mocked<Repository<User>>;
  let clinicsRepoMock: any;

  beforeEach(async () => {
    userRepoMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      softRemove: jest.fn(),
    } as unknown as jest.Mocked<Repository<User>>;

    clinicsRepoMock = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersTypeormRepository,
        {
          provide: getRepositoryToken(User),
          useValue: userRepoMock,
        },
        {
          provide: 'CLINICS_REPOSITORY',
          useValue: clinicsRepoMock,
        },
      ],
    }).compile();

    repository = module.get(UsersTypeormRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('should return user', async () => {
      const user = { id: '1', firstName: 'John', lastName: 'Doe', email: '', clinicId: '123' } as User;
      userRepoMock.findOne.mockResolvedValue(user);
      const result = await repository.findById('1');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepoMock.findOne.mockResolvedValue(null);
      await expect(repository.findById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return user', async () => {
      const dto = { email: 'test@example.com', clinicId: '123' };
      userRepoMock.findOne.mockResolvedValueOnce(null);
      clinicsRepoMock.findById.mockResolvedValueOnce({});
      const created = { id: '1', firstName: 'Test', lastName: 'User', email: '', clinicId: '123', isActive: true } as User;
      userRepoMock.create.mockReturnValue(created);
      userRepoMock.save.mockResolvedValue(created);

      const result = await repository.create(dto as any);
      expect(result).toEqual(created);
    });

    it('should throw ConflictException if email exists', async () => {
      userRepoMock.findOne.mockResolvedValueOnce({ id: '1', email: '', firstName: 'Test', lastName: 'User' } as User);
      await expect(repository.create({ email: 'test@example.com' } as any)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if clinic ID is invalid', async () => {
      userRepoMock.findOne.mockResolvedValueOnce(null);
      clinicsRepoMock.findById.mockResolvedValueOnce(null);
      await expect(repository.create({ email: 'test@example.com', clinicId: 'invalid' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('validatePassword', () => {
    it('should return true if passwords match', async () => {
      const user = { id: '1', email: '', firstName: 'Test', lastName: 'User', password: bcrypt.hashSync('pass123', 10) } as User;
      userRepoMock.findOne.mockResolvedValue(user);
      const result = await repository.validatePassword('pass123', user.email);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepoMock.findOne.mockResolvedValue(null);
      await expect(repository.validatePassword('pass', 'email')).rejects.toThrow(NotFoundException);
    });
  });
});
