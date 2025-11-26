import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPolicyScrap } from './user-policy-scrap.entity';

@Entity('policy_info')
export class PolicyInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  subtitle: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'json', default: '[]' })
  badges: string[];

  @Column({ type: 'varchar', nullable: true })
  benefit_summary: string;

  @Column({ type: 'varchar', nullable: true })
  apply_url: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail_url: string;

  // Relations
  @OneToMany(() => UserPolicyScrap, (scrap) => scrap.policy_info)
  user_scraps: UserPolicyScrap[];
}
