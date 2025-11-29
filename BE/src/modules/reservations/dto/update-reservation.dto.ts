import { IsString, IsDateString, IsOptional, IsInt, Min, Matches, IsEnum } from 'class-validator';

/**
 * 예약 상태 ENUM
 */
export enum ReservationStatus {
  PENDING = 'PENDING',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

/**
 * 예약 수정 DTO
 */
export class UpdateReservationDto {
  @IsOptional()
  @IsDateString()
  reservation_date?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'reservation_time must be in HH:mm format',
  })
  reservation_time?: string;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  visitor_name?: string;

  @IsOptional()
  @IsString()
  visitor_phone?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  visitor_count?: number;

  @IsOptional()
  @IsString()
  memo?: string;
}

