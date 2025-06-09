import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClinicsDto{
  @ApiProperty({ example: 'City Clinic' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: '123 Main St, City, Country' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: true })
  @IsNotEmpty()
  @IsString()
  logoUrl: string;

  @ApiProperty({ example: 'clinics@clinics.com', required: true })
  @IsString()
  email?: string;

  @ApiProperty({ example: 'https://clinics.com', required: true })
  @IsString()
  website: string;

  @ApiProperty({ example: 'A brief description of the clinic', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsString()
  planId?: string;

  @ApiProperty({ example: true, required: false })
  @IsNotEmpty()
  isActive?: boolean = true; // Default to true if not provided

}
