import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Doctors } from '../../domain/entities/doctors.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './doctors.orm-entity';
import { DoctorResponseDto } from '../dto/doctor-response.dto';
import { User } from '../../../users/infrastructure/persistence/users.orm-entity';
import { UsersRepository } from '../../../users/domain/repositories/users.repository';
import { DoctorsRepository } from '../../domain/repositories/doctors.repository';
import { ClinicsRepository } from '../../../clinics/domain/repositories/clinics.repository';

@Injectable()
export class DoctorsTypeormRepository implements DoctorsRepository {
  constructor(
    @Inject('USERS_REPOSITORY')private readonly userRepository: UsersRepository,
    @Inject('CLINICS_REPOSITORY') private readonly clinicsRepository: ClinicsRepository,
    @InjectRepository(Doctor) private readonly doctorsRepository: Repository<Doctor>,
  ) {}

  async create(doctor: Doctors): Promise<Doctors> {
    const searchUser = await this.userRepository.findById(doctor.userId);
    if (!searchUser) {
      throw new ConflictException(`Doctor with licence number ${doctor.licenceNumber} already exists.`);
    }

    const searchClinic = await this.clinicsRepository.findById(doctor.clinicId);
    if (!searchClinic) {
      throw new NotFoundException(`Clinic with ID ${doctor.clinicId} does not exist.`);
    }
    const newDoctor = this.doctorsRepository.create({
      speciality: doctor.speciality,
      licenceNumber: doctor.licenceNumber,
      clinicName: doctor.clinicName,
      clinicAddress: doctor.clinicAddress,
      user: { id: doctor.userId },
      isActive: doctor.isActive,
      clinic: { id: doctor.clinicId },
    });
    try{
      const savedDoctor = await this.doctorsRepository.save(newDoctor);
      return plainToInstance(Doctors, savedDoctor);
    }catch (error) {
      console.error('Error creating doctor:', error);
      throw new ConflictException(`Error creating doctor: ${error.message}`);
    }
  }

  async findAll(): Promise<Doctors[]> {
    const doctors = await this.doctorsRepository.find({ relations: ['user'] });
    return doctors.map(doctor => plainToInstance(Doctors, doctor));
  }

  async findOne(id: string): Promise<Doctors> {
    const doctor = await this.doctorsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!doctor) {
      throw new ConflictException(`Doctor with ID ${id} not found`);
    }
    return plainToInstance(Doctors, doctor);
  }

  async update(id: string, updateDoctorDto: Doctors): Promise<Doctors> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    Object.assign(doctor, updateDoctorDto);
    const updatedDoctor = await this.doctorsRepository.save(doctor);
    return plainToInstance(Doctors, updatedDoctor);
  }

  async delete(id: string): Promise<boolean> {
    const doctor = await this.doctorsRepository.findOne({ where: { id } });
    if (!doctor) {
      return false;
    }
    doctor.isActive = false;
    await this.doctorsRepository.save(doctor);
    return true;
  }

  async findById(id: string): Promise<Doctors | null> {
    const doctor = await this.doctorsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!doctor) {
      return null;
    }
    return plainToInstance(Doctors, doctor);
  }
}
