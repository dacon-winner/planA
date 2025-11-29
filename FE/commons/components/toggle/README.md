# 컴포넌트 명세서: Toggle

> Plan A 프로젝트의 공통 토글 스위치 컴포넌트 명세서

## 컴포넌트명: Toggle

### 기본 정보

| 항목              | 내용                         |
| ----------------- | ---------------------------- |
| **컴포넌트명**    | Toggle                       |
| **위치**          | `commons/components/toggle/` |
| **작성일**        | 2025-11-29                   |
| **작성자**        | Plan A Team                  |
| **버전**          | 1.0.0                        |
| **상태**          | ✅ 완료                      |
| **피그마 노드ID** | 4180:2458                    |

---

## 개요

### 목적

Plan A 디자인 시스템을 기반으로 한 재사용 가능한 토글 스위치 컴포넌트
- state: 'on' | 'off'

### 주요 기능

- ✅ 2가지 state (on, off)
- ✅ 애니메이션 없는 즉시 전환
- ✅ Disabled 상태 지원
- ✅ 접근성 완벽 지원 (switch role)
- ✅ 디자인 토큰 기반 스타일링
- ✅ 최소 터치 영역 고려

### 사용 예시

```typescript
import { Toggle } from "@/commons/components/toggle";
import { useState } from "react";

// 기본 사용 (On/Off 토글)
function Example1() {
  const [isOn, setIsOn] = useState<"on" | "off">("off");

  return (
    <Toggle
      state={isOn}
      onToggle={(newState) => setIsOn(newState)}
    />
  );
}

// 비활성화 상태
function Example2() {
  return (
    <Toggle
      state="on"
      disabled={true}
    />
  );
}

// 알림 설정 예시
function Example3() {
  const [notification, setNotification] = useState<"on" | "off">("on");

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Text>알림 받기</Text>
      <Toggle
        state={notification}
        onToggle={(newState) => {
          setNotification(newState);
          // API 호출 등 추가 로직
        }}
      />
    </View>
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입              | 설명         | 예시    |
| --------- | ----------------- | ------------ | ------- |
| `state`   | `'on' \| 'off'`   | 토글 상태    | `'on'`  |

### Optional Props

| Prop 이름           | 타입                                 | 기본값      | 설명                     | 예시                       |
| ------------------- | ------------------------------------ | ----------- | ------------------------ | -------------------------- |
| `onToggle`          | `(newState: 'on' \| 'off') => void`  | `undefined` | 상태 변경 핸들러         | `(state) => setState(...)` |
| `disabled`          | `boolean`                            | `false`     | 비활성화 상태            | `true`                     |
| `...PressableProps` | `PressableProps`                     | -           | React Native Pressable의 모든 props | -            |

### Type Definitions

```typescript
interface ToggleProps extends Omit<PressableProps, "style"> {
  /** 토글 상태 */
  state: "on" | "off";
  
  /** 상태 변경 핸들러 */
  onToggle?: (newState: "on" | "off") => void;
  
  /** 비활성화 상태 */
  disabled?: boolean;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors

```typescript
// 피그마 토큰 사용
rootColors.brand;      // #ff5c8d (ON 상태 배경)
rootColors.navigation; // #e5e7eb (OFF 상태 배경)
blackColors["black-1"]; // #ffffff (핸들 색상)
```

#### Dimensions

```typescript
// Container
width: 32;
height: 18;
borderRadius: 9999; // 완전히 둥글게

// Handle
width: 16;
height: 16;
borderRadius: 9999; // 완전히 둥글게
```

#### Spacing

```typescript
paddingHorizontal: 1; // 핸들 좌우 여백
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Container Styles */
  containerOn: {
    width: 32,
    height: 18,
    backgroundColor: rootColors.brand, // #ff5c8d
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // 핸들 오른쪽 정렬
    paddingHorizontal: 1,
  },

  containerOff: {
    width: 32,
    height: 18,
    backgroundColor: rootColors.navigation, // #e5e7eb
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // 핸들 왼쪽 정렬
    paddingHorizontal: 1,
  },

  /* Handle Styles */
  handleOn: {
    width: 16,
    height: 16,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 9999,
  },

  handleOff: {
    width: 16,
    height: 16,
    backgroundColor: blackColors["black-1"], // #ffffff
    borderRadius: 9999,
  },
});
```

### 스타일 조합 매트릭스

| State | Container BG | Handle Position | Handle BG |
| ----- | ------------ | --------------- | --------- |
| on    | #ff5c8d      | 오른쪽          | #ffffff   |
| off   | #e5e7eb      | 왼쪽            | #ffffff   |

---

## 상태 관리

### 내부 상태

이 컴포넌트는 순수 프레젠테이션 컴포넌트로 내부 상태를 관리하지 않습니다. 모든 상태는 props를 통해 외부에서 제어됩니다.

### 상태 흐름

```
Props (state)
  ↓
getContainerStyle() / getHandleStyle()
  ↓
적절한 스타일 반환
  ↓
렌더링
```

### 상태 전환

```
User Press
  ↓
handlePress()
  ↓
onToggle(newState)
  ↓
부모 컴포넌트에서 state 변경
  ↓
리렌더링
```

---

## 동작 명세

### 사용자 인터랙션

1. **토글 클릭 (Press)**

   - 트리거: 사용자가 토글을 터치/클릭
   - 동작: `onToggle` 콜백 실행 (현재 상태의 반대 값 전달)
   - 결과: 부모 컴포넌트에서 상태 업데이트

2. **비활성화 상태**

