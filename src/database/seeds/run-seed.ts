import { DataSource } from 'typeorm';
import dataSource from '../../../typeorm.config';
import { createAdminUser } from './create-admin.seed';
import { cleanupAdminUser } from './cleanup.seed';

async function runSeeds() {
  try {
    // Initialize the data source
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    // Cleanup existing admin user
    await cleanupAdminUser(dataSource);

    // Run seeds
    await createAdminUser(dataSource);

    console.log('Seeds completed successfully');
  } catch (error) {
    console.error('Error during seed execution:', error);
  } finally {
    // Close the data source
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data Source has been closed!');
    }
  }
}

runSeeds(); 