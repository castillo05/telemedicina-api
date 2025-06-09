import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateDoctorDto {
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
  clinicAddress?: string;
}
