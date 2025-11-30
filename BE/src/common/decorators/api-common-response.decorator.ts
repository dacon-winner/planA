import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export interface ApiCommonResponseOptions {
  nullable?: boolean;
  description?: string;
}

/**
 * 공통 API 응답 스키마를 자동으로 생성하는 데코레이터
 * @param dataDto - 응답 데이터 DTO 클래스
 * @param options - 추가 옵션 (nullable, description)
 */
export const ApiCommonResponse = <TModel extends Type<any>>(
  dataDto?: TModel,
  options?: ApiCommonResponseOptions,
) => {
  const { nullable = false, description } = options ?? {};

  const dataSchema = dataDto
    ? nullable
      ? {
          oneOf: [{ $ref: getSchemaPath(dataDto) }, { type: 'null' }],
        }
      : { $ref: getSchemaPath(dataDto) }
    : { type: 'object' };

  const decorators = [
    ApiExtraModels(dataDto ?? Object),
    ApiResponse({
      description,
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              data: dataSchema,
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
