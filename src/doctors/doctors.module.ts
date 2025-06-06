import { Module } from '@nestjs/common';
import { DoctorsController } from './infrastructure/controllers/doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './infrastructure/persistence/doctors.orm-entity';
import { DoctorsService } from './application/services/doctors.service';
import { CreateDoctorsUsecase } from './application/use-cases/create-doctors.usecase';
import { DoctorsTypeormRepository } from './infrastructure/persistence/doctors.typeorm.repository';
import { UsersTypeormRepository } from '../users/infrastructure/persistence/users.typeorm.repository';
import { UsersModule } from '../users/users.module';
import { UpdateDoctorsUsecase } from './application/use-cases/update-doctors.usecase';
import { FindDoctorsUsecase } from './application/use-cases/find-doctors.usecase';
import { FindDoctorUsecase } from './application/use-cases/find-doctor.usecase';
import { DeleteDoctorsUsecase } from './application/use-cases/delete-doctors.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), UsersModule],
  providers: [
    DoctorsService,
    CreateDoctorsUsecase,
    UpdateDoctorsUsecase,
    FindDoctorsUsecase,
    FindDoctorUsecase,
    DeleteDoctorsUsecase,
    {
      provide: 'DOCTORS_REPOSITORY',
      useClass: DoctorsTypeormRepository,
    },
  ],
  controllers: [DoctorsController],
  exports: [DoctorsService],
})
export class DoctorsModule {}
