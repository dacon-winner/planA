import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT 인증 Guard
 * @description Public 데코레이터가 적용된 라우트는 인증을 건너뜁니다.
 * 
 * 실제 JWT 인증을 구현하려면:
 * 1. @nestjs/passport, passport, passport-jwt 패키지 설치
 * 2. JWT 전략(Strategy) 구현
 * 3. 이 가드를 AuthGuard('jwt')로 교체
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Public 데코레이터가 있는지 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // TODO: 실제 JWT 인증 로직 구현
    // 현재는 모든 요청을 허용 (개발 단계)
    const request = context.switchToHttp().getRequest();
    
    // 실제 구현 시:
    // 1. Authorization 헤더에서 토큰 추출
    // 2. 토큰 검증
    // 3. 사용자 정보를 request.user에 저장
    // 4. 유효하지 않으면 UnauthorizedException 발생
    
    return true;
  }
}

