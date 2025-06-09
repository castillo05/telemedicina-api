import { ClinicsRepository } from '../../domain/repositories/clinics.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Clinics } from '../../domain/entities/clinics.entity';
import { CreateClinicsDto } from '../../infrastructure/dto/create-clinics.dto';

@Injectable()
export class CreateClinicsUsecase {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private readonly clinicsRepository: ClinicsRepository,
  ) {}

  async execute(input: CreateClinicsDto): Promise<Clinics> {
    const clinic = new Clinics(
      '',
      input.name,
      input.address,
      input.phone,
      input.logoUrl,
      input.email,
      input.website || '',
      input.description || '',
      true, // isActive
      input.planId || '',
    );
    return await this.clinicsRepository.create(clinic);
  }
}
