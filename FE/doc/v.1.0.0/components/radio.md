# 컴포넌트 명세서: Radio

> Plan A 프로젝트의 공통 라디오 버튼 컴포넌트 명세서

## 컴포넌트명: Radio

### 기본 정보

| 항목              | 내용                        |
| ----------------- | --------------------------- |
| **컴포넌트명**    | Radio                       |
| **위치**          | `commons/components/radio/` |
| **작성일**        | 2025-11-29                  |
| **작성자**        | Plan A Team                 |
| **버전**          | 1.0.0                       |
| **상태**          | ✅ 완료                     |
| **피그마 노드ID** | 4180:2306                   |

---

## 개요

### 목적

Plan A 디자인 시스템을 기반으로 한 재사용 가능한 라디오 버튼 컴포넌트

- state: 'default' | 'selected'
- 하나의 그룹에서 하나만 선택 가능

### 주요 기능

- ✅ 2가지 state (default, selected)
- ✅ 라디오 그룹 관리 (RadioGroup 컴포넌트)
- ✅ Disabled 상태 지원
- ✅ 접근성 완벽 지원 (radio role)
- ✅ 디자인 토큰 기반 스타일링
- ✅ 최소 터치 영역 고려

### 사용 예시

```typescript
import { Radio, RadioGroup } from "@/commons/components/radio";
import { useState } from "react";

// RadioGroup 사용 (권장)
function Example1() {
  const [gender, setGender] = useState("male");

  return (
    <RadioGroup
      value={gender}
      onChange={setGender}
      options={[
        { value: "male", label: "남성" },
        { value: "female", label: "여성" },
      ]}
    />
  );
}

// 개별 Radio 사용
function Example2() {
  const [selected, setSelected] = useState("option1");

  return (
    <View>
      <Radio
        label="옵션 1"
        value="option1"
        state={selected === "option1" ? "selected" : "default"}
        onSelect={() => setSelected("option1")}
      />
      <Radio
        label="옵션 2"
        value="option2"
        state={selected === "option2" ? "selected" : "default"}
        onSelect={() => setSelected("option2")}
      />
    </View>
  );
}

// 비활성화 상태
function Example3() {
  return (
    <RadioGroup
      value="option1"
      onChange={() => {}}
      options={[
        { value: "option1", label: "옵션 1" },
        { value: "option2", label: "옵션 2" },
      ]}
      disabled={true}
    />
  );
}
```

---

## Props 명세

### Radio Component Props

#### Required Props

| Prop 이름 | 타입                        | 설명         | 예시        |
| --------- | --------------------------- | ------------ | ----------- |
| `state`   | `'default' \| 'selected'`   | 라디오 상태  | `'default'` |
| `label`   | `string`                    | 라디오 라벨  | `'남성'`    |

#### Optional Props

| Prop 이름           | 타입             | 기본값      | 설명                                        | 예시       |
| ------------------- | ---------------- | ----------- | ------------------------------------------- | ---------- |
| `onSelect`          | `() => void`     | `undefined` | 라디오 선택 핸들러                          | `() => {}` |
| `disabled`          | `boolean`        | `false`     | 비활성화 상태                               | `true`     |
| `value`             | `string`         | `undefined` | 라디오 값 (라디오 그룹에서 사용)           | `'male'`   |
| `...PressableProps` | `PressableProps` | -           | React Native Pressable의 모든 props         | -          |

### RadioGroup Component Props

#### Required Props

| Prop 이름 | 타입                                         | 설명               | 예시                              |
| --------- | -------------------------------------------- | ------------------ | --------------------------------- |
| `value`   | `string`                                     | 선택된 값          | `'male'`                          |
| `onChange`| `(value: string) => void`                    | 값 변경 핸들러     | `(val) => setGender(val)`         |
| `options` | `Array<{ value: string; label: string }>`    | 라디오 옵션들      | `[{ value: 'male', label: '남성' }]` |

#### Optional Props

