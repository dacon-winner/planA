# 컴포넌트 명세서 템플릿

> 이 문서는 새로운 컴포넌트를 작성할 때 사용하는 표준 템플릿입니다.

## 컴포넌트명: Filter

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Filter |
| **위치** | `commons/components/filter/Filter/` |
| **작성일** | 2025-01-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
필터 컴포넌트는 사용자가 여러 카테고리 중에서 선택할 수 있는 토글 방식의 필터 기능을 제공합니다. "전체" 버튼과 개별 카테고리 버튼 간의 연동 로직을 통해 직관적인 사용자 경험을 제공합니다.

### 사용 예시
```typescript
import { Filter } from '@/commons/components/filter';

function Example() {
  const handleSelectionChange = (selectedItems) => {
    console.log('Selected items:', selectedItems);
  };

  return (
    <Filter
      onSelectionChange={handleSelectionChange}
      variant="inActive"
    />
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| 없음 | - | - | - |

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `initialItems` | `FilterItem[]` | `undefined` | 필터 아이템들의 초기 상태를 설정 | `[{id: '1', label: '전체', isSelected: false}]` |
| `onSelectionChange` | `(selectedItems: FilterItem[]) => void` | `undefined` | 필터 선택 상태가 변경될 때 호출되는 콜백 함수 | `(items) => console.log(items)` |
| `variant` | `'active' \| 'inActive'` | `'inActive'` | 컴포넌트의 variant 상태 | `'active'` |

### Type Definitions

```typescript
export type FilterVariant = 'active' | 'inActive';

export interface FilterItem {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface FilterProps {
  initialItems?: FilterItem[];
  onSelectionChange?: (selectedItems: FilterItem[]) => void;
  variant?: FilterVariant;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
// 직접 hex 색상 사용 (피그마 디자인 스펙 준수)
'#655D61'  // active 배경색
'#FFFFFF'  // inactive 배경색
'#D1D5DC'  // inactive border 색상
'#524A4E'  // inactive 텍스트 색상
```

#### Typography
```typescript
fontSize: 14        // 텍스트 크기
fontWeight: '500'   // Medium 폰트 웨이트
lineHeight: 20      // 라인 높이
fontFamily: 'PretendardVariable'  // 폰트 패밀리
```

#### Spacing
```typescript
height: 32          // 버튼 높이
borderRadius: 16    // 둥근 모서리
paddingHorizontal: 12  // 좌우 패딩
paddingVertical: 6     // 상하 패딩
gap: 8              // 버튼 간 간격
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Layout */
  'container': {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  /* Components */
  'filterButton': {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* States */
  'activeButton': {
    backgroundColor: '#655D61',
  },

  'inactiveButton': {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DC',
  },

  'activeText': {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'PretendardVariable',
  },

  'inactiveText': {
    color: '#524A4E',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'PretendardVariable',
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
const [filterItems, setFilterItems] = useState<FilterItem[]>(() => {
  // 필터 아이템들의 선택 상태 관리
  return FILTER_ITEMS.map((item, index) => ({
    id: `filter-${index}`,
    label: item,
    isSelected: false,
  }));
});
```

### 상태 설명
- `filterItems`: 각 필터 버튼의 선택 상태를 관리하는 배열

---

## 동작 명세

### 사용자 인터랙션

1. **"전체" 버튼 클릭**
   - 트리거: 사용자가 "전체" 버튼을 클릭할 때
   - 동작: "전체" 버튼의 현재 상태를 토글하고, 모든 개별 아이템의 상태도 동일하게 변경
   - 결과: 전체 선택 또는 전체 해제 상태로 변경

2. **개별 카테고리 버튼 클릭**
   - 트리거: 사용자가 "스튜디오", "드레스", "메이크업", "웨딩홀" 중 하나의 버튼을 클릭할 때
   - 동작: 해당 버튼의 선택 상태를 토글
   - 결과: 선택된 개별 아이템들의 상태에 따라 "전체" 버튼 상태 자동 조정

### 생명주기

```typescript
// 초기 마운트 시 필터 아이템 초기화
useState(() => {
  if (initialItems) {
    return initialItems;
  }
  return FILTER_ITEMS.map((item, index) => ({
    id: `filter-${index}`,
    label: item,
    isSelected: false,
  }));
});
```

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel={`${item.label} 필터 ${item.isSelected ? '선택됨' : '선택되지 않음'}`}
  accessibilityHint="필터를 선택하거나 해제하려면 두 번 탭하세요"
  accessibilityRole="button"
  // ... other props
/>
```

### 키보드 네비게이션
- Tab 키: 필터 버튼들 간 이동 가능
- Enter/Space 키: 버튼 선택/해제 가능

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 initialItems 형식**
   - 발생 조건: initialItems가 올바른 FilterItem[] 형식이 아닌 경우
   - 처리 방법: 기본 FILTER_ITEMS로 fallback
   - 사용자 피드백: 콘솔 경고 및 기본 상태로 렌더링

---

## 테스트

### 단위 테스트

```typescript
describe('Filter', () => {
  it('should render all filter buttons', () => {
    // 필터 버튼들이 모두 렌더링되는지 테스트
  });

  it('should handle "전체" button toggle correctly', () => {
    // "전체" 버튼 토글 로직 테스트
  });

  it('should handle individual button toggle correctly', () => {
    // 개별 버튼 토글 로직 테스트
  });

  it('should call onSelectionChange when selection changes', () => {
    // 콜백 함수 호출 테스트
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링 (5개 버튼 모두 표시)
- [ ] "전체" 버튼 토글 동작
- [ ] 개별 버튼 토글 동작
- [ ] 전체/개별 버튼 연동 로직
- [ ] onSelectionChange 콜백 호출
- [ ] 접근성 속성 적용
- [ ] 초기 상태 설정

---

## 성능 고려사항

### 최적화 포인트
- memo 사용 여부: 필요시 컴포넌트 memoization 고려 가능
- useMemo 사용: 필터 아이템 배열 계산시 사용
- useCallback 사용: 이벤트 핸들러 최적화

### 주의사항
- 렌더링 횟수 최소화: 상태 변경 시 불필요한 re-render 방지
- 메모리 누수 방지: 이벤트 리스너 정리

---

## 의존성

### 필수 라이브러리
```json
{
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

### 내부 의존성
- 없음

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-01-29 | 초기 버전 구현 (피그마 디자인 기반) | - |

---

## 참고 자료
- [관련 Figma 디자인](https://www.figma.com/design/.../) (노드 ID: 4183:4910)
- 피그마 채널: k0iz0s4o
- 커서룰: @01-common.mdc, @02-wireframe.mdc, @03-ui.mdc

---
