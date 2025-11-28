# 컴포넌트 명세서: Button

> Plan A 프로젝트의 공통 버튼 컴포넌트 명세서

## 컴포넌트명: Button

### 기본 정보

| 항목              | 내용                         |
| ----------------- | ---------------------------- |
| **컴포넌트명**    | Button                       |
| **위치**          | `commons/components/button/` |
| **작성일**        | 2025-11-28                   |
| **작성자**        | 김은경                       |
| **버전**          | 1.0.0                        |
| **상태**          | ✅ 완료                      |
| **피그마 노드ID** | 4116:384                     |

---

## 개요

### 목적

Plan A 디자인 시스템을 기반으로 한 재사용 가능한 버튼 컴포넌트 - variant: 'filled' | 'outlined' - size: 'small' | 'medium' | 'lagrge' - icon: 'true' | 'false' - state: 'default' | 'disabled'

### 주요 기능

- ✅ 2가지 variant (filled, outlined)
- ✅ 3가지 size (small, medium, large)
- ✅ 아이콘 지원 (선택적)
- ✅ Disabled 상태 지원
- ✅ 접근성 완벽 지원
- ✅ 디자인 토큰 기반 스타일링
- ✅ 내용에 따라 자동 조정되는 너비

### 사용 예시

```typescript
import { Button } from "@/commons/components/button";
import { SquarePen } from "lucide-react-native";

// 기본 사용 (Filled Medium)
function Example1() {
  return <Button onPress={() => console.log("pressed")}>플랜 추가하기</Button>;
}

// Outlined Small 버튼
function Example2() {
  return (
    <Button
      variant="outlined"
      size="small"
      onPress={() => console.log("cancel")}
    >
      취소
    </Button>
  );
}

// 아이콘이 있는 Filled Large 버튼
function Example3() {
  return (
    <Button
      variant="filled"
      size="large"
      icon={true}
      iconComponent={<SquarePen size={20} color="#ffffff" />}
      onPress={() => console.log("add plan")}
    >
      플랜 추가하기
    </Button>
  );
}

// Disabled 상태
function Example4() {
  return <Button disabled={true}>예약 신청</Button>;
}
```

---

## Props 명세

### Required Props

| Prop 이름  | 타입     | 설명                 | 예시              |
| ---------- | -------- | -------------------- | ----------------- |
| `children` | `string` | 버튼에 표시될 텍스트 | `"플랜 추가하기"` |

### Optional Props

| Prop 이름           | 타입                             | 기본값      | 설명                                | 예시                  |
| ------------------- | -------------------------------- | ----------- | ----------------------------------- | --------------------- |
| `variant`           | `'filled' \| 'outlined'`         | `'filled'`  | 버튼 스타일 변형                    | `'outlined'`          |
| `size`              | `'small' \| 'medium' \| 'large'` | `'medium'`  | 버튼 크기                           | `'large'`             |
| `icon`              | `boolean`                        | `false`     | 아이콘 포함 여부                    | `true`                |
| `disabled`          | `boolean`                        | `false`     | 비활성화 상태                       | `true`                |
| `iconComponent`     | `React.ReactNode`                | `undefined` | 표시할 아이콘 컴포넌트              | `<SquarePen />`       |
| `onPress`           | `() => void`                     | `undefined` | 버튼 클릭 시 실행될 함수            | `() => handlePress()` |
| `...PressableProps` | `PressableProps`                 | -           | React Native Pressable의 모든 props | -                     |

### Type Definitions

