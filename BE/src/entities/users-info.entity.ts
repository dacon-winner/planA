import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Plan } from './plan.entity';

/**
 * 사용자 상세 정보 엔티티
 * - users 테이블과 N:1 관계
 * - 한 명의 사용자가 여러 개의 상세 정보를 가질 수 있음
 * - 회원가입 2단계에서 입력되는 정보들을 관리
 * - 결혼 계획과 관련된 핵심 정보 포함
 */
@Entity('users_info')
export class UsersInfo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // users 테이블과의 N:1 관계 (FK, UNIQUE 제거)
  @Column('uuid')
  user_id!: string;

  // 메인 플랜 여부 (한 유저당 하나만 true)
  @Column({ type: 'boolean', default: false })
  is_main_plan!: boolean;

  // 결혼 예정일 (2단계 입력)
  @Column({ type: 'date', nullable: true })
  wedding_date!: Date | null;

  // 선호 지역 (2단계 입력)
  @Column({ type: 'varchar', nullable: true })
  preferred_region!: string | null;

  // 총 예산 (2단계 입력)
  @Column({ type: 'int', nullable: true })
  budget_limit!: number | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.users_info)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToOne(() => Plan, (plan) => plan.users_info)
  plan?: Plan;
}
