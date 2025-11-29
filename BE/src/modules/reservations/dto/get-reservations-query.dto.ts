import { IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { ReservationStatus } from './update-reservation.dto';

/**
 * 예약 목록 조회 Query DTO
 */
export class GetReservationsQueryDto {
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @IsOptional()
  @IsUUID()
  vendor_id?: string;

  @IsOptional()
  @IsDateString()
  from_date?: string; // 시작 날짜

  @IsOptional()
  @IsDateString()
  to_date?: string; // 종료 날짜
}

