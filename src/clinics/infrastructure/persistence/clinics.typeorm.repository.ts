import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ClinicsRepository } from '../../domain/repositories/clinics.repository';
import { Repository } from 'typeorm';
import { Clinics } from '../../domain/entities/clinics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsOrmEntity } from './clinics.orm-entity';

@Injectable()
export class ClinicsTypeormRepository implements ClinicsRepository {
  constructor(
    @InjectRepository(ClinicsOrmEntity) private readonly clinicsOrmRepository: Repository<ClinicsOrmEntity>,
  ) {}

  async create(clinic: Clinics): Promise<Clinics> {
    try {
      const searchClinic = await this.clinicsOrmRepository.findOne({ where: { name: clinic.name } });
      console.log('Searching for existing clinic:', searchClinic);

      if (searchClinic) {
        throw new ConflictException(`Clinic with name ${clinic.name} already exists.`);
      }

      const clinicData = {
        name: clinic.name,
        address: clinic.address,
        phone: clinic.phone,
        logoUrl: clinic.logoUrl,
        email: clinic.email || '',
        website: clinic.website || '',
        description: clinic.description || '',
        isActive: clinic.isActive,
        planId: clinic.planId || '',
        users: clinic.users.map(user => ({ id: user.id })), // Assuming users is an array of user IDs
      };
      const newClinic = this.clinicsOrmRepository.create(clinicData);
      return await this.clinicsOrmRepository.save(newClinic);
    } catch (error) {
      console.error('Error creating clinic:', error);
      throw new ConflictException(`Error creating clinic: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Clinics | null> {
    const clinic = await this.clinicsOrmRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!clinic) {
      return null;
    }
    return {
      ...clinic,
      users: clinic.users.map(user => ({ id: user.id, firstName: user.firstName, lastName: user.lastName })),
    };
  }

  async findAll(): Promise<Clinics[]> {
    const clinics = await this.clinicsOrmRepository.find({ relations: ['users', 'doctors'] });
    return clinics.map(clinic => ({
      ...clinic,
      users: clinic.users.map(user => ({ ...user})),
    }));
  }
}
