import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

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
  createDoctor(@Body() doctorDto: CreateDoctorDto): Promise<any> {
    return this.doctorsService.create(doctorDto);
  }

}
