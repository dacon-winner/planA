# 컴포넌트 명세서 템플릿

> 이 문서는 새로운 컴포넌트를 작성할 때 사용하는 표준 템플릿입니다.

## 컴포넌트명: ToastMessage

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | ToastMessage |
| **위치** | `commons/components/toast-message/` |
| **작성일** | 2025-11-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
화면 하단에 표시되는 일시적인 알림 메시지를 제공하는 토스트 컴포넌트입니다. 성공(success)과 오류(error) 두 가지 타입의 메시지를 지원합니다.

### 사용 예시
```typescript
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/commons/components/toast-message';

// App.tsx 최상위에서 설정
<Toast config={toastConfig} />

// 사용 예시
function Example() {
  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: '저장이 완료되었습니다.',
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: 'error',
      text1: '오류가 발생했습니다.',
    });
  };

  return (
    <View>
      <Button title="성공 메시지" onPress={showSuccessToast} />
      <Button title="오류 메시지" onPress={showErrorToast} />
    </View>
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `type` | `'success' \| 'error'` | 토스트 메시지 타입 | `'success'` |
| `text1` | `string` | 표시할 메시지 텍스트 | `'저장이 완료되었습니다.'` |

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `position` | `'top' \| 'bottom'` | `'bottom'` | 토스트 표시 위치 | `'bottom'` |
| `visibilityTime` | `number` | `4000` | 표시 지속 시간 (ms) | `3000` |
| `autoHide` | `boolean` | `true` | 자동 숨김 여부 | `true` |
| `topOffset` | `number` | `0` | 상단 여백 | `60` |
| `bottomOffset` | `number` | `24` | 하단 여백 (Bottom Tab 고려) | `24` |

### Type Definitions

```typescript
interface ToastMessageProps {
  type: 'success' | 'error';
  text1: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.root.brand        // 배경색 (#ff5c8d)
colors.black['black-1']  // 텍스트 및 아이콘 색상 (#ffffff)
```

#### Typography
```typescript
// 직접 스타일 적용 (피그마 기반)
fontSize: 12px
fontWeight: '700'
lineHeight: 18px
```

### 스타일 클래스

```typescript
// styles.ts
export const toastMessageStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.root.brand,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    color: colors.black['black-1'],
    textAlign: 'center',
  },
});
```

---

## 상태 관리

### 내부 상태
컴포넌트는 react-native-toast-message 라이브러리의 상태 관리를 사용하므로 별도의 내부 상태를 관리하지 않습니다.

---

## 동작 명세

### 사용자 인터랙션

1. **토스트 표시**
   - 트리거: `Toast.show()` 호출 시
   - 동작: 화면 하단에 토스트 메시지가 표시됨
   - 결과: 설정된 시간 후 자동으로 사라짐

2. **토스트 숨김**
   - 트리거: 자동 타이머 또는 수동으로 숨김
   - 동작: fade out 애니메이션으로 사라짐
   - 결과: 토스트가 완전히 제거됨

### 생명주기
라이브러리의 내부 생명주기를 따르므로 별도의 useEffect가 필요하지 않습니다.

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
// 라이브러리에서 자동으로 처리됨
accessible={true}
accessibilityLabel={text1}
```

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 타입**
   - 발생 조건: 정의되지 않은 type 값 사용
   - 처리 방법: 기본 success 타입으로 표시
   - 사용자 피드백: 정상 동작

---

## 테스트

### 단위 테스트

```typescript
describe('ToastMessage', () => {
  it('should render success toast correctly', () => {
    // success 타입 토스트 렌더링 테스트
  });

  it('should render error toast correctly', () => {
    // error 타입 토스트 렌더링 테스트
  });

  it('should display custom text', () => {
    // 텍스트 표시 테스트
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링 (success 타입)
- [ ] 기본 렌더링 (error 타입)
- [ ] 텍스트 표시
- [ ] 아이콘 표시
- [ ] 자동 숨김 동작
- [ ] 위치 조정 (bottomOffset)

---

## 성능 고려사항

### 최적화 포인트
- 라이브러리의 내부 최적화 사용
- 불필요한 re-render 방지

### 주의사항
- 토스트는 일시적인 UI이므로 메모리 누수에 유의

---

## 의존성

### 필수 라이브러리
```json
{
  "lucide-react-native": "^0.555.0",
  "react-native-toast-message": "^2.3.3"
}
```

### 내부 의존성
- `@/commons/enums/color`
- `@/commons/enums/typography`

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-29 | 초기 버전 | - |

---

## 참고 자료
- [Figma 디자인 - Toast Message](https://www.figma.com/design/fk83ig24)
- [react-native-toast-message 라이브러리](https://github.com/calintamas/react-native-toast-message)
- [lucide-react-native 아이콘](https://lucide.dev/)
