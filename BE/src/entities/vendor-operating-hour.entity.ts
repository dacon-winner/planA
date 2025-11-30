import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

/**
 * 업체 영업시간 엔티티
 * - vendor와 N:1 관계
 * - 요일별 영업시간을 정규화하여 관리
 */
@Entity('vendor_operating_hour')
export class VendorOperatingHour {
  @PrimaryColumn('uuid')
  vendor_id: string;

  @PrimaryColumn('int')
  day_of_week: number; // 0:일요일 ~ 6:토요일

  @Column({ type: 'time', nullable: true })
  open_time: string;

  @Column({ type: 'time', nullable: true })
  close_time: string;

  @Column({ type: 'boolean', default: false })
  is_holiday: boolean;

  // Relations
  @ManyToOne(() => Vendor, (vendor) => vendor.operating_hours)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
