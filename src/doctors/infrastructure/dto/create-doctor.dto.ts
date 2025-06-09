import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {

  @ApiProperty({ example: 'Cardiology' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  speciality: string;

  @ApiProperty({ example: 'LIC123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  licenceNumber: string;

  @ApiProperty({ example: 'City Hospital' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  clinicName: string;

  @ApiProperty({ example: '123 Main St, City, Country', required: false })
  @IsString()
  @IsNotEmpty({ message: 'Clinic address is optional but should be a string if provided.' })
  clinicAddress?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  @MinLength(36, { message: 'User ID must be a valid UUID.' })
  userId: string;

  @ApiProperty({ example: '7a8ca1a5-2aa9-4fa4-b705-51620cc22de9', required: true })
  @IsNotEmpty()
  clinicId: string;
}
