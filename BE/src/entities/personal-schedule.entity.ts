import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('personal_schedule')
export class PersonalSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  memo: string;

  @Column({ type: 'date' })
  schedule_date: Date;

  @Column({ type: 'time', nullable: true })
  schedule_time: string;

  @Column({ type: 'varchar', default: '#E1E1E1' })
  color_hex: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.personal_schedules)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
