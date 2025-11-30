# 컴포넌트 명세서

> 이 문서는 Marker 컴포넌트의 명세서입니다.

## 컴포넌트명: Marker

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Marker |
| **위치** | `commons/components/marker/` |
| **작성일** | 2025-01-27 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |
| **피그마 노드ID** | 4183:8055 |

---

## 개요

### 목적
카테고리나 위치를 표시하는 마커 컴포넌트입니다. 두 가지 종류(category, location)로 분류되며, 각각 다른 variant를 지원합니다. 현재는 카테고리 마커만 구현되어 있으며, 4가지 variant(shirt, camera, palette, hotel)를 제공합니다.

### 컴포넌트 구조
- **두 가지 종류**: `category`와 `location` 타입으로 분류 (현재는 `category`만 구현)
- **4가지 Variant**: shirt, camera, palette, hotel 아이콘 지원
- **일관된 디자인**: 모든 variant는 동일한 크기(32x32)와 스타일을 유지하며, variant별로 다른 색상 테두리와 아이콘 색상을 가집니다.

### 사용 예시
```typescript
import { Marker } from '@/commons/components/marker';

function Example() {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <Marker variant="shirt" />
      <Marker variant="camera" />
      <Marker variant="palette" />
      <Marker variant="hotel" />
    </View>
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `variant` | `MarkerVariant` | 마커의 variant (shirt, camera, palette, hotel) | `"shirt"` |

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `type` | `MarkerType` | `"category"` | 마커 타입 (category 또는 location) | `"category"` |
| `style` | `ViewStyle` | `undefined` | 추가 스타일 (선택적) | `{ margin: 8 }` |

### Type Definitions

```typescript
type MarkerType = "category" | "location";
type MarkerVariant = "shirt" | "camera" | "palette" | "hotel";

