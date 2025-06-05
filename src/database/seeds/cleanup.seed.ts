import { DataSource } from 'typeorm';
import { Users } from '../../users/domain/entities/user.entity';

export async function cleanupAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(Users);

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
