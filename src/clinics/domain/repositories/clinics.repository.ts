import { Clinics } from '../entities/clinics.entity';

export const CLINICS_REPOSITORY = 'CLINICS_REPOSITORY';

export interface ClinicsRepository {
  create(clinic: Clinics): Promise<Clinics>;
  findById(id: string): Promise<Clinics | null>;
  // update(id: string, clinic: Clinics): Promise<Clinics>;
  // findAll(): Promise<Clinics[]>;
  // delete(id: string): Promise<boolean>;
}
