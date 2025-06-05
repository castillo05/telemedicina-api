import { DataSource } from 'typeorm';
import { User, UserRole } from '../../users/infrastructure/persistence/users.orm-entity';
import * as bcrypt from 'bcrypt';

export async function createAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  // Check if admin user already exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@telemedicina.com' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Create admin user with a fixed salt for testing
  const salt = '$2b$10$abcdefghijklmnopqrstuv'; // Fixed salt for testing
  const password = 'Admin123!';
  console.log('=== Seed Password Debug ===');
  console.log('Original password:', password);
  console.log('Original password length:', password.length);
  console.log('Original password char codes:', Array.from(password).map(c => c.charCodeAt(0)));
  console.log('Using fixed salt:', salt);

  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Hashed password:', hashedPassword);
  console.log('Hashed password length:', hashedPassword.length);
  console.log('=== End Seed Password Debug ===');

  const adminUser = userRepository.create({
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin@telemedicina.com',
    password: hashedPassword,
    phone: '+1234567890',
    role: UserRole.ADMIN,
    isActive: true,
    isEmailVerified: true,
  });

  await userRepository.save(adminUser);
  console.log('Admin user created successfully');
}
