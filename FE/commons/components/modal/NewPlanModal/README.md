# NewPlanModal 컴포넌트

피그마 노드ID: 4188:8191

## 개요
새 플랜 만들기 모달 컴포넌트입니다. 플랜 이름 입력과 생성 방법 선택 기능을 제공합니다.

## 사용법
```typescript
import { NewPlanModal } from '@/commons/components/modal';

<NewPlanModal
  onManualAdd={() => console.log('수동 추가')}
  onAIGenerate={(name) => console.log(`${name} AI 생성`)}
/>
```

