import { DataSource } from 'typeorm';
import { User } from '../../users/infrastructure/persistence/users.orm-entity';

export async function cleanupAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  // Delete admin user if exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@telemedicina.com' },
  });

  if (existingAdmin) {
    await userRepository.remove(existingAdmin);
    console.log('Admin user removed successfully');
  } else {
    console.log('No admin user found to remove');
  }
}