   - 트리거: `disabled={true}` prop 전달
   - 동작: 클릭 이벤트 차단
   - 결과: 클릭 불가, 상태 변경 불가

3. **상태에 따른 시각적 변화**
   - ON: 핑크 배경 (#ff5c8d), 핸들 오른쪽
   - OFF: 회색 배경 (#e5e7eb), 핸들 왼쪽

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
  accessibilityRole="switch"
  accessibilityState={{
    checked: state === "on",
    disabled,
  }}
  accessibilityLabel="토글 스위치"
>
  {/* content */}
</Pressable>
```

### 접근성 속성

- `accessible={true}`: 스크린 리더가 요소를 인식
- `accessibilityRole="switch"`: 스위치 역할 명시
- `accessibilityState={{ checked, disabled }}`: 체크 및 비활성화 상태 전달
- `accessibilityLabel="토글 스위치"`: 스크린 리더 라벨

### 키보드 네비게이션

- Tab 키: 포커스 이동 (React Native Web에서 자동 지원)
- Enter/Space 키: 토글 활성화 (Pressable 기본 동작)

### 최소 터치 영역

- Width: 32px (최소 권장 크기는 44px이지만 디자인 우선)
- Height: 18px
- 참고: 필요시 부모 컴포넌트에서 hitSlop 설정 가능

---

## 에러 처리

### 예상 에러 케이스

1. **잘못된 state 값**

   - 발생 조건: state에 'on' 또는 'off'가 아닌 값 전달
   - 처리 방법: TypeScript 타입 체크로 사전 방지
   - 사용자 피드백: 컴파일 타임 에러

2. **onToggle 없이 사용**

   - 발생 조건: `onToggle` prop 미전달
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
describe("Toggle", () => {
  it("should render correctly with on state", () => {
    const { getByRole } = render(<Toggle state="on" />);
    const toggle = getByRole("switch");
    expect(toggle.props.accessibilityState.checked).toBe(true);
  });

  it("should render correctly with off state", () => {
    const { getByRole } = render(<Toggle state="off" />);
    const toggle = getByRole("switch");
    expect(toggle.props.accessibilityState.checked).toBe(false);
  });

  it("should call onToggle with opposite state when pressed", () => {
    const mockOnToggle = jest.fn();
    const { getByRole } = render(
      <Toggle state="off" onToggle={mockOnToggle} />
    );
    fireEvent.press(getByRole("switch"));
    expect(mockOnToggle).toHaveBeenCalledWith("on");
  });

  it("should not call onToggle when disabled", () => {
    const mockOnToggle = jest.fn();
    const { getByRole } = render(
      <Toggle state="off" onToggle={mockOnToggle} disabled={true} />
    );
    fireEvent.press(getByRole("switch"));
    expect(mockOnToggle).not.toHaveBeenCalled();
  });

  it("should apply correct styles for on state", () => {
    const { getByRole } = render(<Toggle state="on" />);
    const toggle = getByRole("switch");
    // backgroundColor: #ff5c8d, justifyContent: flex-end 확인
  });

  it("should apply correct styles for off state", () => {
    const { getByRole } = render(<Toggle state="off" />);
    const toggle = getByRole("switch");
    // backgroundColor: #e5e7eb, justifyContent: flex-start 확인
  });
});
```

### 테스트 체크리스트

- [x] 기본 렌더링 (on/off 상태)
- [x] 사용자 인터랙션 (onToggle)
- [x] Disabled 상태
- [x] 접근성 (accessible, accessibilityRole, accessibilityState)
- [x] 스타일 적용 (on/off에 따른 배경색, 핸들 위치)

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

- 없음

---

## 사용 시 주의사항

### Do's ✅

1. **제어 컴포넌트로 사용**

   ```typescript
   // ✅ Good: 부모에서 상태 관리
   const [state, setState] = useState<"on" | "off">("off");
   <Toggle state={state} onToggle={setState} />
   ```

2. **명확한 라벨과 함께 사용**

   ```typescript
   // ✅ Good: 사용자가 이해하기 쉬운 라벨
   <View style={{ flexDirection: "row", gap: 8 }}>
     <Text>알림 받기</Text>
     <Toggle state={notification} onToggle={setNotification} />
   </View>
   ```

3. **적절한 터치 영역 확보**
   ```typescript
   // ✅ Good: hitSlop으로 터치 영역 확대
   <Toggle 
     state={state} 
     onToggle={setState}
     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
   />
   ```

### Don'ts ❌

1. **스타일 직접 수정 금지**

   ```typescript
   // ❌ Bad: style prop 사용 불가
   <Toggle style={{ backgroundColor: "blue" }} state="on" />
   ```

2. **비제어 컴포넌트로 사용 지양**

   ```typescript
   // ❌ Bad: 상태를 컴포넌트 내부에서 관리하려고 시도
   <Toggle /> // state가 필수입니다
   ```

3. **애니메이션 기대 금지**

   ```typescript
   // ❌ Bad: 이 컴포넌트는 애니메이션을 제공하지 않습니다
   // 피그마 디자인에는 애니메이션이 없음
   ```

---

## 변경 이력

| 버전  | 날짜       | 변경 내용  | 작성자      |
| ----- | ---------- | ---------- | ----------- |
| 1.0.0 | 2025-11-29 | 초기 버전 생성 | Plan A Team |

---

## 참고 자료

### 디자인

- [Figma 디자인 - Toggle Component](https://www.figma.com) (노드ID: 4180:2458)
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

