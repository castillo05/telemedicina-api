import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../../users/domain/entities/user.entity';
import { UserResponseDto } from '../../../users/infrastructure/dto/user-response.dto';
import { DoctorResponseDto } from '../../../doctors/infrastructure/dto/doctor-response.dto';

export class ClinicsResponseDto{
  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'City Hospital' })
  name: string;

  @Expose()
  @ApiProperty({ example: '123 Main St, City, Country' })
  address: string;

  @Expose()
  @ApiProperty({ example: '+1234567890' })
  phone: string;

  @Expose()
  @ApiProperty({ example: 'https://example.com/logo.png' })
  logoUrl: string;

  @Expose()
  @ApiProperty({ example: 'clinics.clinics.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 'https://clinics.clinics.com' })
  website?: string;

  @Expose()
  @ApiProperty({ example: 'A leading healthcare provider in the city.' })
  description?: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  planId?: string;

  @Expose()
  @ApiProperty({ type: () => UserResponseDto, isArray: true, description: 'List of users associated with the clinic' })
  users: UserResponseDto; // Assuming users are represented by their IDs

  @Expose()
  @ApiProperty({type: () => DoctorResponseDto, required: false, description: 'Primary doctor associated with the clinic'})
  doctor?: DoctorResponseDto;
}
