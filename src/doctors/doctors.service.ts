import { Inject, Injectable } from '@nestjs/common';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorResponseDto } from './dto/doctor-response.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private readonly doctorsRepository: Repository<Doctor>,
  ) {}

  private transformToDto(doctor: Doctor): DoctorResponseDto {
    return plainToInstance(DoctorResponseDto, doctor, {
      excludeExtraneousValues: true,
    });
  }

  async create(doctor: CreateDoctorDto): Promise<DoctorResponseDto> {
    const newDoctor = this.doctorsRepository.create(doctor);
    const savedDoctor = await this.doctorsRepository.save(newDoctor);
    return this.transformToDto(savedDoctor);
  }

  async getAll(): Promise<DoctorResponseDto[]> {
    const doctors = await this.doctorsRepository.find({ relations: ['user'] });
    console.debug('DoctorsService: Retrieved all doctors:', doctors.map(doctor => this.transformToDto(doctor)));
    return doctors.map(doctor => this.transformToDto(doctor));
  }

  async findOne(id: string): Promise<DoctorResponseDto> {
    const doctor = await this.doctorsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
    return this.transformToDto(doctor);
  }

  async update(id: string, updateDoctorDto: CreateDoctorDto): Promise<DoctorResponseDto> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    Object.assign(doctor, updateDoctorDto);
    const updatedDoctor = await this.doctorsRepository.save(doctor);
    return this.transformToDto(updatedDoctor);
  }

  async softDelete(id: string): Promise<DoctorResponseDto> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
    doctor.isActive = false; // Assuming isActive is a field in the Doctor entity
    await this.doctorsRepository.save(doctor);
    return this.transformToDto(doctor);
  }
}