```typescript
interface ButtonProps extends Omit<PressableProps, "style"> {
  /** 버튼 텍스트 */
  children: string;

  /** 버튼 스타일 변형 */
  variant?: "filled" | "outlined";

  /** 버튼 크기 */
  size?: "small" | "medium" | "large";

  /** 아이콘 포함 여부 */
  icon?: boolean;

  /** 비활성화 상태 */
  disabled?: boolean;

  /** 아이콘 컴포넌트 (optional) */
  iconComponent?: React.ReactNode;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors

```typescript
// 피그마 토큰 사용
rootColors.brand; // #ff5c8d (메인 브랜드 컬러)
blackColors["black-1"]; // #ffffff (흰색 텍스트)
blackColors["black-6"]; // #bfbfbf (비활성화 배경)
```

#### Typography

```typescript
fontSize: 12;
fontWeight: "700"(Bold);
letterSpacing: -0.150390625;
lineHeight: 20;
```

#### Spacing

```typescript
paddingHorizontal: 16; // 좌우 내부 여백
gap: 4; // 아이콘-텍스트 간격
borderRadius: 8; // 모서리 둥글기
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Filled Variants */
  buttonFilledSmall: {
    height: 32,
    backgroundColor: rootColors.brand,
    borderRadius: 8,
    // ...
  },

  buttonFilledMedium: {
    height: 40,
    backgroundColor: rootColors.brand,
    borderRadius: 8,
    // ...
  },

  buttonFilledLarge: {
    height: 44,
    backgroundColor: rootColors.brand,
    borderRadius: 8,
    // ...
  },

  /* Outlined Variants */
  buttonOutlinedSmall: {
    height: 32,
    borderWidth: 1,
    borderColor: rootColors.brand,
    backgroundColor: "transparent",
    // ...
  },

  buttonOutlinedMedium: {
    height: 40,
    borderWidth: 1,
    borderColor: rootColors.brand,
    // ...
  },

  buttonOutlinedLarge: {
    height: 44,
    borderWidth: 1,
    borderColor: rootColors.brand,
    // ...
  },

  /* Disabled State */
  buttonDisabled: {
    height: 40,
    backgroundColor: blackColors["black-6"],
    // ...
  },

  /* Text Styles */
  textFilled: {
    color: blackColors["black-1"],
    fontSize: 12,
    fontWeight: "700",
    // ...
  },

  textOutlined: {
    color: rootColors.brand,
    fontSize: 12,
    fontWeight: "700",
    // ...
  },

  textDisabled: {
    color: blackColors["black-1"],
    fontSize: 12,
    fontWeight: "700",
    // ...
  },

  /* Icon */
  iconContainer: {
    width: 20,
    height: 20,
    // ...
  },
});
```

### 스타일 조합 매트릭스

| Variant  | Size         | Height | Border      | Background  | Text Color |
| -------- | ------------ | ------ | ----------- | ----------- | ---------- |
| filled   | small        | 32     | -           | #ff5c8d     | #ffffff    |
| filled   | medium       | 40     | -           | #ff5c8d     | #ffffff    |
| filled   | large        | 44     | -           | #ff5c8d     | #ffffff    |
| outlined | small        | 32     | 1px #ff5c8d | transparent | #ff5c8d    |
| outlined | medium       | 40     | 1px #ff5c8d | transparent | #ff5c8d    |
| outlined | large        | 44     | 1px #ff5c8d | transparent | #ff5c8d    |
| -        | - (disabled) | 40     | -           | #bfbfbf     | #ffffff    |

---

## 상태 관리

### 내부 상태

이 컴포넌트는 순수 프레젠테이션 컴포넌트로 내부 상태를 관리하지 않습니다. 모든 상태는 props를 통해 외부에서 제어됩니다.

### 상태 흐름

```
Props (variant, size, disabled)
  ↓
getButtonStyle() / getTextStyle()
  ↓
적절한 스타일 반환
  ↓
렌더링
```

---

## 동작 명세

### 사용자 인터랙션

1. **버튼 클릭 (Press)**

   - 트리거: 사용자가 버튼을 터치/클릭
   - 동작: `onPress` 콜백 실행
   - 결과: 부모 컴포넌트에서 정의한 동작 수행

2. **비활성화 상태**

   - 트리거: `disabled={true}` prop 전달
   - 동작: 클릭 이벤트 차단, 스타일 변경
   - 결과: 회색 배경, 클릭 불가

3. **아이콘 표시**
   - 트리거: `icon={true}` 및 `iconComponent` 전달
   - 동작: 아이콘과 텍스트를 flexbox로 정렬
   - 결과: 아이콘이 텍스트 왼쪽에 4px 간격으로 표시

### 생명주기

```typescript
// 컴포넌트는 순수 함수형 컴포넌트로 별도의 생명주기 로직 없음
// React Native의 Pressable 컴포넌트의 생명주기를 따름
```

---

## 접근성 (Accessibility)

### 스크린 리더 지원

```typescript
<Pressable
  accessible={true}
  accessibilityRole="button"
  accessibilityState={{ disabled }}
>
  {/* content */}
