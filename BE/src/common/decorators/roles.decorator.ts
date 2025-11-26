import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * 역할 기반 접근 제어를 위한 데코레이터
 * @param roles - 허용할 역할 목록
 * @example
 * ```typescript
 * @Roles('admin', 'manager')
 * @Get('admin-only')
 * adminOnlyRoute() {
 *   return 'Admin only data';
 * }
 * ```
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
