import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vendor } from './vendor.entity';
import { Plan } from './plan.entity';

export enum ReservationStatus {
  PENDING = 'PENDING',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  vendor_id: string;

  @Column({ type: 'uuid', nullable: true })
  plan_id: string;

  @Column({ type: 'date' })
  reservation_date: Date;

  @Column({ type: 'time' })
  reservation_time: string;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ type: 'boolean', default: false })
  is_deposit_paid: boolean;

  @Column({ type: 'int', default: 0 })
  deposit_amount: number;

  @Column({ type: 'varchar', nullable: true })
  visitor_name: string;

  @Column({ type: 'varchar', nullable: true })
  visitor_phone: string;

  @Column({ type: 'int', default: 2 })
  visitor_count: number;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vendor, (vendor) => vendor.reservations)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @ManyToOne(() => Plan, (plan) => plan.reservations, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;
}
