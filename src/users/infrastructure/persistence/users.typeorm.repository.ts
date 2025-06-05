import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './users.orm-entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { Users } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersTypeormRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Users[]> {
    const users = await this.usersRepository.find({
      relations: ['doctorProfile'],
    });
    return users.map(user => plainToInstance(Users, user, {}));
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['doctorProfile'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(createUserDto: Users): Promise<Users> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create({
      id: createUserDto.id,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      phone: createUserDto.phone,
      role: createUserDto.role as any, // consider proper enum mapping
      password: createUserDto.password,
      isActive: createUserDto.isActive,
      isEmailVerified: createUserDto.isEmailVerified,
    });
    const savedUser = await this.usersRepository.save(user);
    return plainToInstance(Users, savedUser);
  }

  async update(id: string, updateUserDto: Users): Promise<Users> {
    const user = await this.findById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    return plainToInstance(Users, updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.softRemove(user);
  }

  async validatePassword(password: string, email: string): Promise<boolean> {
    console.log('Validating password...usersTypeormRepository', password);
    const userData = await this.usersRepository.findOne({ where: { email } });
    if (!userData) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    return isMatch;
  }
}
