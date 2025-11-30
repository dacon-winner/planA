import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('ai_resource')
export class AiResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  vendor_id: string;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', default: '{}' })
  metadata: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @ManyToOne(() => Vendor, (vendor) => vendor.ai_resources, { nullable: true })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}
