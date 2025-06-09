import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClinicService } from '../../application/services/clinics.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../../../users/infrastructure/persistence/users.orm-entity';
import { CreateClinicsDto } from '../dto/create-clinics.dto';
import { Clinics } from '../../domain/entities/clinics.entity';

@Controller('clinics')
@ApiTags('Controllers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicsController {
  constructor(
    private readonly clinicsService: ClinicService
  ) {
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new clinic' })
  @ApiResponse({ status: 201, description: 'Clinic created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createClinic(@Body() createClinicDto: CreateClinicsDto): Promise<Clinics> {
    return this.clinicsService.create.execute(createClinicDto);
  }
}
