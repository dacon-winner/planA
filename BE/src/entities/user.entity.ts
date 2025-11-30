import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Plan } from './plan.entity';
import { Reservation } from './reservation.entity';
import { PersonalSchedule } from './personal-schedule.entity';
import { UserPolicyScrap } from './user-policy-scrap.entity';
import { Review } from './review.entity';
import { AiLog } from './ai-log.entity';
import { UsersInfo } from './users-info.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  password_hash!: string;

  @Column({ type: 'varchar', default: 'EMAIL' })
  provider!: string;

  @Column({ type: 'varchar' })
  name!: string;

  // NOT NULL로 변경 (회원가입 1단계에서 필수 입력)
  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'] })
  gender!: 'MALE' | 'FEMALE' | 'OTHER';

  // NOT NULL로 변경 (회원가입 1단계에서 필수 입력)
  @Column({ type: 'varchar' })
  phone!: string;

  @Column({ type: 'boolean', default: true })
  is_push_on!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  // Relations
  @OneToMany(() => UsersInfo, (usersInfo) => usersInfo.user)
  users_info?: UsersInfo[];

  @OneToMany(() => Plan, (plan) => plan.user)
  plans?: Plan[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations?: Reservation[];

  @OneToMany(() => PersonalSchedule, (schedule) => schedule.user)
  personal_schedules?: PersonalSchedule[];

  @OneToMany(() => UserPolicyScrap, (scrap) => scrap.user)
  policy_scraps?: UserPolicyScrap[];

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @OneToMany(() => AiLog, (aiLog) => aiLog.user)
  ai_logs?: AiLog[];
}
