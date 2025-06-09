import { ClinicsRepository } from '../../domain/repositories/clinics.repository';
import { Inject } from '@nestjs/common';
import { Clinics } from '../../domain/entities/clinics.entity';

export class FindByIdUsecase {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private readonly clinicsRepository: ClinicsRepository,
  ) {}

  async execute(id: string): Promise<Clinics | null> {
    return await this.clinicsRepository.findById(id);
  }
}