| Prop 이름  | 타입      | 기본값      | 설명           | 예시    |
| ---------- | --------- | ----------- | -------------- | ------- |
| `disabled` | `boolean` | `false`     | 비활성화 상태  | `true`  |
| `style`    | `object`  | `undefined` | 커스텀 스타일  | `{...}` |

### Type Definitions

```typescript
interface RadioProps extends Omit<PressableProps, "style"> {
  /** 라디오 상태 */
  state: "default" | "selected";
  
  /** 라디오 라벨 */
  label: string;
  
  /** 라디오 선택 핸들러 */
  onSelect?: () => void;
  
  /** 비활성화 상태 */
  disabled?: boolean;
  
  /** 라디오 값 (라디오 그룹에서 사용) */
  value?: string;
}

interface RadioGroupProps {
  /** 선택된 값 */
  value: string;
  
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  
  /** 라디오 옵션들 */
  options: Array<{
    value: string;
    label: string;
  }>;
  
  /** 비활성화 상태 */
  disabled?: boolean;
  
  /** 커스텀 스타일 */
  style?: object;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors

```typescript
// 피그마 토큰 사용
blackColors["black-1"];           // #ffffff (배경)
secondaryColors["secondary-300"]; // #d2bec7 (default 테두리, 피그마: #d6cfcf와 유사)
rootColors.brand;                 // #ff5c8d (selected 테두리 및 컨트롤, 피그마: #ff6593와 유사)
brownColors["brown-5"];           // #716b6e (default 텍스트, 피그마: #6b7280와 유사)
rootColors.text;                  // #524a4e (selected 텍스트, 피그마: #5c5050와 유사)
```

#### Dimensions

```typescript
// Radio Box
width: 24;
height: 24;
borderRadius: 8;
borderWidth: 1;

// Control (Inner Dot)
width: 20;
height: 20;
borderRadius: 6;

// Container Gap
gap: 8; // Radio Box와 Label 사이 간격
```

#### Typography

```typescript
// Label Text
fontSize: 14;
fontWeight: "400";
lineHeight: 17;
fontFamily: "Pretendard Variable";
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Container */
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /* Radio Box - Default */
  radioBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: blackColors["black-1"],
    borderColor: secondaryColors["secondary-300"],
    justifyContent: "center",
    alignItems: "center",
  },

  /* Radio Box - Selected */
  radioBoxSelected: {
    borderColor: rootColors.brand,
  },

  /* Control (Inner Dot) */
  control: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: rootColors.brand,
  },

  /* Label Text - Default */
  labelText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: brownColors["brown-5"],
    fontFamily: "Pretendard Variable",
  },

  /* Label Text - Selected */
  labelTextSelected: {
    color: rootColors.text,
  },
});
```

### 스타일 조합 매트릭스

| State    | Box Border | Inner Control | Text Color |
| -------- | ---------- | ------------- | ---------- |
| default  | #d2bec7    | 없음          | #716b6e    |
| selected | #ff5c8d    | #ff5c8d       | #524a4e    |

---

## 상태 관리

### 내부 상태

Radio 컴포넌트는 순수 프레젠테이션 컴포넌트로 내부 상태를 관리하지 않습니다. 모든 상태는 props를 통해 외부에서 제어됩니다.

RadioGroup 컴포넌트는 선택된 값을 props로 받아 각 Radio에 전달합니다.

### 상태 흐름

```
Props (state, value)
  ↓
isSelected = state === "selected"
  ↓
적절한 스타일 적용
  ↓
렌더링
```

### 상태 전환

```
User Press (Radio)
  ↓
handlePress()
  ↓
onSelect()
  ↓
부모 컴포넌트에서 value 변경
  ↓
리렌더링

또는

User Press (RadioGroup 내부)
  ↓
onChange(option.value)
  ↓
부모 컴포넌트에서 value 변경
  ↓
