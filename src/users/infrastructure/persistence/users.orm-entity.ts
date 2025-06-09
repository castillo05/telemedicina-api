import { Entity, Column, BeforeInsert, BeforeUpdate, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '../../../common/interfaces/base.entity';
import { Doctor } from '../../../doctors/infrastructure/persistence/doctors.orm-entity';
import { Clinics } from '../../../clinics/domain/entities/clinics.entity';
import { ClinicsTypeormRepository } from '../../../clinics/infrastructure/persistence/clinics.typeorm.repository';
import { ClinicsOrmEntity } from '../../../clinics/infrastructure/persistence/clinics.orm-entity';

export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PATIENT })
  role: UserRole;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  resetPasswordToken: string;

  @Column({ nullable: true })
  @Exclude()
  resetPasswordExpires: Date;

  @Column({ nullable: true })
  @Exclude()
  clinicId?: string;

  @ManyToOne(() => ClinicsOrmEntity, (clinic) => clinic.users, { eager: true })
  clinic?: ClinicsOrmEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    console.log('Validating password for user:', this.email);
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
