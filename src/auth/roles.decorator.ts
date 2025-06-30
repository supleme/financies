// Em src/auth/decorators/roles.decorator.ts (crie a pasta se necessário)

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);