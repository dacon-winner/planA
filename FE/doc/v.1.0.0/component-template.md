# 컴포넌트 명세서 템플릿

> 이 문서는 새로운 컴포넌트를 작성할 때 사용하는 표준 템플릿입니다.

## 컴포넌트명: [ComponentName]

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | [ComponentName] |
| **위치** | `commons/components/[category]/[ComponentName]/` |
| **작성일** | YYYY-MM-DD |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | 🚧 작업중 / ✅ 완료 / 📝 검토중 |

---

## 개요

### 목적
이 컴포넌트가 해결하는 문제나 제공하는 기능을 간단히 설명합니다.

### 사용 예시
```typescript
import { ComponentName } from '@/commons/components/[category]/ComponentName';

function Example() {
  return (
    <ComponentName
      prop1="value1"
      prop2="value2"
    />
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `prop1` | `string` | prop1에 대한 설명 | `"example"` |
| `prop2` | `number` | prop2에 대한 설명 | `42` |

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `optionalProp` | `boolean` | `false` | 선택적 prop 설명 | `true` |
| `onPress` | `() => void` | `undefined` | 콜백 함수 설명 | `() => console.log('pressed')` |

### Type Definitions

```typescript
interface ComponentNameProps {
  // Required
  prop1: string;
  prop2: number;
  
  // Optional
  optionalProp?: boolean;
  onPress?: () => void;
  
  // Style
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.primary[400]    // 주요 색상
colors.secondary[100]  
colors.tertiary[500]   // 강조 색상
```

#### Typography
```typescript
fontSize['mobile-m']      // 본문 텍스트
fontSize['mobile-l-bold'] // 제목 텍스트
```

#### Spacing
```typescript
spacing.md  // 내부 여백
spacing.lg  // 외부 여백
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Layout */
  'container': {
    // 컨테이너 스타일
  },
  
  /* Components */
  'element': {
    // 요소 스타일
  },
  
  /* States */
  'element-disabled': {
    // 비활성 상태 스타일
  },
  
  'element-active': {
    // 활성 상태 스타일
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
const [state1, setState1] = useState<Type>(initialValue);
const [state2, setState2] = useState<Type>(initialValue);
```

### 상태 설명
- `state1`: 상태 1에 대한 설명
- `state2`: 상태 2에 대한 설명

---

## 동작 명세

### 사용자 인터랙션

1. **인터랙션 1**
   - 트리거: 사용자가 X를 할 때
   - 동작: Y가 발생함
   - 결과: Z 상태로 변경

2. **인터랙션 2**
   - 트리거: ...
   - 동작: ...
   - 결과: ...

### 생명주기

```typescript
useEffect(() => {
  // 마운트 시 실행
  
  return () => {
    // 언마운트 시 정리
  };
}, [dependencies]);
```

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<Component
  accessible={true}
  accessibilityLabel="컴포넌트 설명"
  accessibilityHint="사용 방법 힌트"
  accessibilityRole="button"
/>
```

### 키보드 네비게이션
- Tab 키: ...
- Enter 키: ...

---

## 에러 처리

### 예상 에러 케이스

1. **에러 케이스 1**
   - 발생 조건: ...
   - 처리 방법: ...
   - 사용자 피드백: ...

2. **에러 케이스 2**
   - 발생 조건: ...
   - 처리 방법: ...
   - 사용자 피드백: ...

---

## 테스트

### 단위 테스트

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // 테스트 코드
  });
  
  it('should handle prop changes', () => {
    // 테스트 코드
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링
- [ ] Props 변경 처리
- [ ] 사용자 인터랙션
- [ ] 에러 상태
- [ ] 접근성

---

## 성능 고려사항

### 최적화 포인트
- memo 사용 여부: ...
- useMemo 사용: ...
- useCallback 사용: ...

### 주의사항
- 렌더링 횟수 최소화
- 불필요한 re-render 방지
- 메모리 누수 방지
---

## 의존성

### 필수 라이브러리
```json
{
  "react-native": "0.81.5",
  "other-lib": "^1.0.0"
}
```

### 내부 의존성
- `@/commons/components/OtherComponent`
- `@/commons/enums/constants`

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | YYYY-MM-DD | 초기 버전 | - |

---

## 참고 자료
- [관련 Figma 디자인]()
- [참고한 라이브러리]()
- [관련 이슈]()

