import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private transformToDto(user: User): UserResponseDto {
    console.log('transformToDto', user);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    return this.transformToDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map(user => this.transformToDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    console.log('UsersService: Finding user by ID...');
    console.log('ID:', id);

    const user = await this.usersRepository.findOne({ where: { id }, relations: ['doctorProfile'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    console.log('User found:', this.transformToDto(user));
    return this.transformToDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('UsersService: Finding user by email...');
    console.log('Email:', email);

    const user = await this.usersRepository.findOne({
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
        password: true, // Asegurarnos de que la contraseña se seleccione
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('User details:', {
        id: user.id,
        email: user.email,
        hasPassword: !!user.password,
      });
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });
    return this.transformToDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.softRemove(user);
  }

  async activate(id: string): Promise<UserResponseDto> {
    const user = await this.findOne(id);
    const updatedUser = await this.usersRepository.save({
      ...user,
      isActive: true,
    });
    return this.transformToDto(updatedUser);
  }

  async deactivate(id: string): Promise<UserResponseDto> {
    const user = await this.findOne(id);
    const updatedUser = await this.usersRepository.save({
      ...user,
      isActive: false,
    });
    return this.transformToDto(updatedUser);
  }
}
