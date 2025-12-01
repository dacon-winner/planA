import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plan } from './plan.entity';
import { Vendor } from './vendor.entity';
import { ServiceItem } from './service-item.entity';

export enum ItemSource {
  AI_RECOMMEND = 'AI_RECOMMEND',
  USER_SELECT = 'USER_SELECT',
}

@Entity('plan_item')
export class PlanItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  plan_id: string;

  @Column('uuid')
  vendor_id: string;

  @Column({ type: 'uuid', nullable: true })
  service_item_id: string | null;

  @Column({
    type: 'enum',
    enum: ItemSource,
    default: ItemSource.AI_RECOMMEND,
  })
  source: ItemSource;

  @Column({ type: 'text', nullable: true })
  selection_reason: string;

  @Column({ type: 'int', default: 0 })
  order_index: number;

  @Column({ type: 'boolean', default: false })
  is_confirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Plan, (plan) => plan.plan_items)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @ManyToOne(() => Vendor, (vendor) => vendor.plan_items)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @ManyToOne(() => ServiceItem, (serviceItem) => serviceItem.plan_items, {
    nullable: true,
  })
  @JoinColumn({ name: 'service_item_id' })
  service_item: ServiceItem;
}
