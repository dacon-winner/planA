import { IsEnum, IsOptional, IsString, IsNumberString, ValidateIf } from 'class-validator';
import { VendorCategory } from '../../../entities/vendor.entity';

// API 타입 구분용 enum
export enum VendorQueryType {
  PLAN = 'plan',
  MAP = 'map',
}

export class GetVendorsQueryDto {
  @IsEnum(VendorQueryType)
  type: VendorQueryType;

  // 공통 파라미터
  @IsOptional()
  @IsEnum(VendorCategory)
  category?: VendorCategory;

  // PLAN 타입용 파라미터
  @ValidateIf((o: GetVendorsQueryDto) => o.type === VendorQueryType.PLAN)
  @IsString()
  plan_id?: string;

  // MAP 타입용 파라미터
  @ValidateIf((o: GetVendorsQueryDto) => o.type === VendorQueryType.MAP)
  @IsNumberString()
  swLat?: string; // 좌하단 위도

  @ValidateIf((o: GetVendorsQueryDto) => o.type === VendorQueryType.MAP)
  @IsNumberString()
  swLng?: string; // 좌하단 경도

  @ValidateIf((o: GetVendorsQueryDto) => o.type === VendorQueryType.MAP)
  @IsNumberString()
  neLat?: string; // 우상단 위도

  @ValidateIf((o: GetVendorsQueryDto) => o.type === VendorQueryType.MAP)
  @IsNumberString()
  neLng?: string; // 우상단 경도

  // 페이지네이션 (선택)
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  // 정렬 옵션 (선택)
  @IsOptional()
  @IsEnum(['rating', 'price', 'review_count', 'name'])
  sort?: 'rating' | 'price' | 'review_count' | 'name';
}
