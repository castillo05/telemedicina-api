// users.repository.mock.ts
import { UsersRepository } from './users.repository';
import { Users } from '../entities/user.entity';

export class UsersRepositoryMock implements UsersRepository {
  private users: Users[] = [];

  async findAll(): Promise<Users[]> {
    return this.users;
  }

  async findById(id: string): Promise<Users> {
    const data = this.users.find(u => u.id === id);
    if (!data) throw new Error(`User with id ${id} not found`);
    return data;
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async create(user: Users): Promise<Users> {
    this.users.push(user);
    return user;
  }

  async update(id: string, user: Users): Promise<Users> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }

  async validatePassword(password: string, email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user?.password === password;
  }

  async activateUser(id: string, isActive: boolean): Promise<boolean> {
    const user = await this.findById(id);
    if (user) {
      user.isActive = isActive;
      return true;
    }
    return false;
  }
}
