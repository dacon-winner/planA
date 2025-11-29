# 컴포넌트 명세서

> 이 문서는 Search Bar 컴포넌트의 명세서입니다.

## 컴포넌트명: SearchBar

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | SearchBar |
| **위치** | `commons/components/search-bar/` |
| **작성일** | 2025-01-27 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |
| **피그마 노드ID** | 4183:4908 |

---

## 개요

### 목적
사용자가 업체명 또는 서비스를 검색할 수 있는 검색 바 컴포넌트입니다. 검색 아이콘과 입력 필드를 포함하며, 피그마 디자인 시스템을 기반으로 구현되었습니다.

### 사용 예시
```typescript
import { SearchBar } from '@/commons/components/search-bar';

function Example() {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchBar
      placeholder="업체명 또는 서비스로 검색"
      value={searchText}
      onChangeText={setSearchText}
    />
  );
}
```

---

## Props 명세

### Required Props
없음

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `placeholder` | `string` | `"업체명 또는 서비스로 검색"` | 입력 필드의 placeholder 텍스트 | `"검색어를 입력하세요"` |
| `value` | `string` | `""` | 입력 필드의 값 | `"카페"` |
| `onChangeText` | `(text: string) => void` | `undefined` | 텍스트 변경 시 호출되는 콜백 함수 | `(text) => setSearchText(text)` |

### Type Definitions

```typescript
interface SearchBarProps extends Omit<TextInputProps, "style"> {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
blackColors["black-1"]    // 배경색: #ffffff
blackColors["black-13"]   // 그림자 색상: #000000
brownColors["brown-6"]    // 텍스트/아이콘 색상: #524a4e
```

#### Typography
```typescript
typography.m.normal.fontSize      // 16px
typography.m.normal.fontWeight    // 400
letterSpacing: -0.3125
lineHeight: 19.09375
```

#### Spacing
```typescript
width: 345px
height: 50px
borderRadius: 25px
paddingHorizontal: 12px
gap: 8px  // 아이콘과 텍스트 간격
```

#### Shadow
```typescript
// Drop shadow (피그마: X:0, Y:0, Blur:20, Spread:0, Color:#000000 10%)
shadowColor: blackColors["black-13"]  // #000000
shadowOffset: { width: 0, height: 0 }
shadowOpacity: 0.1  // 10% opacity
shadowRadius: 20    // Blur: 20
elevation: 10       // Android shadow
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Container */
  'container': {
    width: 345,
    height: 50,
    backgroundColor: blackColors["black-1"],
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    // Shadow properties
    shadowColor: blackColors["black-13"],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  
  /* Icon */
  'iconContainer': {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  
  'icon': {
    color: brownColors["brown-6"],
  },
  
  /* Text Input */
  'textInput': {
    flex: 1,
    fontSize: typography.m.normal.fontSize,
    fontWeight: typography.m.normal.fontWeight,
    letterSpacing: -0.3125,
    lineHeight: 19.09375,
    color: brownColors["brown-6"],
    padding: 0,
  },
  
  'placeholderText': {
    color: brownColors["brown-6"],
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
const [isFocused, setIsFocused] = useState(false);
```

### 상태 설명
- `isFocused`: 입력 필드의 포커스 상태를 관리합니다. 현재는 내부적으로만 사용되며, 향후 포커스 상태에 따른 스타일 변경이 필요할 경우 활용할 수 있습니다.

---

## 동작 명세

### 사용자 인터랙션

1. **텍스트 입력**
   - 트리거: 사용자가 검색 바에 텍스트를 입력할 때
   - 동작: `onChangeText` 콜백이 호출되어 부모 컴포넌트의 상태가 업데이트됨
   - 결과: 입력된 텍스트가 화면에 표시됨

2. **포커스 이벤트**
   - 트리거: 사용자가 검색 바를 터치하거나 포커스할 때
   - 동작: `onFocus` 이벤트가 발생하여 내부 `isFocused` 상태가 `true`로 변경됨
   - 결과: 포커스 상태가 관리됨 (향후 스타일 변경에 활용 가능)

3. **블러 이벤트**
   - 트리거: 사용자가 검색 바에서 포커스를 잃을 때
   - 동작: `onBlur` 이벤트가 발생하여 내부 `isFocused` 상태가 `false`로 변경됨
   - 결과: 포커스 상태가 해제됨

### 생명주기
이 컴포넌트는 생명주기 훅을 사용하지 않습니다. 모든 상태는 부모 컴포넌트에서 관리됩니다.

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<TextInput
  accessible={true}
  accessibilityLabel={placeholder}
  accessibilityRole="searchbox"
/>
```

### 키보드 네비게이션
- Tab 키: 검색 바로 포커스 이동
- Enter 키: 검색 실행 (부모 컴포넌트에서 처리)

---

## 에러 처리

### 예상 에러 케이스

1. **텍스트 입력 제한**
   - 발생 조건: 특정 길이 이상의 텍스트 입력
   - 처리 방법: 부모 컴포넌트에서 `maxLength` prop을 통해 제한 가능
   - 사용자 피드백: TextInput의 기본 동작에 따라 입력이 제한됨

2. **빈 값 처리**
   - 발생 조건: 검색어가 비어있는 상태
   - 처리 방법: 부모 컴포넌트에서 검색 실행 전 유효성 검사
   - 사용자 피드백: 부모 컴포넌트에서 처리

---

## 테스트

### 단위 테스트

```typescript
describe('SearchBar', () => {
  it('should render correctly', () => {
    // 테스트 코드
  });
  
  it('should handle text input', () => {
    // 테스트 코드
  });
  
  it('should handle focus events', () => {
    // 테스트 코드
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링
- [ ] Props 변경 처리
- [ ] 사용자 인터랙션 (텍스트 입력)
- [ ] 포커스/블러 이벤트
- [ ] 접근성

---

## 성능 고려사항

### 최적화 포인트
- memo 사용 여부: 현재 사용하지 않음 (필요시 추가 가능)
- useMemo 사용: 사용하지 않음
- useCallback 사용: 사용하지 않음

### 주의사항
- 렌더링 횟수 최소화: 부모 컴포넌트에서 `value`와 `onChangeText`를 적절히 관리해야 함
- 불필요한 re-render 방지: 필요시 `React.memo`로 감싸서 최적화 가능
- 메모리 누수 방지: 이벤트 리스너는 TextInput의 기본 동작에 따라 자동으로 정리됨

---

## 의존성

### 필수 라이브러리
```json
{
  "react-native": "0.81.5",
  "lucide-react-native": "^0.555.0"
}
```

### 내부 의존성
- `@/commons/enums/color` - 색상 토큰
- `@/commons/enums/typography` - 타이포그래피 토큰

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-01-27 | 초기 버전 | - |

---

## 참고 자료
- [피그마 디자인](https://www.figma.com/file/...)
- [lucide-react-native 문서](https://lucide.dev/guide/packages/lucide-react-native)

