import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { PlanItem } from './plan-item.entity';
import { Reservation } from './reservation.entity';

@Entity('plan')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'varchar', default: '나의 웨딩' })
  title: string;

  @Column({ type: 'int', nullable: true })
  total_budget: number;

  @Column({ type: 'boolean', default: false })
  is_ai_generated: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PlanItem, (planItem) => planItem.plan)
  plan_items: PlanItem[];

  @OneToMany(() => Reservation, (reservation) => reservation.plan)
  reservations: Reservation[];
}
