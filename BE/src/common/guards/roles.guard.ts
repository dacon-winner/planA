import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * 역할 기반 접근 제어 Guard
 * @description @Roles 데코레이터로 지정된 역할을 가진 사용자만 접근 가능
 *
 * @example
 * ```typescript
 * @Roles('admin', 'manager')
 * @Get('admin')
 * adminOnly() {
 *   return 'Admin only content';
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

    // TODO: User 엔티티에 role 필드 추가 후 구현
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    // return requiredRoles.some((role) => user.roles?.includes(role));

    // 임시: 모든 요청 허용 (역할 기능 미구현)
    return true;
  }
}
