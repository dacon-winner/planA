import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation, ReservationStatus } from '../../entities/reservation.entity';
import { User } from '../../entities/user.entity';
import { Vendor } from '../../entities/vendor.entity';
import { Plan } from '../../entities/plan.entity';
import { PlanItem } from '../../entities/plan-item.entity';
import {
  CreateReservationDto,
  CreateReservationResponseDto,
  ReservationResponseDto,
  GetReservationQueryDto,
  GetReservationResponseDto,
  UpcomingReservationsResponseDto,
  UpcomingReservationItemDto,
} from './dto';

/**
 * 예약 서비스
 * @description 예약 관련 비즈니스 로직을 처리합니다.
 */
@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
    @InjectRepository(PlanItem)
    private readonly planItemRepository: Repository<PlanItem>,
  ) {}

  /**
   * 예약 생성
   * @description MVP 단계: 예약 생성 시 바로 확정(CONFIRMED) 상태로 생성하고,
   *              해당 plan_item의 is_confirmed를 true로 업데이트합니다.
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID (URL 파라미터)
   * @param createReservationDto - 예약 생성 데이터
   * @returns 생성된 예약 정보
   * @throws NotFoundException - 사용자, 업체, 플랜을 찾을 수 없는 경우
   * @throws BadRequestException - 날짜 형식이 잘못된 경우
   */
  async createReservation(
    userId: string,
    planId: string,
    createReservationDto: CreateReservationDto,
  ): Promise<CreateReservationResponseDto> {
    // 1. 사용자 존재 확인
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 2. 플랜 존재 확인 및 권한 검증
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException('플랜을 찾을 수 없습니다.');
    }

    if (plan.user_id !== userId) {
      throw new BadRequestException('해당 플랜에 접근할 권한이 없습니다.');
    }

    // 3. 업체 존재 확인
    const vendor = await this.vendorRepository.findOne({
      where: { id: createReservationDto.vendor_id },
    });

    if (!vendor) {
      throw new NotFoundException('업체를 찾을 수 없습니다.');
    }

    // 4. 날짜 변환 (yy-mm-dd -> yyyy-mm-dd)
    const reservationDate = this.convertToFullDate(createReservationDto.reservation_date);

    // 5. 예약 엔티티 생성 (MVP: 바로 확정 상태로 생성)
    const reservation = this.reservationRepository.create({
      user_id: userId,
      plan_id: planId,
      vendor_id: createReservationDto.vendor_id,
      reservation_date: reservationDate,
      reservation_time: createReservationDto.reservation_time,
      status: ReservationStatus.CONFIRMED, // MVP: 바로 확정 상태
      is_deposit_paid: false, // 기본값
      deposit_amount: 0, // 기본값
      visitor_count: 2, // 기본값
      visitor_name: user.name, // users 테이블에서 가져옴
      visitor_phone: user.phone, // users 테이블에서 가져옴
      // memo는 생략 (자동으로 null 설정됨)
    });

    // 6. 예약 저장
    const savedReservation = await this.reservationRepository.save(reservation);

    // 7. 해당 플랜의 plan_item의 is_confirmed를 true로 업데이트
    await this.planItemRepository.update(
      {
        plan_id: planId,
        vendor_id: createReservationDto.vendor_id,
      },
      {
        is_confirmed: true,
      },
    );

    // 8. 간소화된 성공 응답 반환
    return {
      message: 'Reservation completed successfully',
      reservation_id: savedReservation.id,
    };
  }

  /**
   * 예약 조회
   * @param userId - 사용자 ID (JWT에서 추출)
   * @param planId - 플랜 ID (URL 파라미터)
   * @param queryDto - 조회 조건 (vendor_id)
   * @returns 예약 정보
   * @throws NotFoundException - 플랜, 업체, 예약을 찾을 수 없는 경우
   * @throws BadRequestException - 플랜 접근 권한이 없는 경우
   */
  async getReservation(
    userId: string,
    planId: string,
    queryDto: GetReservationQueryDto,
  ): Promise<GetReservationResponseDto> {
    // 1. 플랜 존재 확인 및 권한 검증
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException('플랜을 찾을 수 없습니다.');
    }

    if (plan.user_id !== userId) {
      throw new BadRequestException('해당 플랜에 접근할 권한이 없습니다.');
    }

    // 2. 업체 존재 확인
    const vendor = await this.vendorRepository.findOne({
      where: { id: queryDto.vendor_id },
    });

    if (!vendor) {
      throw new NotFoundException('업체를 찾을 수 없습니다.');
    }

    // 3. 예약 조회
    const reservation = await this.reservationRepository.findOne({
      where: {
        plan_id: planId,
        vendor_id: queryDto.vendor_id,
      },
    });

    if (!reservation) {
      throw new NotFoundException('해당 플랜 및 업체에 대한 예약을 찾을 수 없습니다.');
    }

    // 4. 응답 DTO로 변환
    return this.mapToGetReservationResponseDto(reservation);
  }

  /**
   * yy-mm-dd 형식을 yyyy-mm-dd Date 객체로 변환
   * @param dateStr - yy-mm-dd 형식의 날짜 문자열
   * @returns Date 객체
   * @throws BadRequestException - 잘못된 날짜 형식
   */
  private convertToFullDate(dateStr: string): Date {
    const [yy, mm, dd] = dateStr.split('-');

    // yy를 yyyy로 변환 (20xx 가정)
    const fullYear = `20${yy}`;
    const fullDateStr = `${fullYear}-${mm}-${dd}`;

    const date = new Date(fullDateStr);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      throw new BadRequestException('유효하지 않은 날짜입니다.');
    }

    return date;
  }

  /**
   * Reservation 엔티티를 ReservationResponseDto로 변환
   * @param reservation - Reservation 엔티티
   * @returns ReservationResponseDto
   */
  private mapToResponseDto(reservation: Reservation): ReservationResponseDto {
    return {
      id: reservation.id,
      user_id: reservation.user_id,
      vendor_id: reservation.vendor_id,
      plan_id: reservation.plan_id,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      status: reservation.status,
      is_deposit_paid: reservation.is_deposit_paid,
      deposit_amount: reservation.deposit_amount,
      visitor_name: reservation.visitor_name,
      visitor_phone: reservation.visitor_phone,
      visitor_count: reservation.visitor_count,
      memo: reservation.memo,
      created_at: reservation.created_at,
    };
  }

  /**
   * Reservation 엔티티를 GetReservationResponseDto로 변환
   * @param reservation - Reservation 엔티티
   * @returns GetReservationResponseDto
   */
  private mapToGetReservationResponseDto(reservation: Reservation): GetReservationResponseDto {
    return {
      plan_id: reservation.plan_id,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      status: reservation.status,
      visitor_name: reservation.visitor_name,
      visitor_phone: reservation.visitor_phone,
    };
  }

  /**
   * 다가오는 일정 조회
   * @description 사용자의 모든 예약 중 예약 날짜 기준으로 가장 빠른 4개의 예약을 반환합니다.
   * @param userId - 사용자 ID (JWT에서 추출)
   * @returns 다가오는 예약 목록 (최대 4개)
   */
  async getUpcomingReservations(userId: string): Promise<UpcomingReservationsResponseDto> {
    // 1. 사용자의 모든 예약을 조회하고, vendor 관계를 함께 로드
    const reservations = await this.reservationRepository.find({
      where: { user_id: userId },
      relations: ['vendor'],
      order: {
        reservation_date: 'ASC', // 날짜 오름차순 (가장 빠른 날짜부터)
        reservation_time: 'ASC', // 같은 날짜일 경우 시간 오름차순
      },
      take: 4, // 최대 4개만 가져오기
    });

    // 2. DTO로 변환
    const upcomingReservations: UpcomingReservationItemDto[] = reservations.map((reservation) => ({
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      vendor: {
        id: reservation.vendor.id,
        name: reservation.vendor.name,
        address: reservation.vendor.address,
      },
    }));

    // 3. 응답 반환
    return {
      reservations: upcomingReservations,
    };
  }
}