interface MarkerProps {
  type?: MarkerType;
  variant: MarkerVariant;
  style?: ViewStyle;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
blackColors["black-1"]    // 배경색: #ffffff
rootColors.brand         // shirt variant 색상: #ff5c8d
variantColors.camera     // camera variant 색상: #b885fa
variantColors.palette    // palette variant 색상: #ffa537
variantColors.hotel      // hotel variant 색상: #73c600
```

#### Typography
Typography는 사용하지 않습니다 (아이콘만 사용).

#### Spacing
```typescript
width: 32px
height: 32px
borderRadius: 16px
borderWidth: 1px
iconSize: 12px
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Container */
  'container': {
    width: 32,
    height: 32,
    backgroundColor: blackColors["black-1"],
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  /* Variant Containers */
  'container-shirt': {
    borderColor: variantColors.shirt,
  },
  'container-camera': {
    borderColor: variantColors.camera,
  },
  'container-palette': {
    borderColor: variantColors.palette,
  },
  'container-hotel': {
    borderColor: variantColors.hotel,
  },
  
  /* Icon */
  'iconContainer': {
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

---

## 상태 관리

### 내부 상태
컴포넌트는 상태를 관리하지 않습니다. 순수 프레젠테이션 컴포넌트입니다.

### 상태 설명
- 상태 없음: props 기반으로 렌더링만 수행

---

## 동작 명세

### 사용자 인터랙션
현재는 인터랙션이 없습니다. 향후 확장 가능성을 고려하여 `type` prop을 통해 `location` 타입을 추가할 수 있습니다.

### 생명주기
상태가 없으므로 생명주기 훅이 필요하지 않습니다.

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<Marker
  variant="shirt"
  accessible={true}
  accessibilityLabel="shirt 마커"
  accessibilityRole="image"
/>
```

### 키보드 네비게이션
현재는 인터랙션이 없으므로 키보드 네비게이션이 필요하지 않습니다.

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 variant 전달**
   - 발생 조건: `variant` prop에 정의되지 않은 값 전달
   - 처리 방법: 기본값으로 `shirt` variant 사용
   - 사용자 피드백: 시각적으로는 정상 렌더링되지만, 의도한 variant와 다를 수 있음

2. **스타일 충돌**
   - 발생 조건: `style` prop으로 필수 스타일 속성(width, height 등) 덮어쓰기
   - 처리 방법: `style` prop은 배열로 병합되어 나중에 전달된 스타일이 우선 적용됨
   - 사용자 피드백: 컴포넌트 크기나 모양이 예상과 다를 수 있음

---

## 테스트

### 단위 테스트

```typescript
describe('Marker', () => {
  it('should render correctly with shirt variant', () => {
    const { getByLabelText } = render(<Marker variant="shirt" />);
    expect(getByLabelText('shirt 마커')).toBeTruthy();
  });
  
  it('should render all variants', () => {
    const variants: MarkerVariant[] = ['shirt', 'camera', 'palette', 'hotel'];
    variants.forEach(variant => {
      const { getByLabelText } = render(<Marker variant={variant} />);
      expect(getByLabelText(`${variant} 마커`)).toBeTruthy();
    });
  });
  
  it('should apply custom style', () => {
    const customStyle = { margin: 8 };
    const { getByLabelText } = render(
      <Marker variant="shirt" style={customStyle} />
    );
    const marker = getByLabelText('shirt 마커');
    expect(marker.props.style).toContainEqual(customStyle);
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링
- [ ] 모든 variant 렌더링
- [ ] Props 변경 처리
- [ ] 커스텀 스타일 적용
- [ ] 접근성

---

## 성능 고려사항

### 최적화 포인트

- **memo 사용 여부**: 불필요. 순수 프레젠테이션 컴포넌트로 props가 변경될 때만 리렌더링
- **useMemo 사용**: 불필요. 스타일 계산이 간단하고 빠름
- **useCallback 사용**: 불필요. 내부 콜백 함수 없음

### 주의사항

- 스타일 객체가 StyleSheet.create()로 최적화되어 있어 성능 이슈 없음
- 조건부 스타일 계산이 단순하여 오버헤드 최소
- 아이콘 컴포넌트는 매 렌더링마다 생성되지만, 크기가 작아 성능 영향 미미

### 렌더링 최적화

- 불필요한 re-render 없음 (상태 없는 컴포넌트)
- props 변경 시에만 리렌더링
- 스타일 계산은 render 함수 내에서 수행되지만 비용이 낮음

---

## 의존성

### 필수 라이브러리

```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "lucide-react-native": "^0.555.0"
}
```

### 내부 의존성

- `@/commons/enums/color` - 디자인 토큰 (rootColors, blackColors)
- `./styles` - 컴포넌트 스타일 정의

---

## 사용 시 주의사항

### Do's ✅

1. **올바른 variant 사용**
   ```typescript
   // ✅ Good: 정의된 variant 사용
   <Marker variant="shirt" />
   <Marker variant="camera" />
   ```

2. **타입 안정성 활용**
   ```typescript
   // ✅ Good: TypeScript 타입 체크 활용
   const variant: MarkerVariant = "shirt";
   <Marker variant={variant} />
   ```

3. **접근성 고려**
   ```typescript
   // ✅ Good: 접근성 레이블이 자동으로 설정됨
   <Marker variant="shirt" />
   ```

### Don'ts ❌

1. **잘못된 variant 사용**
   ```typescript
   // ❌ Bad: 정의되지 않은 variant
   <Marker variant="unknown" />
   ```

2. **필수 스타일 덮어쓰기**
   ```typescript
   // ❌ Bad: 크기나 모양을 변경하면 디자인 시스템과 불일치
   <Marker variant="shirt" style={{ width: 50, height: 50 }} />
   ```

3. **직접 색상 지정**
   ```typescript
   // ❌ Bad: 디자인 토큰을 우회한 색상 사용
   // (현재는 style prop으로 색상 변경 불가능하지만, 향후 확장 시 주의)
   ```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-01-27 | 초기 버전 | - |

---

## 참고 자료

- [피그마 디자인](https://www.figma.com/file/...) - 노드ID: 4183:8055
- [lucide-react-native 아이콘](https://lucide.dev/)
- [관련 이슈]()


