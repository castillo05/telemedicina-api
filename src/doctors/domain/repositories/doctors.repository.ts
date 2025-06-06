import { Doctors } from '../entities/doctors.entity';

export const DOCTORS_REPOSITORY = 'DOCTORS_REPOSITORY';

export interface DoctorsRepository {
  create(doctor: Doctors): Promise<Doctors>;
  findById(id: string): Promise<Doctors | null>;
  update(id: string, doctor: Doctors): Promise<Doctors>;
  findAll(): Promise<Doctors[]>;
  delete(id: string): Promise<boolean>;
}
