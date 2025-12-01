import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import {
  GetVendorsQueryDto,
  GetVendorDetailQueryDto,
  GetVendorDetailResponseDto,
  AiRecommendationResponseDto,
} from './dto';
import { JwtAuthGuard } from '../../common/guards';
import { Public } from '../../common/decorators';

/**
 * 업체 관련 API 컨트롤러
 *
 * 주요 기능:
 * - 지도 영역 내 업체 조회 (지도 화면용)
 */
@ApiTags('업체 (Vendors)')
@Controller('vendors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  /**
   * 지도용 업체 목록 조회 API
   *
   * @description
   * 지도의 좌하단/우상단 좌표와 선택적으로 category, vendor를 받아 업체를 조회합니다.
   * - category를 지정하지 않으면 모든 카테고리의 업체를 조회합니다.
   * - vendor를 지정하면 해당 이름과 일치하는 업체만 조회합니다.
   * - **중요**: vendor 검색어가 입력되면 좌표 제한 없이 전체 DB에서 검색합니다.
   *
   * @param queryDto 쿼리 파라미터 (좌표, category, vendor)
   * @returns 업체 목록, 총 개수
   *
   * @example
   * // 모든 카테고리 조회 (좌표 범위 내)
   * GET /vendors?swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   * GET /vendors?category=ALL&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   *
   * // 특정 카테고리만 조회 (좌표 범위 내)
   * GET /vendors?category=STUDIO&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   *
   * // 특정 업체 이름으로 검색 (좌표 제한 없이 전체 검색)
   * GET /vendors?vendor=스튜디오 A&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   *
   * // 응답 예시
   * {
   *   "vendors": [
   *     {
   *       "id": "uuid",
   *       "category": "STUDIO",
   *       "name": "스튜디오 A",
   *       "address": "서울시 강남구...",
   *       "phone": "02-1234-5678",
   *       "latitude": 37.5012,
   *       "longitude": 127.0394,
   *       "thumbnail_url": "https://...",
   *       "badges": ["인기", "추천"],
   *       "service_items": [...],
   *       "ai_resources": [...]
   *     }
   *   ],
   *   "total": 15
   * }
   */
  @Get()
  @Public()
  @ApiOperation({
    summary: '지도용 업체 목록 조회',
    description:
      '지도 영역 내 업체를 조회합니다.\n\n' +
      '**필수 파라미터**: swLat, swLng, neLat, neLng\n' +
      '**선택 파라미터**: category (기본값: ALL), vendor (업체 이름 검색)\n\n' +
      '**카테고리 옵션**: ALL, VENUE, STUDIO, DRESS, MAKEUP\n\n' +
      '**중요**: vendor 검색어가 입력되면 좌표 제한 없이 전체 DB에서 검색합니다.\n\n' +
      '예시:\n' +
      '- 모든 카테고리 (좌표 범위 내): GET /api/v1/vendors?swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0\n' +
      '- 특정 카테고리 (좌표 범위 내): GET /api/v1/vendors?category=VENUE&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0\n' +
      '- 업체 이름 검색 (전체 검색): GET /api/v1/vendors?vendor=스튜디오 A&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0',
  })
  @ApiResponse({
    status: 200,
    description: '업체 목록 조회 성공',
    schema: {
      type: 'object',
      properties: {
        vendors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              category: {
                type: 'string',
                enum: ['ALL', 'VENUE', 'STUDIO', 'DRESS', 'MAKEUP'],
              },
              name: { type: 'string' },
              address: { type: 'string' },
              phone: { type: 'string' },
              latitude: { type: 'number' },
              longitude: { type: 'number' },
              thumbnail_url: { type: 'string' },
              badges: { type: 'array', items: { type: 'string' } },
              service_items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    description: { type: 'string' },
                    thumbnail_url: { type: 'string' },
                    is_package: { type: 'boolean' },
                  },
                },
              },
              ai_resources: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    content: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        total: { type: 'number', description: '조회된 업체 총 개수' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 (필수 파라미터 누락 또는 잘못된 타입)',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async getVendors(@Query() queryDto: GetVendorsQueryDto) {
    return this.vendorsService.getVendors(queryDto);
  }

  /**
   * 업체 상세 조회 API
   *
   * @description
   * 특정 업체의 상세 정보를 조회합니다.
   * - vendor_images: 업체 이미지 URL 배열 (sort_order 오름차순 정렬, 없으면 null)
   * - plan_id를 쿼리 파라미터로 제공하면, 해당 플랜에서의 확정 여부(is_confirmed)도 함께 반환됩니다.
   *
   * @param id 업체 ID (UUID)
   * @param queryDto 쿼리 파라미터 (plan_id - 선택사항)
   * @returns 업체 상세 정보
   *
   * @example
   * // 일반 조회
   * GET /vendors/550e8400-e29b-41d4-a716-446655440000
   *
   * // 플랜 포함 조회
   * GET /vendors/550e8400-e29b-41d4-a716-446655440000?plan_id=123e4567-e89b-12d3-a456-426614174000
   *
   * // 응답 예시 (이미지 있음, plan_id 없음)
   * {
   *   "id": "uuid",
   *   "category": "STUDIO",
   *   "name": "스튜디오 A",
   *   "address": "서울시 강남구...",
   *   "phone": "02-1234-5678",
   *   "operating_hours": "09:00-18:00",
   *   "introduction": "최고의 스튜디오입니다.",
   *   "service_items": [
   *     {
   *       "id": "uuid",
   *       "name": "기본 패키지",
   *       "price": 500000,
   *       "is_package": true
   *     }
   *   ],
   *   "vendor_images": [
   *     "https://example.com/image1.jpg",
   *     "https://example.com/image2.jpg",
   *     "https://example.com/image3.jpg"
   *   ]
   * }
   *
   * // 응답 예시 (이미지 없음, plan_id 있음)
   * {
   *   "id": "uuid",
   *   "category": "STUDIO",
   *   "name": "스튜디오 A",
   *   "address": "서울시 강남구...",
   *   "phone": "02-1234-5678",
   *   "operating_hours": "09:00-18:00",
   *   "introduction": "최고의 스튜디오입니다.",
   *   "service_items": [...],
   *   "vendor_images": null,
   *   "is_confirmed": true
   * }
   */
  @Get(':id')
  @ApiOperation({
    summary: '업체 상세 조회',
    description:
      '특정 업체의 상세 정보를 조회합니다.\n\n' +
      '**반환 정보**:\n' +
      '- 업체 기본 정보 (이름, 주소, 전화번호, 운영시간, 소개)\n' +
      '- 서비스 아이템 목록 (이름, 가격, 패키지 여부)\n' +
      '- 업체 이미지 URL 배열 (sort_order 오름차순 정렬, 없으면 null)\n' +
      '- is_confirmed (plan_id 제공 시에만 반환)\n\n' +
      '**예시**:\n' +
      '- 일반 조회: GET /api/v1/vendors/{id}\n' +
      '- 플랜 포함: GET /api/v1/vendors/{id}?plan_id={plan_id}',
  })
  @ApiParam({
    name: 'id',
    description: '업체 ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '업체 상세 조회 성공',
    type: GetVendorDetailResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: '업체를 찾을 수 없음',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  async getVendorDetail(
    @Param('id') id: string,
    @Query() queryDto: GetVendorDetailQueryDto,
  ): Promise<GetVendorDetailResponseDto> {
    return this.vendorsService.getVendorDetail(id, queryDto);
  }

  /**
   * AI 기반 유사 업체 추천 API
   *
   * @description
   * AI가 현재 업체와 유사하거나 함께 고려하면 좋을 업체를 추천합니다.
   * - OpenAI GPT-4o-mini 모델 사용
   * - 같은 카테고리 내에서 최대 5개 추천
   * - 각 업체별 추천 이유 제공
   *
   * @param id 업체 ID (UUID)
   * @returns AI 추천 업체 목록 및 추천 이유
   *
   * @example
   * // 요청
   * GET /vendors/550e8400-e29b-41d4-a716-446655440000/ai-recommendations
   *
   * // 응답 예시
   * {
   *   "recommendations": [
   *     {
   *       "vendor_id": "uuid",
   *       "category": "STUDIO",
   *       "name": "스튜디오 B",
   *       "thumbnail_url": "https://...",
   *       "address": "서울시 강남구...",
   *       "naver_rating": 4.9,
   *       "reason": "고급스러운 스튜디오 분위기와 전문적인 촬영 기술로 유명합니다."
   *     }
   *   ],
   *   "overall_reason": "현재 보고 계신 업체와 유사한 스타일과 품질을 제공하는 업체들입니다."
   * }
   */
  @Get(':id/ai-recommendations')
  @Public()
  @ApiOperation({
    summary: 'AI 기반 유사 업체 추천',
    description:
      'AI가 현재 업체와 유사하거나 함께 고려하면 좋을 업체를 추천합니다.\n\n' +
      '**특징**:\n' +
      '- OpenAI GPT-4o-mini 모델 사용\n' +
      '- 같은 카테고리 내에서 유사도 기반 추천\n' +
      '- 최대 5개 업체 추천\n' +
      '- 각 업체별 상세한 추천 이유 제공\n\n' +
      '**활용 예시**: 업체 상세 페이지의 "AI가 추천하는 다른 업체" 섹션',
  })
  @ApiParam({
    name: 'id',
    description: '현재 보고 있는 업체 ID (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'AI 추천 성공',
    type: AiRecommendationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'AI 추천 생성 실패',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '업체를 찾을 수 없음',
  })
  async getAiRecommendations(@Param('id') id: string): Promise<AiRecommendationResponseDto> {
    return this.vendorsService.getAiRecommendations(id);
  }
}
