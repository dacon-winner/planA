# Dropdown 컴포넌트

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Dropdown |
| **위치** | `commons/components/dropdown/` |
| **작성일** | 2025-11-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
사용자가 여러 옵션 중 하나를 선택할 수 있는 드롭다운 인터페이스를 제공합니다. 피그마 디자인 시스템을 기반으로 일관된 UI/UX를 유지하면서 선택 기능을 구현합니다.

### 사용 예시
```typescript
import { Dropdown } from '@/commons/components/dropdown';

function Example() {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  return (
    <Dropdown
      value={selectedValue}
      options={options}
      onChange={setSelectedValue}
      placeholder="선택하세요"
      variant="default"
    />
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `value` | `string` | 현재 선택된 값 | `"option1"` |
| `options` | `Array<{value: string, label: string}>` | 드롭다운 옵션 배열 | `[{value: "opt1", label: "옵션1"}]` |
| `onChange` | `(value: string) => void` | 값 변경 핸들러 | `(value) => setValue(value)` |

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `placeholder` | `string` | `"선택하세요"` | 선택되지 않았을 때 표시되는 텍스트 | `"항목을 선택하세요"` |
| `disabled` | `boolean` | `false` | 비활성화 상태 | `true` |

### Type Definitions

```typescript
interface DropdownProps extends Omit<PressableProps, "style"> {
  // Required
  value: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChange: (value: string) => void;

  // Optional
  placeholder?: string;
  disabled?: boolean;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.brown['brown-6']    // 텍스트 색상 (#524a4e)
colors.brown['brown-2']    // 테두리 색상 (#d6cfcf)
colors.root.brand          // 선택된 상태 색상 (#ff5c8d)
colors.black['black-1']    // 배경색 (#ffffff)
colors.black['black-6']    // 비활성화 색상 (#bfbfbf)
```

#### Typography
```typescript
mobileTypography.s.normal  // 본문 텍스트 (14px, 400, 20px line-height)
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Trigger Button Styles */
  'triggerDefault': {
    // 기본 상태 트리거 버튼
    width: 285,
    height: 32,
    borderRadius: 8,
    borderColor: colors.brown['brown-2'],
  },

  'triggerSelected': {
    // 선택된 상태 트리거 버튼
    borderColor: colors.root.brand,
  },

  'triggerDisabled': {
    // 비활성화 상태 트리거 버튼
    backgroundColor: colors.black['black-6'],
  },

  /* Dropdown Menu Styles */
  'overlay': {
    // 모달 오버레이
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  'dropdownContainer': {
    // 드롭다운 메뉴 컨테이너
    backgroundColor: colors.black['black-1'],
    borderRadius: 8,
    shadowOpacity: 0.25,
  },

  /* Option Styles */
  'optionDefault': {
    // 기본 옵션
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  'optionSelected': {
    // 선택된 옵션
    backgroundColor: colors.root.brand,
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
const [isOpen, useState] = useState<boolean>(false); // 드롭다운 열림/닫힘 상태
```

### 상태 설명
- `isOpen`: 드롭다운 메뉴의 열림/닫힘 상태를 관리합니다. 사용자가 트리거 버튼을 클릭할 때마다 토글됩니다.

---

## 동작 명세

### 사용자 인터랙션

1. **드롭다운 토글**
   - 트리거: 사용자가 드롭다운 버튼을 클릭할 때
   - 동작: 드롭다운 메뉴가 트리거 버튼 바로 아래에 열리거나 닫힙니다
   - 결과: `isOpen` 상태가 토글되고, 메뉴가 표시되거나 숨겨집니다

2. **옵션 선택**
   - 트리거: 사용자가 드롭다운 메뉴의 옵션을 클릭할 때
   - 동작: 해당 옵션이 선택되고 드롭다운 메뉴가 닫힙니다
   - 결과: `onChange` 콜백이 호출되고, 선택된 값이 업데이트됩니다

### 생명주기

```typescript
useEffect(() => {
  // 컴포넌트 마운트 시 초기 상태 설정

  return () => {
    // 언마운트 시 정리 (필요시)
  };
}, []);
```

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<Pressable
  accessible={true}
  accessibilityRole="button"
  accessibilityState={{
    expanded: isOpen,
    disabled,
  }}
  accessibilityLabel={`${displayText}, ${isOpen ? "열림" : "닫힘"}`}
/>
```

### 키보드 네비게이션
- Tab 키: 드롭다운 트리거 버튼으로 포커스 이동
- Enter/Space 키: 드롭다운 토글
- 화살표 키: 메뉴가 열렸을 때 옵션 간 이동 (향후 구현 예정)
- Escape 키: 드롭다운 메뉴 닫기 (향후 구현 예정)

---

## 에러 처리

### 예상 에러 케이스

1. **options 배열이 비어있는 경우**
   - 발생 조건: `options` prop이 빈 배열일 때
   - 처리 방법: 플레이스홀더 텍스트만 표시하고 클릭 비활성화
   - 사용자 피드백: 비활성화된 상태로 표시

2. **유효하지 않은 value**
   - 발생 조건: `value`가 `options` 배열의 어떤 값과도 일치하지 않을 때
   - 처리 방법: 플레이스홀더 텍스트 표시
   - 사용자 피드백: 선택되지 않은 상태로 표시

---

## 테스트

### 단위 테스트

```typescript
describe('Dropdown', () => {
  it('should render correctly', () => {
    // 기본 렌더링 테스트
  });

  it('should open dropdown when clicked', () => {
    // 드롭다운 열림 테스트
  });

  it('should select option when clicked', () => {
    // 옵션 선택 테스트
  });

  it('should close dropdown when option selected', () => {
    // 옵션 선택 후 닫힘 테스트
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링
- [ ] 드롭다운 토글 기능
- [ ] 옵션 선택 기능
- [ ] 외부 클릭으로 닫기
- [ ] 키보드 접근성
- [ ] 비활성화 상태
- [ ] 다양한 variant 테스트

---

## 성능 고려사항

### 최적화 포인트
- Modal 컴포넌트 사용으로 효율적인 렌더링
- ScrollView를 통한 긴 옵션 목록 처리
- 필요한 경우 옵션 가상화 고려 (향후)

### 주의사항
- options 배열이 매우 클 경우 성능 저하 가능성
- Modal 사용으로 z-index 관리 필요
- 메모리 누수 방지를 위한 이벤트 리스너 정리

---

## 의존성

### 필수 라이브러리
```json
{
  "react": "^18.0.0",
  "react-native": "0.81.5"
}
```

### 내부 의존성
- `@/commons/enums/color` - 색상 토큰
- `@/commons/enums/typography` - 타이포그래피 토큰

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-29 | 초기 버전 | - |

---

## 참고 자료
- [피그마 디자인](https://www.figma.com/design/...)
- [React Native Modal 문서](https://reactnative.dev/docs/modal)
- [React Native Pressable 문서](https://reactnative.dev/docs/pressable)
