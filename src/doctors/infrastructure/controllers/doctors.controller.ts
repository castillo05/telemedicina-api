import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { DoctorsService } from '../../application/services/doctors.service';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../../users/infrastructure/persistence/users.orm-entity';
import { DoctorResponseDto } from '../dto/doctor-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('doctors')
@ApiTags('Doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService,) {}

  @Post()
  @Roles(UserRole.ADMIN) // Assuming 'admin' role is defined in your Roles decorator
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully', type: CreateDoctorDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createDoctor(@Body() doctorDto: CreateDoctorDto): Promise<DoctorResponseDto> {
    const doctor = await this.doctorsService.create.execute(doctorDto);
    return plainToInstance(DoctorResponseDto, doctor, { excludeExtraneousValues: true });
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors', type: [CreateDoctorDto] })
  getAllDoctors(): Promise<DoctorResponseDto[]> {
    return this.doctorsService.find.execute();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.DOCTOR) // Assuming 'doctor' role is defined in your Roles decorator
  @ApiOperation({ summary: 'Get doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor details', type: DoctorResponseDto })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  getDoctorById(@Body('id') id: string): Promise<DoctorResponseDto> {
    return this.doctorsService.findOne.execute(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update doctor details' })
  @ApiResponse({ status: 200, description: 'Doctor updated successfully', type: DoctorResponseDto })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  updateDoctor(
    @Body('id') id: string,
    @Body() updateDoctorDto: CreateDoctorDto,
  ): Promise<DoctorResponseDto> {
    return this.doctorsService.update.execute(id, updateDoctorDto);
  }

  @Delete(':id/delete')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Soft delete a doctor' })
  @ApiResponse({ status: 200, description: 'Doctor soft deleted successfully', type: DoctorResponseDto })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  softDeleteDoctor(@Body('id') id: string): Promise<boolean> {
    return this.doctorsService.delete.execute(id);
  }

}
