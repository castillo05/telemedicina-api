import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude} from 'class-transformer';
import { BaseEntity } from '../../../common/interfaces/base.entity';
import { User } from '../../../users/infrastructure/persistence/users.orm-entity';
import { Clinics } from '../../../clinics/domain/entities/clinics.entity';
import { ClinicsOrmEntity } from '../../../clinics/infrastructure/persistence/clinics.orm-entity';

@Entity('doctors')
export class Doctor extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  speciality: string;

  @Column({ type: 'varchar', length: 100 })
  licenceNumber: string;

  @Column({ type: 'varchar', length: 100 })
  clinicName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  clinicAddress?: string;

  @Column()
  userId: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  clinicId: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => ClinicsOrmEntity, (clinic) => clinic.doctors, { eager: true })
  clinic: ClinicsOrmEntity;
}
