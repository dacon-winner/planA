import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { Vendor } from '../../entities/vendor.entity';
import { Plan } from '../../entities/plan.entity';
import {
  CreateReservationDto,
  UpdateReservationDto,
  GetReservationsQueryDto,
  ReservationStatus,
} from './dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  /**
   * 예약 생성
   */
  async createReservation(userId: string, createDto: CreateReservationDto) {
    const { vendor_id, plan_id, reservation_date, reservation_time, ...rest } = createDto;

    // DEBUG: userId 확인
    console.log('Creating reservation for userId:', userId, 'type:', typeof userId);

    // 업체 존재 확인
    const vendor = await this.vendorRepository.findOne({ where: { id: vendor_id } });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // plan_id가 있으면 플랜 존재 확인 및 권한 확인
    if (plan_id) {
      const plan = await this.planRepository.findOne({ where: { id: plan_id } });
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      if (plan.user_id !== userId) {
        throw new ForbiddenException('You do not have access to this plan');
      }
    }

    // 과거 날짜/시간 예약 방지
    const reservationDateTime = new Date(`${reservation_date}T${reservation_time}`);
    if (reservationDateTime < new Date()) {
      throw new BadRequestException('Cannot make reservation for past date/time');
    }

    // 날짜를 Date 객체로 변환
    const reservationDateObj = new Date(reservation_date);

    // 중복 예약 확인 (같은 업체, 같은 날짜/시간에 이미 예약이 있는지)
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        user_id: userId,
        vendor_id,
        reservation_date: reservationDateObj,
        reservation_time,
        status: ReservationStatus.CONFIRMED,
      },
    });

    if (existingReservation) {
      throw new BadRequestException('You already have a reservation at this time');
    }

    // 예약 엔티티 생성
    const reservation = new Reservation();
    reservation.user_id = userId;
    reservation.vendor_id = vendor_id;
    if (plan_id) {
      reservation.plan_id = plan_id;
    }
    reservation.reservation_date = reservationDateObj;
    reservation.reservation_time = reservation_time;
    reservation.status = ReservationStatus.PENDING;
    reservation.visitor_count = rest.visitor_count || 2;
    if (rest.visitor_name) {
      reservation.visitor_name = rest.visitor_name;
    }
    if (rest.visitor_phone) {
      reservation.visitor_phone = rest.visitor_phone;
    }
    if (rest.memo) {
      reservation.memo = rest.memo;
    }

    // 예약 저장
    const savedReservation = await this.reservationRepository.save(reservation);

    // 업체 정보와 함께 반환
    return this.getReservationWithRelations(savedReservation.id);
  }

  /**
   * 내 예약 목록 조회
   */
  async getMyReservations(userId: string, queryDto: GetReservationsQueryDto) {
    const { status, vendor_id, from_date, to_date } = queryDto;

    const queryBuilder = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.vendor', 'vendor')
      .leftJoinAndSelect('reservation.plan', 'plan')
      .where('reservation.user_id = :userId', { userId });

    // 상태 필터
    if (status) {
      queryBuilder.andWhere('reservation.status = :status', { status });
    }

    // 업체 필터
    if (vendor_id) {
      queryBuilder.andWhere('reservation.vendor_id = :vendor_id', { vendor_id });
    }

    // 날짜 범위 필터
    if (from_date && to_date) {
      queryBuilder.andWhere('reservation.reservation_date BETWEEN :from_date AND :to_date', {
        from_date,
        to_date,
      });
    } else if (from_date) {
      queryBuilder.andWhere('reservation.reservation_date >= :from_date', { from_date });
    } else if (to_date) {
      queryBuilder.andWhere('reservation.reservation_date <= :to_date', { to_date });
    }

    // 최신순 정렬
    queryBuilder.orderBy('reservation.reservation_date', 'DESC');
    queryBuilder.addOrderBy('reservation.reservation_time', 'DESC');

    const reservations = await queryBuilder.getMany();

    return this.formatReservations(reservations);
  }

  /**
   * 예약 상세 조회
   */
  async getReservationById(userId: string, reservationId: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['vendor', 'plan'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // 권한 확인
    if (reservation.user_id !== userId) {
      throw new ForbiddenException('You do not have access to this reservation');
    }

    return this.formatReservation(reservation);
  }

  /**
   * 예약 수정
   */
  async updateReservation(
    userId: string,
    reservationId: string,
    updateDto: UpdateReservationDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // 권한 확인
    if (reservation.user_id !== userId) {
      throw new ForbiddenException('You do not have access to this reservation');
    }

    // 취소된 예약은 수정 불가
    if (reservation.status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('Cannot update cancelled reservation');
    }

    // 날짜/시간 변경 시 과거 날짜 방지
    if (updateDto.reservation_date || updateDto.reservation_time) {
      const newDate = updateDto.reservation_date || reservation.reservation_date;
      const newTime = updateDto.reservation_time || reservation.reservation_time;
      const newDateTime = new Date(`${newDate}T${newTime}`);

      if (newDateTime < new Date()) {
        throw new BadRequestException('Cannot change reservation to past date/time');
      }
    }

    // 예약 정보 업데이트
    Object.assign(reservation, updateDto);
    await this.reservationRepository.save(reservation);

    return this.getReservationWithRelations(reservationId);
  }

  /**
   * 예약 취소
   */
  async cancelReservation(userId: string, reservationId: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    // 권한 확인
    if (reservation.user_id !== userId) {
      throw new ForbiddenException('You do not have access to this reservation');
    }

    // 이미 취소된 예약
    if (reservation.status === ReservationStatus.CANCELLED) {
      throw new BadRequestException('Reservation is already cancelled');
    }

    // 상태를 취소로 변경
    reservation.status = ReservationStatus.CANCELLED;
    await this.reservationRepository.save(reservation);

    return { message: 'Reservation cancelled successfully' };
  }

  /**
   * 특정 업체의 예약 가능한 시간대 조회
   */
  async getAvailableTimeSlots(vendorId: string, date: string) {
    // 업체 존재 확인
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    // 날짜를 Date 객체로 변환
    const dateObj = new Date(date);

    // 해당 날짜의 이미 예약된 시간 조회
    const bookedReservations = await this.reservationRepository.find({
      where: {
        vendor_id: vendorId,
        reservation_date: dateObj,
        status: ReservationStatus.CONFIRMED,
      },
      select: ['reservation_time'],
    });

    const bookedTimes = bookedReservations.map((r) => r.reservation_time);

    // 09:00 ~ 20:00까지 1시간 단위로 시간 슬롯 생성
    const allTimeSlots: Array<{ time: string; available: boolean }> = [];
    for (let hour = 9; hour <= 20; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      allTimeSlots.push({
        time: timeSlot,
        available: !bookedTimes.includes(timeSlot),
      });
    }

    return {
      vendor_id: vendorId,
      date,
      time_slots: allTimeSlots,
    };
  }

  /**
   * 관계 데이터를 포함한 예약 조회 (내부용)
   */
  private async getReservationWithRelations(reservationId: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['vendor', 'plan'],
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return this.formatReservation(reservation);
  }

  /**
   * 예약 데이터 포맷팅
   */
  private formatReservation(reservation: Reservation) {
    return {
      id: reservation.id,
      vendor: {
        id: reservation.vendor?.id,
        name: reservation.vendor?.name,
        category: reservation.vendor?.category,
        address: reservation.vendor?.address,
        phone: reservation.vendor?.phone,
        thumbnail_url: reservation.vendor?.thumbnail_url,
      },
      plan: reservation.plan
        ? {
            id: reservation.plan.id,
            title: reservation.plan.title,
          }
        : null,
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
   * 예약 목록 데이터 포맷팅
   */
  private formatReservations(reservations: Reservation[]) {
    return reservations.map((reservation) => this.formatReservation(reservation));
  }
}

