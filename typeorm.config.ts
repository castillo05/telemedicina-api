import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './src/users/infrastructure/persistence/users.orm-entity';
import { Doctor } from './src/doctors/infrastructure/persistence/doctors.orm-entity';
import { ClinicsOrmEntity } from './src/clinics/infrastructure/persistence/clinics.orm-entity';

config();

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  throw new Error('Missing required database environment variables');
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Doctor, ClinicsOrmEntity],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
