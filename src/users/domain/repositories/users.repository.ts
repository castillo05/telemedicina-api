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
  activateUser(id: string, isActive: boolean): Promise<boolean>;
}
