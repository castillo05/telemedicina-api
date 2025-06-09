import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/infrastructure/persistence/users.orm-entity';
import { Doctor } from '../../../doctors/infrastructure/persistence/doctors.orm-entity';

@Entity('clinics')
export class ClinicsOrmEntity {
  // Define the properties of the Clinics entity here
  // For example:
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logoUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'uuid', nullable: true })
  planId?: string;

  @OneToMany(() => User, (user) => user.clinic)
  users: User[]; // Assuming a clinic can have multiple users (doctors, admins, etc.)

  @OneToMany(() => Doctor, (doctor) => doctor.clinic, { nullable: true })
  doctors: Doctor[]; // Assuming a clinic can have a primary doctor associated with it
}
