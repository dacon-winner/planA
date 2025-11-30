import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';

/**
 * 스드메 추가 비용 상세 엔티티
 * - vendor와 1:1 관계
 * - 드레스/메이크업/스튜디오 업체의 추가 비용 정보 관리
 */
@Entity('vendor_cost_detail')
export class VendorCostDetail {
  @PrimaryColumn('uuid')
  vendor_id: string;

  // 드레스/메이크업
  @Column({ type: 'int', default: 0 })
  fitting_fee: number; // 피팅비

  @Column({ type: 'int', default: 0 })
  helper_fee: number; // 헬퍼비

  @Column({ type: 'int', default: 0 })
  early_start_fee: number; // 얼리비

  // 스튜디오
  @Column({ type: 'int', default: 0 })
  original_file_fee: number; // 원본비

  @Column({ type: 'int', default: 0 })
  modified_file_fee: number; // 수정비

  // 공통
  @Column({ type: 'int', default: 0 })
  valet_fee: number; // 발렛비

  @Column({ type: 'int', default: 0 })
  after_party_fee: number; // 피로연 비용

  @Column({ type: 'text', nullable: true })
  cancellation_policy: string; // 위약금 규정

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relations
  @OneToOne(() => Vendor, (vendor) => vendor.cost_detail)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;
}

