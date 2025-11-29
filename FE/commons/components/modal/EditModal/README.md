# EditModal 컴포넌트

피그마 노드ID: 4188:8192

## 개요
정보 수정 모달 컴포넌트입니다. 일정 정보 표시와 유지/수정 선택 기능을 제공합니다.

## 사용법
```typescript
import { EditModal } from '@/commons/components/modal';

<EditModal
  onKeep={() => console.log('유지됨')}
  onEdit={() => console.log('수정됨')}
/>
```

