import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';

/**
 * 역할 기반 접근 제어 Guard
 * @description 특정 역할을 가진 사용자만 접근할 수 있도록 제어합니다.
 *
 * @example
 * ```typescript
 * @SetMetadata(ROLES_KEY, ['admin'])
 * @Get('admin-only')
 * adminOnlyRoute() {
 *   return 'Admin only data';
 * }
 * ```
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // TODO: 실제 사용자 역할 확인 로직 구현
    // 현재는 모든 요청을 허용 (개발 단계)

    // 실제 구현 시:
    // return requiredRoles.some((role) => user.roles?.includes(role));

    return true;
  }
}
