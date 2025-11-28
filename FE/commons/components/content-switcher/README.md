# 컴포넌트 명세서: ContentSwitcher

> 탭 메뉴와 동일한 기능의 콘텐츠 스위처 컴포넌트

## 컴포넌트명: ContentSwitcher

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | ContentSwitcher |
| **위치** | `commons/components/content-switcher/` |
| **작성일** | 2025-11-28 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
ContentSwitcher는 탭 메뉴 인터페이스를 제공하는 재사용 가능한 컴포넌트입니다. 한 번에 하나의 아이템만 선택 가능한 Single Selection 모드로 동작하며, 카테고리 선택이나 메뉴 전환 등 다양한 UI 시나리오에서 활용됩니다.

### 사용 예시
```typescript
import ContentSwitcher from '@/commons/components/content-switcher';

// 기본 사용
function BasicExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ContentSwitcher
      selectedIndex={selectedIndex}
      onSelectionChange={setSelectedIndex}
    />
  );
}

// 커스텀 아이템 사용
function CustomExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ['커피', '차', '주스', '스무디'];

  return (
    <ContentSwitcher
      items={items}
      selectedIndex={selectedIndex}
      onSelectionChange={setSelectedIndex}
      size="small"
    />
  );
}

// 비활성화 상태
function DisabledExample() {
  return (
    <ContentSwitcher
      selectedIndex={0}
      disabled={true}
    />
  );
}
```

---

## Props 명세

### Required Props
없음 (모든 Props가 선택적)

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `items` | `readonly string[]` | `["스튜디오", "드레스", "메이크업", "웨딩홀"]` | 표시할 메뉴 아이템들 | `["홈", "검색", "프로필"]` |
| `selectedIndex` | `number` | `0` | 현재 선택된 메뉴 인덱스 | `1` |
| `onSelectionChange` | `(index: number) => void` | `undefined` | 선택 변경 시 호출되는 콜백 함수 | `(index) => setSelectedIndex(index)` |
| `disabled` | `boolean` | `false` | 비활성화 상태 | `true` |
| `size` | `"small" \| "medium"` | `"medium"` | 컴포넌트 크기 변형 | `"small"` |
| `...ViewProps` | `ViewProps` | - | View 컴포넌트의 모든 Props 상속 | `style={{ margin: 10 }}` |

### Type Definitions

```typescript
interface ContentSwitcherProps extends Omit<ViewProps, "style"> {
  /** 표시할 메뉴 아이템들 */
  items?: readonly string[];
  /** 현재 선택된 메뉴 인덱스 */
  selectedIndex?: number;
  /** 선택 변경 시 호출되는 콜백 함수 */
  onSelectionChange?: (index: number) => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 컴포넌트 크기 변형 */
  size?: "small" | "medium";
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.foundationBlack[3]     // 컨테이너 배경색 (#f5f5f5)
colors.foundationBlack[1]     // Active 아이템 배경색 (#ffffff)
colors.foundationBlack[6]     // Divider 색상 (#bfbfbf)
colors.foundationBrown[4]     // 텍스트 색상 (#928d8f)
```

#### Typography
```typescript
fontSize['mobile-xs-bold']    // 탭 텍스트 스타일
fontFamily: "PretendardVariable"
```

#### Spacing
```typescript
// 컨테이너 설정
CONTAINER_WIDTH = 345
CONTAINER_PADDING = 8
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Layout */
  'container': {
    width: 345,
    padding: 4,
    backgroundColor: colors.foundationBlack[3],
    borderRadius: 16,
  },

  /* Components */
  'itemActive': {
    backgroundColor: colors.foundationBlack[1],
    borderRadius: 12,
  },

  'itemInactive': {
    backgroundColor: 'transparent',
    borderRadius: 12,
  },

  'itemSmall': {
    height: 28,
    borderRadius: 10,
  },

  'itemDisabled': {
    opacity: 0.5,
  },

  'divider': {
    width: 1,
    height: 12,
    backgroundColor: colors.foundationBlack[6],
  },

  'textActive': {
    color: colors.foundationBrown[4],
    fontSize: parseInt(fontSize["mobile-xs-bold"][0]),
  },

  'textInactive': {
    color: colors.foundationBrown[4],
    fontSize: parseInt(fontSize["mobile-xs-bold"][0]),
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
// 외부에서 props로 제어되는 상태 (내부 상태 없음)
// selectedIndex는 부모 컴포넌트에서 관리
```

### 상태 설명
- **외부 제어**: selectedIndex와 onSelectionChange를 통해 부모 컴포넌트에서 상태 관리
- **단방향 데이터 흐름**: React의 단방향 데이터 흐름 원칙 준수

