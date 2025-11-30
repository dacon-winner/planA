# PlanAddModal 컴포넌트

피그마 노드ID: 4188:8189

## 개요
내 플랜에 추가하기 모달 컴포넌트입니다. 플랜 선택과 일정 정보 표시 기능을 제공합니다.

## 사용법
```typescript
import { PlanAddModal } from '@/commons/components/modal';

<PlanAddModal
  onConfirm={() => console.log('플랜 추가됨')}
  onCancel={() => console.log('취소됨')}
/>
```


