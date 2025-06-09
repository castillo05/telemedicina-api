import { ClinicsRepository } from '../../domain/repositories/clinics.repository';
import { Clinics } from '../../domain/entities/clinics.entity';
import { Inject } from '@nestjs/common';

export class FindClinicsUseCase {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private readonly clinicsRepository: ClinicsRepository,
  ) {}

  async execute(): Promise<Clinics[]> {
    console.log('Finding all clinics');
    return this.clinicsRepository.findAll();
  }
}
