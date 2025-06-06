import { Inject, Injectable } from '@nestjs/common';
import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { Doctors } from '../../domain/entities/doctors.entity';
import { CreateDoctorDto } from '../../infrastructure/dto/create-doctor.dto';

@Injectable()
export class CreateDoctorsUsecase {
  constructor(
    @Inject('DOCTORS_REPOSITORY')
    private readonly doctorsRepository: DoctorsRepository,
  ) {
  }

  async execute(input: CreateDoctorDto): Promise<Doctors> {
    const doctor = new Doctors(
      '',
      input.speciality,
      input.licenceNumber,
      input.clinicName,
      input.clinicAddress || '',
      input.userId,
      false, // isActive
    )
    return await this.doctorsRepository.create(doctor);
  }

}
