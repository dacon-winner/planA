/**
 * Modal Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 기본 Modal 컴포넌트
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건) - 모든 색상 토큰 사용
 * [✓] 인라인 스타일 0건 - 모든 스타일 styles.ts로 분리
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 * [✓] 그림자 효과 추가 (피그마 Drop shadow 준수)
 */

/**
 * Modal Components Export
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 *
 * 순환참조 방지를 위해 Modal 컴포넌트는 별도 파일로 분리됨
 */

// 피그마 기반 모달 컴포넌트들 export
export { Modal } from './Modal';
export { PlanAddModal } from './PlanAddModal';
export { ErrorModal } from './ErrorModal';
export { NewPlanModal, NewPlanModalContent } from './NewPlanModal';
export { EditModal, EditModalContent } from './EditModal';
export { AddToPlanModal } from './AddToPlanModal';
