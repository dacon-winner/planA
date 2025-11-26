import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('vendor_venue_detail')
export class VendorVenueDetail {
  @PrimaryColumn('uuid')
  vendor_id: string;

  @Column({ type: 'varchar', nullable: true })
  hall_type: string;

  @Column({ type: 'varchar', nullable: true })
  meal_type: string;

  @Column({ type: 'int', default: 200 })
  min_guarantee: number;

  @Column({ type: 'int', default: 0 })
  meal_cost: number;

  @Column({ type: 'int', default: 0 })
  rental_fee: number;

  // Relations
  @OneToOne(() => Vendor, (vendor) => vendor.venue_detail)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
