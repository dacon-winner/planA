import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { PlanItem } from './plan-item.entity';

@Entity('service_item')
export class ServiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  vendor_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail_url: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'boolean', default: false })
  is_package: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Vendor, (vendor) => vendor.service_items)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @OneToMany(() => PlanItem, (planItem) => planItem.service_item)
  plan_items: PlanItem[];
}
