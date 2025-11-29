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

### 컴포넌트 구조
- **BaseToast 제거**: 라이브러리의 `BaseToast` 컴포넌트를 사용하지 않고, 순수 `View` 컴포넌트로 구현하여 더 정확한 스타일 제어가 가능합니다.
- **간격 제어**: `gap: 8` 속성을 사용하여 아이콘과 텍스트 사이의 정확한 8px 간격을 보장합니다.
- **Shadow 지원**: iOS와 Android 모두에서 shadow 효과를 지원합니다.
  - iOS: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` 사용
  - Android: `elevation` 사용
- **색상 토큰**: 프로젝트의 색상 토큰 시스템을 사용하여 일관성 있는 디자인을 유지합니다.

### 사용 예시
```typescript
import ToastLib from 'react-native-toast-message';
import { toastConfig, Toast } from '@/commons/components/toast-message';

// App.tsx 최상위에서 설정
<ToastLib config={toastConfig} />

// 사용 예시 1: 헬퍼 함수 사용 (권장)
function Example() {
  const showSuccessToast = () => {
    Toast.success('저장이 완료되었습니다.');
  };

  const showErrorToast = () => {
    Toast.error('오류가 발생했습니다.');
  };

  return (
    <View>
      <Button title="성공 메시지" onPress={showSuccessToast} />
      <Button title="오류 메시지" onPress={showErrorToast} />
    </View>
  );
}

// 사용 예시 2: 직접 ToastLib 사용
function Example2() {
  const showToast = () => {
    ToastLib.show({
      type: 'success',
      text1: '저장이 완료되었습니다.',
    });
  };

  return <Button title="토스트 표시" onPress={showToast} />;
}
```

---

## Props 명세

### Toast 헬퍼 함수 (권장)

#### Toast.success()
성공 메시지를 표시하는 헬퍼 함수입니다.

```typescript
Toast.success(message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>)
```

**파라미터:**
- `message` (string, required): 표시할 메시지 텍스트
- `options` (optional): 추가 옵션 (position, bottomOffset 등)

**예시:**
```typescript
Toast.success('저장이 완료되었습니다.');
Toast.success('저장 완료', { bottomOffset: 40 });
```

#### Toast.error()
에러 메시지를 표시하는 헬퍼 함수입니다.

```typescript
Toast.error(message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>)
```

**파라미터:**
- `message` (string, required): 표시할 메시지 텍스트
- `options` (optional): 추가 옵션 (position, bottomOffset 등)

**예시:**
```typescript
Toast.error('오류가 발생했습니다.');
Toast.error('오류 발생', { bottomOffset: 40 });
```

### 기본 설정 상수

```typescript
export const TOAST_DEFAULT_CONFIG = {
  position: 'bottom' as const,
  bottomOffset: 24,
} as const;
```

### ToastLib.show() 직접 사용

라이브러리의 기본 API를 직접 사용할 수도 있습니다.

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `type` | `'success' \| 'error'` | - | 토스트 메시지 타입 | `'success'` |
| `text1` | `string` | - | 표시할 메시지 텍스트 | `'저장이 완료되었습니다.'` |
| `position` | `'top' \| 'bottom'` | `'bottom'` | 토스트 표시 위치 | `'bottom'` |
| `visibilityTime` | `number` | `4000` | 표시 지속 시간 (ms) | `3000` |
| `autoHide` | `boolean` | `true` | 자동 숨김 여부 | `true` |
| `topOffset` | `number` | `0` | 상단 여백 | `60` |
| `bottomOffset` | `number` | `24` | 하단 여백 (Bottom Tab 고려) | `24` |

### Type Definitions

```typescript
// Toast 헬퍼 함수 타입
export const Toast = {
  success: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => void;
  error: (message: string, options?: Partial<typeof TOAST_DEFAULT_CONFIG>) => void;
  show: ToastLib.show;
  hide: ToastLib.hide;
};

// 기본 설정 타입
export const TOAST_DEFAULT_CONFIG = {
  position: 'bottom' as const,
  bottomOffset: 24,
} as const;
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.root.brand        // 배경색 (#ff5c8d)
colors.black['black-1']  // 텍스트 및 아이콘 색상 (#ffffff)
colors.red['red-10']     // Shadow 색상 (#73293f)
```

#### Typography
```typescript
// 피그마 디자인 토큰 기반 정확한 값 사용
fontSize: 12.167227745056152
fontWeight: '700'
lineHeight: 17.38175392150879
letterSpacing: -0.1307026445865631
fontFamily: 'PretendardVariable'
```

#### Shadow
```typescript
// iOS Shadow
shadowColor: colors.red['red-10']  // #73293f
shadowOffset: { width: 0, height: 0 }
shadowOpacity: 0.2  // 20% opacity
shadowRadius: 20     // Blur: 20

// Android Shadow
elevation: 8
```

### 스타일 클래스

```typescript
// styles.ts
export const toastMessageStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.root.brand,
    borderRadius: 4,
    width: 345,
    height: 30,
    // Flex 레이아웃 설정
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // 아이콘과 텍스트 사이 간격 8px
    gap: 8,
    // iOS Shadow
    shadowColor: colors.red['red-10'],
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    // Android Shadow
    elevation: 8,
  },
  text: {
    fontSize: 12.167227745056152,
    fontWeight: '700',
    lineHeight: 17.38175392150879,
    letterSpacing: -0.1307026445865631,
    color: colors.black['black-1'],
    textAlign: 'center',
    fontFamily: 'PretendardVariable',
    includeFontPadding: false,
  },
});
```

---

## 상태 관리

### 내부 상태
컴포넌트는 react-native-toast-message 라이브러리의 상태 관리를 사용하므로 별도의 내부 상태를 관리하지 않습니다.

### 컴포넌트 구현 방식
- **순수 View 사용**: `BaseToast` 대신 `View` 컴포넌트를 직접 사용하여 더 정확한 스타일 제어가 가능합니다.
- **간격 제어**: `gap: 8` 속성을 사용하여 아이콘과 텍스트 사이의 정확한 간격을 보장합니다.
- **아이콘**: `lucide-react-native`의 `CircleCheck` (success)와 `ShieldAlert` (error) 아이콘을 사용합니다.

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
- `@/commons/enums/color` - 색상 토큰 사용

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.1.0 | 2025-12-XX | BaseToast 제거, 순수 View 사용으로 변경<br>- 아이콘과 텍스트 간격을 gap: 8로 정확히 조정<br>- Box shadow 추가 (iOS/Android 지원)<br>- 색상 토큰 사용 (colors.red['red-10'])<br>- Toast.success(), Toast.error() 헬퍼 함수 추가<br>- TOAST_DEFAULT_CONFIG 상수 추가 | - |
| 1.0.0 | 2025-11-29 | 초기 버전 | - |

---

## 참고 자료
- [Figma 디자인 - Toast Message](https://www.figma.com/design/fk83ig24)
- [react-native-toast-message 라이브러리](https://github.com/calintamas/react-native-toast-message)
- [lucide-react-native 아이콘](https://lucide.dev/)
