import { Inject, Injectable } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private readonly doctorsRepository: Repository<Doctor>,
  ) {}

  private transformToDto(doctor: Doctor): Doctor {
    return plainToInstance(Doctor, doctor, {
      excludeExtraneousValues: true,
    });
  }

  async create(doctor: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = this.doctorsRepository.create(doctor);
    const savedDoctor = await this.doctorsRepository.save(newDoctor);
    return this.transformToDto(savedDoctor);
  }
}
