import { User } from '../../infrastructure/persistence/users.orm-entity';
import { CreateUserDto } from '../../infrastructure/dto/create-user.dto';
import { UpdateUserDto } from '../../infrastructure/dto/update-user.dto';
import { UserResponseDto } from '../../infrastructure/dto/user-response.dto';
import { Users } from '../entities/user.entity';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface UsersRepository {
  findAll(): Promise<Users[]>;
  findById(id: string): Promise<Users>;
  findByEmail(email: string): Promise<Users | null>;
  create(user: Users): Promise<Users>;
  update(id: string, user: Users): Promise<Users>;
  delete(id: string): Promise<void>;
  validatePassword(password: string, email: string): Promise<boolean>;
}
