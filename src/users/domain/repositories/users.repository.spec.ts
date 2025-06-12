// users.repository.mock.spec.ts
import { UsersRepositoryMock } from './users.repository.mock';
import { Users } from '../entities/user.entity';

describe('UsersRepositoryMock', () => {
  let repo: UsersRepositoryMock;
  let sampleUser: Users;

  beforeEach(() => {
    repo = new UsersRepositoryMock();
    sampleUser = {
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      isActive: false,
    } as Users;
  });

  it('should create a user', async () => {
    const result = await repo.create(sampleUser);
    expect(result).toEqual(sampleUser);
  });

  it('should find all users', async () => {
    await repo.create(sampleUser);
    const users = await repo.findAll();
    expect(users).toHaveLength(1);
  });

  it('should find a user by ID', async () => {
    await repo.create(sampleUser);
    const user = await repo.findById('1');
    expect(user).toEqual(sampleUser);
  });

  it('should find a user by email', async () => {
    await repo.create(sampleUser);
    const user = await repo.findByEmail('test@example.com');
    expect(user).toEqual(sampleUser);
  });

  it('should return null if email not found', async () => {
    const user = await repo.findByEmail('notfound@example.com');
    expect(user).toBeNull();
  });

  it('should update a user', async () => {
    await repo.create(sampleUser);
    const updated = await repo.update('1', {
      firstName: 'Updated',
      lastName: 'Name',
      email: '',
      password: 'newpassword123',
      isActive: false,
    } as Users);
    expect(updated.firstName).toBe('Updated');
  });

  it('should delete a user', async () => {
    await repo.create(sampleUser);
    await repo.delete('1');
    const users = await repo.findAll();
    expect(users).toHaveLength(0);
  });

  it('should validate password correctly', async () => {
    await repo.create(sampleUser);
    const valid = await repo.validatePassword('password123', 'test@example.com');
    const invalid = await repo.validatePassword('wrongpass', 'test@example.com');
    expect(valid).toBe(true);
    expect(invalid).toBe(false);
  });

  it('should activate a user', async () => {
    await repo.create(sampleUser);
    const result = await repo.activateUser('1', true);
    expect(result).toBe(true);
    const user = await repo.findById('1');
    expect(user.isActive).toBe(true);
  });

  // it('should return false when trying to activate a non-existent user', async () => {
  //   const result = await repo.activateUser('1', true);
  //   expect(result).toBe(false);
  // });
});
