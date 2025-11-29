import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { GetVendorsQueryDto } from './dto';
import { JwtAuthGuard } from '../../common/guards';

/**
 * 업체 관련 API 컨트롤러
 *
 * 주요 기능:
 * 1. 플랜에 포함된 업체 조회 (대표 플랜 화면용)
 * 2. 지도 영역 내 업체 조회 (지도 화면용)
 */
@Controller('vendors')
@UseGuards(JwtAuthGuard)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  /**
   * 업체 목록 조회 API
   *
   * @description
   * 두 가지 타입의 업체 조회를 지원합니다:
   *
   * 1. 플랜용 (type=plan):
   *    - plan_id와 category를 파라미터로 받아 해당 플랜에 포함된 업체 조회
   *    - 예: GET /vendors?type=plan&plan_id={uuid}&category=STUDIO
   *
   * 2. 지도용 (type=map):
   *    - 지도의 좌하단/우상단 좌표와 category를 받아 영역 내 업체 조회
   *    - 예: GET /vendors?type=map&category=STUDIO&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   *
   * @param queryDto 쿼리 파라미터 (type, plan_id, category, 좌표 등)
   * @returns 업체 목록, 총 개수, 페이지 정보
   *
   * @example
   * // 플랜용 요청
   * GET /vendors?type=plan&plan_id=123e4567-e89b-12d3-a456-426614174000&category=STUDIO
   *
   * // 지도용 요청
   * GET /vendors?type=map&category=VENUE&swLat=37.5&swLng=126.9&neLat=37.6&neLng=127.0
   *
   * // 응답 예시
   * {
   *   "vendors": [
   *     {
   *       "id": "uuid",
   *       "name": "스튜디오 A",
   *       "address": "서울시 강남구...",
   *       "phone": "02-1234-5678",
   *       "operating_hours": "09:00-18:00",
   *       "latitude": 37.5012,
   *       "longitude": 127.0394,
   *       "thumbnail_url": "https://...",
   *       "naver_rating": 4.8,
   *       "review_count": 120,
   *       "service_items": [...],
   *       "ai_resources": [...]
   *     }
   *   ],
   *   "total": 15,
   *   "page": 1,
   *   "limit": 20
   * }
   */
  @Get()
  async getVendors(@Query() queryDto: GetVendorsQueryDto) {
    return this.vendorsService.getVendors(queryDto);
  }
}
