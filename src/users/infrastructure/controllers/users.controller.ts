import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UsersService } from '../../application/services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { UserRole } from '../persistence/users.orm-entity';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create.execute(createUserDto).then(user =>
      plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true })
    );
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users', type: [UserResponseDto] })
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll.execute().then(users =>{
      return users.map(user => plainToInstance(UserResponseDto, user));
    })
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Return the user', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.findOne.execute(id).then(user =>{
      if (!user) {
        throw new Error('User not found');
      }
      return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    })
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update.execute(id, updateUserDto).then(user => {
      if (!user) {
        throw new Error('User not found');
      }
      return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    })
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.delete.execute(id);
  }

  @Patch(':id/activate/:isActive')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Activate a user' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiParam({ name: 'isActive', type: 'boolean', required: false })
  @ApiResponse({ status: 200, description: 'User activated successfully', type: Boolean })
  @ApiResponse({ status: 404, description: 'User not found' })
  activate(@Param('id', ParseUUIDPipe) id: string, @Param('isActive', ParseBoolPipe) isActive: boolean): Promise<boolean> {
    return this.usersService.activate.execute(id, isActive);
  }
  //
  // @Patch(':id/deactivate')
  // @Roles(UserRole.ADMIN)
  // @ApiOperation({ summary: 'Deactivate a user' })
  // @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  // @ApiResponse({ status: 200, description: 'User deactivated successfully', type: UserResponseDto })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
  //   return this.usersService.deactivate(id);
  // }
}
