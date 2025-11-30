# ErrorModal 컴포넌트

피그마 노드ID: 4188:8190

## 개요
에러 메시지 표시 모달 컴포넌트입니다. ShieldAlert 아이콘과 에러 메시지를 표시합니다.

## 사용법
```typescript
import { ErrorModal } from '@/commons/components/modal';

<ErrorModal
  message="커스텀 에러 메시지"
  onConfirm={() => console.log('확인됨')}
/>
```


