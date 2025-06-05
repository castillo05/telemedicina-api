import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/infrastructure/dto/user-response.dto';

export class DoctorResponseDto {
  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'John' })
  speciality: string;

  @Expose()
  @ApiProperty({ example: 'LIC123456' })
  licenceNumber: string;

  @Expose()
  @ApiProperty({ example: 'City Hospital' })
  clinicName: string;

  @Expose()
  @ApiProperty({ example: '123 Main St, City, Country', required: false })
  clinicAddress?: string;

  @Expose()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @Expose()
  @ApiProperty({ example: true })
  isActive: boolean;

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: () => UserResponseDto, required: false, description: 'User details associated with the doctor' })
  user?: UserResponseDto;
}