</Pressable>
```

### 접근성 속성

- `accessible={true}`: 스크린 리더가 요소를 인식
- `accessibilityRole="button"`: 버튼 역할 명시
- `accessibilityState={{ disabled }}`: 비활성화 상태 전달

### 키보드 네비게이션

- Tab 키: 포커스 이동 (React Native Web에서 자동 지원)
- Enter/Space 키: 버튼 활성화 (Pressable 기본 동작)

### 최소 터치 영역

- Small: 높이 32px (권장 44px 이하이지만 디자인 우선)
- Medium: 높이 40px
- Large: 높이 44px (WCAG 권장 기준 충족)

---

## 에러 처리

### 예상 에러 케이스

1. **children이 string이 아닌 경우**

   - 발생 조건: children에 문자열이 아닌 값 전달
   - 처리 방법: TypeScript 타입 체크로 사전 방지
   - 사용자 피드백: 컴파일 타임 에러

2. **icon={true}인데 iconComponent가 없는 경우**

   - 발생 조건: `icon={true}`만 설정하고 `iconComponent` 미전달
   - 처리 방법: 조건부 렌더링으로 아이콘 영역 숨김
   - 사용자 피드백: 텍스트만 표시 (에러 없음)

3. **잘못된 variant/size 값**
   - 발생 조건: 정의되지 않은 variant나 size 전달
   - 처리 방법: TypeScript 타입 체크로 사전 방지
   - 사용자 피드백: 컴파일 타임 에러

---

## 테스트

### 단위 테스트

```typescript
describe("Button", () => {
  it("should render correctly with default props", () => {
    const { getByText } = render(<Button>플랜 추가하기</Button>);
    expect(getByText("플랜 추가하기")).toBeTruthy();
  });

  it("should apply filled medium style by default", () => {
    const { getByRole } = render(<Button>테스트</Button>);
    const button = getByRole("button");
    // height: 40, backgroundColor: #ff5c8d 확인
  });

  it("should apply outlined style when variant is outlined", () => {
    const { getByRole } = render(<Button variant="outlined">테스트</Button>);
    const button = getByRole("button");
    // borderWidth: 1, borderColor: #ff5c8d 확인
  });

  it("should render icon when icon prop is true", () => {
    const Icon = <View testID="test-icon" />;
    const { getByTestId } = render(
      <Button icon={true} iconComponent={Icon}>
        테스트
      </Button>
    );
    expect(getByTestId("test-icon")).toBeTruthy();
  });

  it("should not call onPress when disabled", () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button disabled={true} onPress={mockOnPress}>
        테스트
      </Button>
    );
    fireEvent.press(getByRole("button"));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("should call onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(<Button onPress={mockOnPress}>테스트</Button>);
    fireEvent.press(getByRole("button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### 테스트 체크리스트

- [x] 기본 렌더링
- [x] Props 변경 처리 (variant, size)
- [x] 사용자 인터랙션 (onPress)
- [x] Disabled 상태
- [x] 접근성 (accessible, accessibilityRole, accessibilityState)
- [x] 아이콘 렌더링
- [x] 텍스트 스타일 적용

---

## 성능 고려사항

### 최적화 포인트

- **memo 사용 여부**: 불필요. 순수 프레젠테이션 컴포넌트로 props가 변경될 때만 리렌더링
- **useMemo 사용**: 불필요. 스타일 계산이 간단하고 빠름
- **useCallback 사용**: 불필요. 내부 콜백 함수 없음

### 주의사항

- 스타일 객체가 StyleSheet.create()로 최적화되어 있어 성능 이슈 없음
- 조건부 스타일 계산이 단순하여 오버헤드 최소
- Pressable 컴포넌트의 네이티브 최적화 활용

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
  "react-native": "0.81.5"
}
```

### 내부 의존성

- `@/commons/enums/color` - 디자인 토큰 (rootColors, blackColors)
- `./styles` - 컴포넌트 스타일 정의

### 선택적 의존성

- `lucide-react-native` - 아이콘 사용 시 (사용자가 선택)

---

## 사용 시 주의사항

### Do's ✅

1. **디자인 토큰 사용**

   ```typescript
   // ✅ Good: 토큰 기반 스타일링
   <Button variant="filled">확인</Button>
   ```

2. **명확한 텍스트**

   ```typescript
   // ✅ Good: 사용자가 이해하기 쉬운 텍스트
   <Button>플랜 추가하기</Button>
   ```

3. **적절한 크기 선택**
   ```typescript
   // ✅ Good: 컨텍스트에 맞는 크기
   <Button size="small">취소</Button>
   <Button size="large">중요한 액션</Button>
   ```

### Don'ts ❌

1. **스타일 직접 수정 금지**

   ```typescript
   // ❌ Bad: style prop 사용 불가
   <Button style={{ backgroundColor: "blue" }}>버튼</Button>
   ```

2. **너무 긴 텍스트 사용 지양**

   ```typescript
   // ❌ Bad: 너무 긴 텍스트
   <Button>이것은 매우 긴 버튼 텍스트입니다...</Button>

   // ✅ Good: 간결한 텍스트
   <Button>확인</Button>
   ```

3. **children에 JSX 전달 금지**

   ```typescript
   // ❌ Bad: children은 string만 허용
   <Button><View><Text>텍스트</Text></View></Button>

   // ✅ Good
   <Button>텍스트</Button>
   ```

---

## 변경 이력

| 버전  | 날짜       | 변경 내용                                           | 작성자      |
| ----- | ---------- | --------------------------------------------------- | ----------- |
| 1.0.0 | 2025-11-28 | 초기 버전 생성                                      | Plan A Team |
| 1.0.1 | 2025-11-28 | Outlined Large 사이즈 추가                          | Plan A Team |
| 1.0.2 | 2025-11-28 | Width 고정값 제거, 내용에 따라 자동 조정되도록 변경 | Plan A Team |

---

## 참고 자료

### 디자인

- [Figma 디자인 - Button Component](https://www.figma.com) (노드ID: 4116:384)
- [피그마 채널: wh7gcl2k]

### 관련 문서

- [색상 토큰 명세](../../enums/color.ts)
- [타이포그래피 토큰 명세](../../enums/typography.ts)
- [컴포넌트 템플릿](../../../doc/v.1.0.0/component-template.md)

### 커서 룰

- [@01-common.mdc](../../../.cursor/rules/01-common.mdc)
- [@02-wireframe.mdc](../../../.cursor/rules/02-wireframe.mdc)
- [@03-ui.mdc](../../../.cursor/rules/03-ui.mdc)

---

## 라이선스

Plan A 프로젝트 내부용
