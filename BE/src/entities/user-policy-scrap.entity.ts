import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { PolicyInfo } from './policy-info.entity';

@Entity('user_policy_scrap')
@Index(['user_id', 'policy_info_id'], { unique: true })
export class UserPolicyScrap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  policy_info_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.policy_scraps)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PolicyInfo, (policyInfo) => policyInfo.user_scraps)
  @JoinColumn({ name: 'policy_info_id' })
  policy_info: PolicyInfo;
}
