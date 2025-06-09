import { Module } from '@nestjs/common';
import { ClinicService } from './application/services/clinics.service';
import { CreateClinicsUsecase } from './application/use-cases/create-clinics.usecase';
import { ClinicsTypeormRepository } from './infrastructure/persistence/clinics.typeorm.repository';
import { ClinicsController } from './infrastructure/controllers/clinics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsOrmEntity } from './infrastructure/persistence/clinics.orm-entity';
import { FindByIdUsecase } from './application/use-cases/find-by-id.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicsOrmEntity]),
  ],
  controllers: [
    ClinicsController
  ],
  providers: [
    ClinicService,
    CreateClinicsUsecase,
    FindByIdUsecase,
    {
      provide: 'CLINICS_REPOSITORY',
      useClass: ClinicsTypeormRepository,
    }
  ],
  exports: [ClinicService, 'CLINICS_REPOSITORY'],
})
export class ClinicsModule {

}
