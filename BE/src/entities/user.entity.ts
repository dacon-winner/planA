import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Plan } from './plan.entity';
import { Reservation } from './reservation.entity';
import { PersonalSchedule } from './personal-schedule.entity';
import { UserPolicyScrap } from './user-policy-scrap.entity';
import { Review } from './review.entity';
import { AiLog } from './ai-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password_hash: string;

  @Column({ type: 'varchar', default: 'EMAIL' })
  provider: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'date' })
  wedding_date: Date;

  @Column({ type: 'varchar' })
  preferred_region: string;

  @Column({ type: 'int' })
  budget_limit: number;

  @Column({ type: 'boolean', default: true })
  is_push_on: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToMany(() => Plan, (plan) => plan.user)
  plans: Plan[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => PersonalSchedule, (schedule) => schedule.user)
  personal_schedules: PersonalSchedule[];

  @OneToMany(() => UserPolicyScrap, (scrap) => scrap.user)
  policy_scraps: UserPolicyScrap[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => AiLog, (aiLog) => aiLog.user)
  ai_logs: AiLog[];
}
