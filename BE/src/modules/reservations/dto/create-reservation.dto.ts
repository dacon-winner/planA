import { IsString, IsUUID, IsDateString, IsOptional, IsInt, Min, Matches } from 'class-validator';

/**
 * 예약 생성 DTO
 */
export class CreateReservationDto {
  @IsUUID()
  vendor_id: string;

  @IsOptional()
  @IsUUID()
  plan_id?: string;

  @IsDateString()
  reservation_date: string; // YYYY-MM-DD 형식

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'reservation_time must be in HH:mm format',
  })
  reservation_time: string; // HH:mm 형식 (예: 09:00, 14:00)

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