리렌더링
```

---

## 동작 명세

### 사용자 인터랙션

1. **라디오 선택 (Press)**

   - 트리거: 사용자가 라디오를 터치/클릭
   - 동작: `onSelect` 콜백 실행
   - 결과: 부모 컴포넌트에서 선택된 값 업데이트

2. **비활성화 상태**

   - 트리거: `disabled={true}` prop 전달
   - 동작: 클릭 이벤트 차단
   - 결과: 클릭 불가, 상태 변경 불가

3. **상태에 따른 시각적 변화**
   - Default: 회색 테두리 (#d2bec7), 내부 컨트롤 없음, 회색 텍스트 (#716b6e)
   - Selected: 핑크 테두리 (#ff5c8d), 내부 컨트롤 표시, 어두운 텍스트 (#524a4e)

### 라디오 그룹 동작

- RadioGroup 내에서 하나의 라디오만 선택 가능
- 다른 라디오를 선택하면 이전 선택이 자동으로 해제됨

---

## 접근성 (Accessibility)

### 스크린 리더 지원

```typescript
<Pressable
  accessible={true}
  accessibilityRole="radio"
  accessibilityState={{
    checked: isSelected,
    disabled,
  }}
  accessibilityLabel={label}
>
  {/* content */}
</Pressable>
```

### 접근성 속성

- `accessible={true}`: 스크린 리더가 요소를 인식
- `accessibilityRole="radio"`: 라디오 버튼 역할 명시
- `accessibilityState={{ checked, disabled }}`: 체크 및 비활성화 상태 전달
- `accessibilityLabel={label}`: 스크린 리더 라벨 (label prop 사용)

### 키보드 네비게이션

- Tab 키: 포커스 이동 (React Native Web에서 자동 지원)
- Enter/Space 키: 라디오 선택 (Pressable 기본 동작)

### 최소 터치 영역

- Width: 24px (라디오 박스) + 8px (gap) + 텍스트 너비
- Height: 24px
- 참고: 필요시 부모 컴포넌트에서 hitSlop 설정 가능

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 state 값**

   - 발생 조건: state에 'default' 또는 'selected'가 아닌 값 전달
   - 처리 방법: TypeScript 타입 체크로 사전 방지
   - 사용자 피드백: 컴파일 타임 에러

2. **onSelect 없이 사용**

   - 발생 조건: `onSelect` prop 미전달
   - 처리 방법: 조건부 체크로 안전하게 처리
   - 사용자 피드백: 클릭해도 상태 변경 안 됨 (에러 없음)

3. **disabled 상태에서 클릭**
   - 발생 조건: `disabled={true}` 상태에서 클릭
   - 처리 방법: Pressable의 disabled prop으로 자동 처리
   - 사용자 피드백: 클릭 이벤트 무시

---

## 테스트

### 단위 테스트

```typescript
describe("Radio", () => {
  it("should render correctly with default state", () => {
    const { getByRole } = render(<Radio state="default" label="옵션" />);
    const radio = getByRole("radio");
    expect(radio.props.accessibilityState.checked).toBe(false);
  });

  it("should render correctly with selected state", () => {
    const { getByRole } = render(<Radio state="selected" label="옵션" />);
    const radio = getByRole("radio");
    expect(radio.props.accessibilityState.checked).toBe(true);
  });

  it("should call onSelect when pressed", () => {
    const mockOnSelect = jest.fn();
    const { getByRole } = render(
      <Radio state="default" label="옵션" onSelect={mockOnSelect} />
    );
    fireEvent.press(getByRole("radio"));
    expect(mockOnSelect).toHaveBeenCalled();
  });

  it("should not call onSelect when disabled", () => {
    const mockOnSelect = jest.fn();
    const { getByRole } = render(
      <Radio 
        state="default" 
        label="옵션" 
        onSelect={mockOnSelect} 
        disabled={true} 
      />
    );
    fireEvent.press(getByRole("radio"));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it("should show control dot when selected", () => {
    const { queryByTestId } = render(
      <Radio state="selected" label="옵션" />
    );
    // control이 렌더링되는지 확인
  });
});

describe("RadioGroup", () => {
  it("should render all options", () => {
    const { getAllByRole } = render(
      <RadioGroup
        value="option1"
        onChange={() => {}}
        options={[
          { value: "option1", label: "옵션 1" },
          { value: "option2", label: "옵션 2" },
        ]}
      />
    );
    expect(getAllByRole("radio")).toHaveLength(2);
  });

  it("should call onChange with correct value", () => {
    const mockOnChange = jest.fn();
    const { getAllByRole } = render(
      <RadioGroup
        value="option1"
        onChange={mockOnChange}
        options={[
          { value: "option1", label: "옵션 1" },
          { value: "option2", label: "옵션 2" },
        ]}
      />
    );
    fireEvent.press(getAllByRole("radio")[1]);
    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });
});
```

### 테스트 체크리스트

- [x] 기본 렌더링 (default/selected 상태)
- [x] 사용자 인터랙션 (onSelect)
- [x] Disabled 상태
- [x] 접근성 (accessible, accessibilityRole, accessibilityState)
- [x] 스타일 적용 (default/selected에 따른 테두리, 컨트롤, 텍스트 색상)
- [x] RadioGroup 동작 (하나만 선택)

---

## 성능 고려사항

### 최적화 포인트

- **memo 사용 여부**: 불필요. 순수 프레젠테이션 컴포넌트로 props가 변경될 때만 리렌더링
- **useMemo 사용**: 불필요. 스타일 계산이 간단하고 빠름
- **useCallback 사용**: 불필요. handlePress는 간단한 함수

### 주의사항

- 스타일 객체가 StyleSheet.create()로 최적화되어 있어 성능 이슈 없음
- 조건부 스타일 계산이 단순하여 오버헤드 최소
- Pressable 컴포넌트의 네이티브 최적화 활용

### 렌더링 최적화

- 불필요한 re-render 없음 (상태 없는 컴포넌트)
- props 변경 시에만 리렌더링
- RadioGroup은 options 배열이 변경될 때만 리렌더링

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

- `@/commons/enums/color` - 디자인 토큰 (rootColors, blackColors, secondaryColors, brownColors)
- `./styles` - 컴포넌트 스타일 정의

### 선택적 의존성

- 없음

---

## 사용 시 주의사항

### Do's ✅

1. **RadioGroup 사용 권장**

   ```typescript
   // ✅ Good: RadioGroup으로 간편하게 관리
   <RadioGroup
     value={gender}
     onChange={setGender}
     options={[
       { value: "male", label: "남성" },
       { value: "female", label: "여성" },
     ]}
   />
   ```

2. **명확한 라벨 제공**

   ```typescript
   // ✅ Good: 사용자가 이해하기 쉬운 라벨
   <Radio label="남성" state="default" />
   ```

3. **적절한 터치 영역 확보**
   ```typescript
   // ✅ Good: hitSlop으로 터치 영역 확대
   <Radio 
     label="옵션"
     state="default" 
     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
   />
   ```

### Don'ts ❌

1. **스타일 직접 수정 금지**

   ```typescript
   // ❌ Bad: style prop 사용 불가
   <Radio style={{ backgroundColor: "blue" }} state="default" label="옵션" />
   ```

2. **label 누락 금지**

   ```typescript
   // ❌ Bad: label은 필수입니다
   <Radio state="default" />
   ```

3. **그룹 내 중복 선택 시도**

   ```typescript
   // ❌ Bad: RadioGroup은 하나만 선택 가능
   // onChange를 통해 자동으로 하나만 선택되도록 관리됨
   ```

---

## 변경 이력

| 버전  | 날짜       | 변경 내용      | 작성자      |
| ----- | ---------- | -------------- | ----------- |
| 1.0.0 | 2025-11-29 | 초기 버전 생성 | Plan A Team |

---

## 참고 자료

### 디자인

- [Figma 디자인 - Radio Component](https://www.figma.com) (노드ID: 4180:2306)
- [피그마 채널: p8draojg]

### 관련 문서

- [색상 토큰 명세](../../enums/color.ts)
- [컴포넌트 템플릿](../../../doc/v.1.0.0/component-template.md)

### 커서 룰

- [@01-common.mdc]
- [@02-wireframe.mdc]
- [@03-ui.mdc]

---

## 라이선스

Plan A 프로젝트 내부용

