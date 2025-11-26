import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

/**
 * 공통 API 응답 스키마를 자동으로 생성하는 데코레이터
 * @param dataDto - 응답 데이터 DTO 클래스
 */
export const ApiCommonResponse = <TModel extends Type<any>>(dataDto?: TModel) => {
  const decorators = [
    ApiExtraModels(dataDto ?? Object),
    ApiResponse({
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              data: dataDto ? { $ref: getSchemaPath(dataDto) } : { type: 'object' },
              timestamp: {
                type: 'string',
                format: 'date-time',
                example: '2024-01-01T00:00:00.000Z',
              },
            },
          },
        ],
      },
    }),
  ];

  return applyDecorators(...decorators);
};
