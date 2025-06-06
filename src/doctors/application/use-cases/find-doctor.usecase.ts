import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { Doctors } from '../../domain/entities/doctors.entity';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindDoctorUsecase {
  constructor(
    @Inject('DOCTORS_REPOSITORY')
    private readonly doctorsRepository: DoctorsRepository
  ) {}

  async execute(id: string): Promise<Doctors> {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new ConflictException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }
}