---

## 동작 명세

### 사용자 인터랙션

1. **탭 선택**
   - 트리거: 사용자가 탭을 터치할 때
   - 동작: onSelectionChange 콜백 호출, selectedIndex 업데이트
   - 결과: 선택된 탭이 active 상태로 변경, 나머지는 inactive 상태로 변경

2. **Disabled 상태**
   - 트리거: disabled prop이 true일 때
   - 동작: 모든 터치 이벤트 무시
   - 결과: opacity 0.5로 시각적 비활성화 표시

3. **Size 변형**
   - 트리거: size prop 변경 시
   - 동작: small/medium 크기에 따라 스타일 적용
   - 결과: 컴포넌트 크기 변경

### 생명주기
```typescript
// 별도의 useEffect 없음 - 순수 컴포넌트
// React.memo로 최적화되어 불필요한 리렌더링 방지
export default React.memo(ContentSwitcher);
```

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<View
  accessible={true}
  accessibilityRole="tablist"
  accessibilityLabel="콘텐츠 스위처"
>
  <Pressable
    accessible={true}
    accessibilityRole="tab"
    accessibilityState={{ selected: isActive, disabled }}
    accessibilityLabel={`${item} ${isActive ? "선택됨" : "선택 안됨"} ${disabled ? "(비활성화됨)" : ""}`}
  >
    <Text>{item}</Text>
  </Pressable>
</View>
```

### 키보드 네비게이션
- Tab 키: 탭 간 이동 가능
- Enter/Space 키: 탭 선택 가능
- Focus 관리: 선택된 탭에 자동 포커스

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 인덱스**
   - 발생 조건: selectedIndex가 items 배열 범위를 벗어날 때
   - 처리 방법: Math.max(0, Math.min(selectedIndex, items.length - 1))로 클램핑
   - 사용자 피드백: 정상 동작 유지

2. **빈 아이템 배열**
   - 발생 조건: items가 빈 배열일 때
   - 처리 방법: 기본 MENU_ITEMS 사용
   - 사용자 피드백: 기본 메뉴 표시

---

## 테스트

### 단위 테스트

```typescript
describe('ContentSwitcher', () => {
  it('should render with default items', () => {
    const { getByText } = render(<ContentSwitcher />);
    expect(getByText('스튜디오')).toBeTruthy();
  });

  it('should handle selection change', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <ContentSwitcher onSelectionChange={mockOnChange} />
    );

    fireEvent.press(getByText('드레스'));
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it('should support custom items', () => {
    const customItems = ['A', 'B', 'C'];
    const { getByText } = render(<ContentSwitcher items={customItems} />);
    expect(getByText('A')).toBeTruthy();
  });

  it('should handle disabled state', () => {
    const mockOnChange = jest.fn();
    const { getByText } = render(
      <ContentSwitcher disabled={true} onSelectionChange={mockOnChange} />
    );

    fireEvent.press(getByText('드레스'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
```

### 테스트 체크리스트

- [x] 기본 렌더링
- [x] Props 변경 처리
- [x] 사용자 인터랙션 (탭 선택)
- [x] Disabled 상태
- [x] Size 변형 (small/medium)
- [x] 커스텀 아이템 지원
- [x] 접근성 (ARIA 속성)
- [x] Divider 표시 로직

---

## 성능 고려사항

### 최적화 포인트
- **memo 사용**: React.memo로 props 변경시에만 리렌더링
- **콜백 최적화**: useCallback 불필요 (단순 함수)
- **스타일 최적화**: StyleSheet.create로 스타일 사전 컴파일

### 주의사항
- 렌더링 횟수: props 변경시에만 리렌더링
- 메모리 사용: 최소한의 상태 관리 (외부 제어)
- Bundle 크기: 경량 컴포넌트 (의존성 최소)

---

## 의존성

### 필수 라이브러리
```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "@/tailwind.config.js": "프로젝트 설정"
}
```

### 내부 의존성
- `@/tailwind.config.js` - 색상 및 타이포 토큰
- `@/commons/enums/color.ts` - 색상 상수 (선택적, 토큰 우선)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-28 | 초기 버전: 기본 탭 기능, 커스텀 아이템, 크기 변형, 접근성 지원 | - |

---

## 참고 자료
- [Figma 디자인](https://www.figma.com/design/ts4rknjsqv0LEfLMbSlL5E/plan-A---FE?node-id=4116-405&t=Wm4bU4Yk8mLPSTPB-4)
- [피그마 노드 ID: 4116:405 (Content Switcher 컴포넌트)]()
- [피그마 노드 ID: 4240:458 (Divider 관련)]()

---
