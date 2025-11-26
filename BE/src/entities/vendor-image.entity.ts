import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('vendor_image')
export class VendorImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  vendor_id: string;

  @Column({ type: 'varchar' })
  image_url: string;

  @Column({ type: 'varchar', default: 'DETAIL' })
  role: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  // Relations
  @ManyToOne(() => Vendor, (vendor) => vendor.images)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
