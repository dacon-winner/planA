import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { VendorVenueDetail } from './vendor-venue-detail.entity';
import { VendorOperatingHour } from './vendor-operating-hour.entity';
import { VendorCostDetail } from './vendor-cost-detail.entity';
import { VendorImage } from './vendor-image.entity';
import { ServiceItem } from './service-item.entity';
import { PlanItem } from './plan-item.entity';
import { Reservation } from './reservation.entity';
import { Review } from './review.entity';
import { AiResource } from './ai-resource.entity';

export enum VendorCategory {
  VENUE = 'VENUE',
  STUDIO = 'STUDIO',
  DRESS = 'DRESS',
  MAKEUP = 'MAKEUP',
}

@Entity('vendor')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: VendorCategory,
  })
  category: VendorCategory;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  region: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'text', nullable: true })
  introduction: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', nullable: true })
  naver_place_url: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail_url: string;

  @Column({ type: 'json', default: '[]' })
  badges: string[];

  // 시트 데이터 대응 필드
  @Column({ type: 'varchar', nullable: true })
  parking_info: string; // 예: "500대 / 혼주 6시간 무료"

  @Column({ type: 'varchar', nullable: true })
  transport_info: string; // 예: "셔틀버스 수시 운행"

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToOne(() => VendorVenueDetail, (detail) => detail.vendor)
  venue_detail: VendorVenueDetail;

  @OneToMany(() => VendorOperatingHour, (hour) => hour.vendor)
  operating_hours: VendorOperatingHour[];

  @OneToOne(() => VendorCostDetail, (detail) => detail.vendor)
  cost_detail: VendorCostDetail;

  @OneToMany(() => VendorImage, (image) => image.vendor)
  images: VendorImage[];

  @OneToMany(() => ServiceItem, (item) => item.vendor)
  service_items: ServiceItem[];

  /* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
  @OneToMany(() => PlanItem, (planItem: any) => planItem.vendor)
  plan_items: PlanItem[];

  @OneToMany(() => Reservation, (reservation: any) => reservation.vendor)
  reservations: Reservation[];

  @OneToMany(() => Review, (review: any) => review.vendor)
  reviews: Review[];

  @OneToMany(() => AiResource, (aiResource: any) => aiResource.vendor)
  ai_resources: AiResource[];
  /* eslint-enable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */
}
