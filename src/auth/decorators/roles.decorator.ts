import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/infrastructure/persistence/users.orm-entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
