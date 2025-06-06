import { Inject, Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { Doctors } from '../../domain/entities/doctors.entity';

@Injectable()
export class UpdateDoctorsUsecase {
  constructor(
    @Inject('DOCTORS_REPOSITORY')
    private readonly doctorsRepository: DoctorsRepository,
  ) {}

  async execute(id: string, updateData: Partial<Doctors>): Promise<Doctors> {
    const existingDoctor = await this.doctorsRepository.findById(id);
    if (!existingDoctor) {
      throw new Error(`Doctor with id ${id} not found`);
    }

    const updatedDoctor = Object.assign(existingDoctor, updateData);
    return await this.doctorsRepository.update(id, updatedDoctor);
  }
}
