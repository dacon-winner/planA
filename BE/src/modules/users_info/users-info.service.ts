import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersInfo } from '../../entities/users-info.entity';
import { User } from '../../entities/user.entity';
import { Plan } from '../../entities/plan.entity';
import { CreateUsersInfoDto } from './dto/create-users-info.dto';
import { UpdateUsersInfoDto } from './dto/update-users-info.dto';
import { UpdateUsersInfoResponseDto } from './dto/update-users-info-response.dto';
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

  /**
   * 사용자 상세 정보 수정
   * @description 결혼 예정일, 선호 지역, 예산 한도를 수정합니다.
   *
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param usersInfoId - 사용자 정보 ID
   * @param updateUsersInfoDto - 수정할 정보
   * @returns 수정 완료 메시지 및 수정된 정보
   *
   * @throws NotFoundException - users_info를 찾을 수 없거나 다른 사용자의 것인 경우
   */
  async update(
    userId: string,
    usersInfoId: string,
    updateUsersInfoDto: UpdateUsersInfoDto,
  ): Promise<UpdateUsersInfoResponseDto> {
    this.logger.log(`사용자 상세 정보 수정 시작: userId=${userId}, usersInfoId=${usersInfoId}`);

    // 1. users_info 조회
    const usersInfo = await this.usersInfoRepository.findOne({
      where: { id: usersInfoId },
    });

    if (!usersInfo) {
      throw new NotFoundException(`사용자 정보를 찾을 수 없습니다. (usersInfoId: ${usersInfoId})`);
    }

    // 2. 사용자 소유권 확인
    if (usersInfo.user_id !== userId) {
      throw new NotFoundException(`해당 사용자의 정보가 아닙니다. (usersInfoId: ${usersInfoId})`);
    }

    // 3. 수정할 필드만 업데이트
    if (updateUsersInfoDto.wedding_date !== undefined) {
      usersInfo.wedding_date = updateUsersInfoDto.wedding_date
        ? new Date(updateUsersInfoDto.wedding_date)
        : null;
    }

    if (updateUsersInfoDto.preferred_region !== undefined) {
      usersInfo.preferred_region = updateUsersInfoDto.preferred_region;
    }

    if (updateUsersInfoDto.budget_limit !== undefined) {
      usersInfo.budget_limit = updateUsersInfoDto.budget_limit;
    }

    // 4. 저장
    const updatedUsersInfo = await this.usersInfoRepository.save(usersInfo);

    this.logger.log(`사용자 상세 정보 수정 완료: usersInfoId=${usersInfoId}`);

    // 5. 응답 데이터 포맷팅
    return {
      message: '사용자 정보가 수정되었습니다.',
      usersInfoId: updatedUsersInfo.id,
      wedding_date: this.formatDate(updatedUsersInfo.wedding_date),
      preferred_region: updatedUsersInfo.preferred_region,
      budget_limit: updatedUsersInfo.budget_limit,
    };
  }

  /**
   * Date 또는 문자열을 YYYY-MM-DD 형식으로 변환
   * @param date - Date 객체 또는 문자열
   * @returns YYYY-MM-DD 형식의 문자열 또는 null
   */
  private formatDate(date: Date | string | null): string | null {
    if (!date) return null;

    // 이미 문자열인 경우 (TypeORM이 date 타입을 문자열로 반환하는 경우)
    if (typeof date === 'string') {
      return date.split('T')[0];
    }

    // Date 객체인 경우
    return date.toISOString().split('T')[0];
  }
}
