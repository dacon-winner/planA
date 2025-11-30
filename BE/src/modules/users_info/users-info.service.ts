import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersInfo } from '../../entities/users-info.entity';
import { User } from '../../entities/user.entity';
import { Plan } from '../../entities/plan.entity';
import { CreateUsersInfoDto } from './dto/create-users-info.dto';
import { AiService } from '../ai/ai.service';
import { PlansService } from '../plans/plans.service';

/**
 * 사용자 상세 정보 서비스
 * - 결혼 계획 관련 상세 정보 관리
 * - 메인 플랜 자동 설정 로직 포함
 * - AI 기반 스드메 추천 및 플랜 자동 생성
 */
@Injectable()
export class UsersInfoService {
  private readonly logger = new Logger(UsersInfoService.name);

  constructor(
    @InjectRepository(UsersInfo)
    private readonly usersInfoRepository: Repository<UsersInfo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly aiService: AiService,
    private readonly plansService: PlansService,
  ) {}

  /**
   * 사용자 상세 정보 생성
   * - AI 추천 기반 스드메 조합 추천
   * - 자동으로 플랜 생성
   * @param userId - 사용자 ID
   * @param createUsersInfoDto - 생성할 상세 정보
   * @returns 생성된 플랜 (plan_items, vendor, service_item 포함)
   */
  async create(userId: string, createUsersInfoDto: CreateUsersInfoDto): Promise<Plan | null> {
    this.logger.log(`사용자 상세 정보 생성 시작: userId=${userId}`);

    // 사용자 존재 여부 확인
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 해당 사용자의 기존 users_info 조회
    const existingUsersInfo = await this.usersInfoRepository.findOne({
      where: { user_id: userId },
    });

    // 기존 플랜이 없으면 is_main_plan=true, 있으면 false
    const isMainPlan = !existingUsersInfo;

    // 새로운 상세 정보 생성
    const usersInfo = this.usersInfoRepository.create({
      user_id: userId,
      is_main_plan: isMainPlan,
      wedding_date: createUsersInfoDto.wedding_date
        ? new Date(createUsersInfoDto.wedding_date)
        : null,
      preferred_region: createUsersInfoDto.preferred_region || null,
      budget_limit: createUsersInfoDto.budget_limit || null,
    });

    const savedUsersInfo = await this.usersInfoRepository.save(usersInfo);
    this.logger.log(`사용자 상세 정보 생성 완료: usersInfoId=${savedUsersInfo.id}`);

    // AI 추천 및 플랜 생성 (비동기)
    let plan: Plan | null = null;

    try {
      this.logger.log('AI 스드메 추천 시작...');

      // 1. AI 추천 실행
      const recommendations = await this.aiService.recommendVendorCombination(
        {
          wedding_date: savedUsersInfo.wedding_date,
          preferred_region: savedUsersInfo.preferred_region,
          budget_limit: savedUsersInfo.budget_limit,
        },
        userId,
      );

      // 2. 추천 결과가 있으면 플랜 생성
      if (
        recommendations.studio ||
        recommendations.dress ||
        recommendations.makeup ||
        recommendations.venue
      ) {
        this.logger.log('추천 결과 기반 플랜 생성 시작...');
        plan = await this.plansService.createFromRecommendations(
          userId,
          savedUsersInfo.id,
          recommendations,
        );
        this.logger.log(`플랜 생성 완료: planId=${plan.id}`);
      } else {
        this.logger.warn('추천 가능한 업체가 없어 플랜을 생성하지 않았습니다.');
      }
    } catch (error) {
      // AI 추천 실패 시에도 users_info는 정상 생성되지만 플랜은 null 반환
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`AI 추천/플랜 생성 실패: ${errorMessage}`, errorStack);
    }

    // 생성된 플랜만 반환 (plan_items, vendor, service_item 포함)
    return plan;
  }
}
