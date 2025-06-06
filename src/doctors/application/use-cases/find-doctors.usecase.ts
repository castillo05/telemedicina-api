import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Doctors } from '../../domain/entities/doctors.entity';

@Injectable()
export class FindDoctorsUsecase {
  constructor(
    @Inject('DOCTORS_REPOSITORY')
    private readonly doctorsRepository: DoctorsRepository
  ) {}

  async execute(): Promise<Doctors[]> {
    return this.doctorsRepository.findAll();
  }
}
