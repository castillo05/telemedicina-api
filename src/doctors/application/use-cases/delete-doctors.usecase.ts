import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteDoctorsUsecase {
  constructor(
    @Inject('DOCTORS_REPOSITORY')
    private readonly doctorsRepository: DoctorsRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return await this.doctorsRepository.delete(id);
  }
}
