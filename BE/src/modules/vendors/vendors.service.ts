import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { ServiceItem } from '../../entities/service-item.entity';
import { AiResource } from '../../entities/ai-resource.entity';
import { PlanItem } from '../../entities/plan-item.entity';
import { GetVendorsQueryDto, VendorQueryType } from './dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(ServiceItem)
    private readonly serviceItemRepository: Repository<ServiceItem>,
    @InjectRepository(AiResource)
    private readonly aiResourceRepository: Repository<AiResource>,
    @InjectRepository(PlanItem)
    private readonly planItemRepository: Repository<PlanItem>,
  ) {}

  /**
   * 업체 목록 조회 (플랜용 또는 지도용)
   */
  async getVendors(queryDto: GetVendorsQueryDto) {
    const { type, page = '1', limit = '20', sort = 'rating' } = queryDto;

    // 페이지네이션 계산
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // 타입에 따라 다른 로직 실행
    if (type === VendorQueryType.PLAN) {
      return this.getVendorsForPlan(queryDto, skip, limitNum, sort);
    } else if (type === VendorQueryType.MAP) {
      return this.getVendorsForMap(queryDto, skip, limitNum, sort);
    }

    throw new BadRequestException('Invalid query type');
  }

  /**
   * 플랜용 업체 조회
   * plan_id에 포함된 업체를 조회하고 category로 필터링
   */
  private async getVendorsForPlan(
    queryDto: GetVendorsQueryDto,
    skip: number,
    limit: number,
    sort: string,
  ) {
    const { plan_id, category } = queryDto;

    if (!plan_id) {
      throw new BadRequestException('plan_id is required for type=plan');
    }

    // plan_item 테이블에서 해당 plan의 vendor_id 목록 조회
    const queryBuilder = this.planItemRepository
      .createQueryBuilder('plan_item')
      .where('plan_item.plan_id = :plan_id', { plan_id });

    const planItems = await queryBuilder.getMany();
    const vendorIds = planItems.map((item) => item.vendor_id);

    if (vendorIds.length === 0) {
      return {
        vendors: [],
        total: 0,
        page: skip / limit + 1,
        limit,
      };
    }

    // vendor 조회
    const vendorQueryBuilder = this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.service_items', 'service_item')
      .leftJoinAndSelect('vendor.ai_resources', 'ai_resource')
      .where('vendor.id IN (:...vendorIds)', { vendorIds });

    // category 필터 추가
    if (category) {
      vendorQueryBuilder.andWhere('vendor.category = :category', { category });
    }

    // 정렬 적용
    this.applySorting(vendorQueryBuilder, sort);

    // 페이지네이션 적용
    vendorQueryBuilder.skip(skip).take(limit);

    const [vendors, total] = await vendorQueryBuilder.getManyAndCount();

    // 응답 데이터 포맷팅
    const formattedVendors = this.formatVendorResponse(vendors);

    return {
      vendors: formattedVendors,
      total,
      page: skip / limit + 1,
      limit,
    };
  }

  /**
   * 지도용 업체 조회
   * 지도 영역 내의 업체를 category로 필터링
   */
  private async getVendorsForMap(
    queryDto: GetVendorsQueryDto,
    skip: number,
    limit: number,
    sort: string,
  ) {
    const { category, swLat, swLng, neLat, neLng } = queryDto;

    // 필수 파라미터 검증
    if (!category) {
      throw new BadRequestException('category is required for type=map');
    }
    if (!swLat || !swLng || !neLat || !neLng) {
      throw new BadRequestException('swLat, swLng, neLat, neLng are required for type=map');
    }

    // 좌표 파싱
    const southWestLat = parseFloat(swLat);
    const southWestLng = parseFloat(swLng);
    const northEastLat = parseFloat(neLat);
    const northEastLng = parseFloat(neLng);

    // vendor 조회 (지도 영역 내 + category 필터)
    const queryBuilder = this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.service_items', 'service_item')
      .leftJoinAndSelect('vendor.ai_resources', 'ai_resource')
      .where('vendor.category = :category', { category })
      .andWhere('vendor.latitude BETWEEN :swLat AND :neLat', {
        swLat: southWestLat,
        neLat: northEastLat,
      })
      .andWhere('vendor.longitude BETWEEN :swLng AND :neLng', {
        swLng: southWestLng,
        neLng: northEastLng,
      });

    // 정렬 적용
    this.applySorting(queryBuilder, sort);

    // 페이지네이션 적용
    queryBuilder.skip(skip).take(limit);

    const [vendors, total] = await queryBuilder.getManyAndCount();

    // 응답 데이터 포맷팅
    const formattedVendors = this.formatVendorResponse(vendors);

    return {
      vendors: formattedVendors,
      total,
      page: skip / limit + 1,
      limit,
    };
  }

  /**
   * 정렬 로직 적용
   */
  private applySorting(queryBuilder: SelectQueryBuilder<Vendor>, sort: string) {
    switch (sort) {
      case 'rating':
        queryBuilder.orderBy('vendor.naver_rating', 'DESC');
        break;
      case 'review_count':
        queryBuilder.orderBy('vendor.review_count', 'DESC');
        break;
      case 'price':
        // service_item의 최소 가격 기준으로 정렬
        queryBuilder.orderBy('service_item.price', 'ASC');
        break;
      case 'name':
        queryBuilder.orderBy('vendor.name', 'ASC');
        break;
      default:
        queryBuilder.orderBy('vendor.naver_rating', 'DESC');
    }
  }

  /**
   * 응답 데이터 포맷팅
   */
  private formatVendorResponse(vendors: Vendor[]) {
    return vendors.map((vendor) => ({
      id: vendor.id,
      category: vendor.category,
      name: vendor.name,
      address: vendor.address,
      phone: vendor.phone,
      operating_hours: vendor.operating_hours,
      latitude: vendor.latitude,
      longitude: vendor.longitude,
      thumbnail_url: vendor.thumbnail_url,
      naver_rating: vendor.naver_rating,
      review_count: vendor.review_count,
      total_score: vendor.total_score,
      badges: vendor.badges,
      // service_items 배열
      service_items:
        vendor.service_items?.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          thumbnail_url: item.thumbnail_url,
          is_package: item.is_package,
        })) || [],
      // ai_resources의 content만 추출
      ai_resources:
        vendor.ai_resources?.map((resource) => ({
          content: resource.content,
        })) || [],
    }));
  }
}
