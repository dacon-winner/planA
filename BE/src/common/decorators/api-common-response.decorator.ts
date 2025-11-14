import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

/**
 * Swagger 문서화를 위한 공통 데코레이터
 */
export function ApiCommonResponse(summary: string, description?: string) {
  return applyDecorators(
    ApiOperation({ summary, description }),
    ApiResponse({ status: 200, description: '성공' }),
    ApiResponse({ status: 400, description: '잘못된 요청' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 500, description: '서버 오류' }),
  );
}

