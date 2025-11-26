import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { VendorVenueDetail } from './vendor-venue-detail.entity';
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

  @Column({ type: 'varchar', nullable: true })
  operating_hours: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'float', default: 0 })
  naver_rating: number;

  @Column({ type: 'int', default: 0 })
  review_count: number;

  @Column({ type: 'float', default: 0 })
  total_score: number;

  @Column({ type: 'varchar', nullable: true })
  naver_place_url: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail_url: string;

  @Column({ type: 'json', default: '[]' })
  badges: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToOne(() => VendorVenueDetail, (detail) => detail.vendor)
  venue_detail: VendorVenueDetail;

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
