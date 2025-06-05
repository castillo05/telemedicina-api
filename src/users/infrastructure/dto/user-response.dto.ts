import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../persistence/users.orm-entity';
import { Expose, Type } from 'class-transformer';
import { DoctorResponseDto } from '../../../doctors/dto/doctor-response.dto';

export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'John' })
  firstName: string;

  @Expose()
  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @Expose()
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: '+1234567890', required: false })
  phone?: string;

  @Expose()
  @ApiProperty({ enum: UserRole, example: UserRole.PATIENT })
  role: UserRole;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: true })
  isEmailVerified: boolean;

  @Expose()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @Expose()
  @Type(() => DoctorResponseDto)
  @ApiProperty({ type: () => DoctorResponseDto, required: false, description: 'Doctor profile details if available' })
  doctorProfile?: DoctorResponseDto;

  @ApiProperty({ example: 'John Doe' })
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
