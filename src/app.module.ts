import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from '../typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { UsersRepository } from './users/domain/repositories/users.repository';
import { UsersTypeormRepository } from './users/infrastructure/persistence/users.typeorm.repository';
import { ClinicsController } from './clinics/infrastructure/controllers/clinics.controller';
import { ClinicsModule } from './clinics/clinics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    DoctorsModule,
    ClinicsModule,
  ],
  controllers: [AppController, ClinicsController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
