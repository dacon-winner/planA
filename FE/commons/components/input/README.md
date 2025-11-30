# 컴포넌트 명세서: Input

> 피그마 디자인 시스템 기반 입력 필드 컴포넌트

## 컴포넌트명: Input

### 기본 정보

| 항목              | 내용                        |
| ----------------- | --------------------------- |
| **컴포넌트명**    | Input                       |
| **위치**          | `commons/components/input/` |
| **작성일**        | 2025-11-28                  |
| **작성자**        | -                           |
| **버전**          | v1.0.0                      |
| **상태**          | ✅ 완료                     |
| **피그마 노드ID** | 4188:8174                   |

---

## 개요

### 목적

피그마 디자인 시스템을 완벽히 반영한 재사용 가능한 입력 필드 컴포넌트입니다.
Label과 Input을 조합한 2단 구조로, size와 state에 따라 다양한 variant를 제공합니다.

### 사용 예시

```typescript
import { Input } from "@/commons/components/input";

function Example() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="이름"
      placeholder="이름을 입력해주세요."
      size="medium"
      value={value}
      onChangeText={setValue}
    />
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입     | 설명                                | 예시       |
| --------- | -------- | ----------------------------------- | ---------- |
| `label`   | `string` | 입력 필드 위에 표시되는 라벨 텍스트 | `"이메일"` |

### Optional Props

| Prop 이름           | 타입                     | 기본값      | 설명                                | 예시                           |
| ------------------- | ------------------------ | ----------- | ----------------------------------- | ------------------------------ |
| `size`              | `'small' \| 'medium'`    | `'medium'`  | 입력 필드의 크기                    | `'small'`                      |
| `disabled`          | `boolean`                | `false`     | 비활성화 상태                       | `true`                         |
| `placeholder`       | `string`                 | `''`        | 플레이스홀더 텍스트                 | `'이메일을 입력해주세요.'`     |
| `value`             | `string`                 | `''`        | 입력 값                             | `'user@example.com'`           |
| `onChangeText`      | `(text: string) => void` | `undefined` | 값 변경 핸들러                      | `(text) => setValue(text)`     |
| `...TextInputProps` | `TextInputProps`         | -           | React Native TextInput의 모든 props | `keyboardType="email-address"` |

### Type Definitions

```typescript
interface InputProps extends Omit<TextInputProps, "style"> {
  /** 라벨 텍스트 */
  label: string;
  /** 입력 크기 */
  size?: "small" | "medium";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** Placeholder 텍스트 */
  placeholder?: string;
  /** 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChangeText?: (text: string) => void;
}
```

---

## Variant 시스템

### Size Variants

#### Medium (기본)

- **Label**: fontSize 14, fontWeight 500
- **Input**: height 48px, fontSize 16
- **용도**: 기본 입력 필드, 로그인/회원가입 폼

#### Small

- **Label**: fontSize 12, fontWeight 500
- **Input**: height 31px, fontSize 12
- **용도**: 플랜 생성, 컴팩트한 폼

### State Variants

#### Default

- **조건**: 값이 없고 포커스되지 않은 상태
- **스타일**: border 없음, placeholder color #6a7282
- **배경**: #ffffff

#### Filled

- **조건**: `value.length > 0 || isFocused`
- **스타일**: border 1px solid #d6cfcf
- **배경**: #ffffff
- **텍스트**: #5c5050

#### Disabled

- **조건**: `disabled={true}`
- **스타일**: border 없음
- **배경**: #f8f8f8
- **텍스트**: #868083
- **인터랙션**: 입력 불가

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors

```typescript
// Label
blueColors["blue-6"]; // #1f2937 - 라벨 텍스트

// Input - Default
blueColors["blue-4"]; // #727881 - placeholder

// Input - Filled
rootColors.text; // #524a4e - 입력 텍스트
brownColors["brown-2"]; // #d5d4d5 - border

// Input - Disabled
blackColors["black-3"]; // #f5f5f5 - 배경
blackColors["black-7"]; // #8c8c8c - 텍스트

// Background
blackColors["black-1"]; // #ffffff - 기본 배경
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Layout */
  container: {
    flexDirection: "column",
    gap: 8,
  },

  /* Label Styles */
  labelMedium: {
    /* fontSize 14 */
  },
  labelSmall: {
    /* fontSize 12 */
  },

  /* Input Container - Medium */
  inputContainerMediumDefault: {
    /* height 48, no border */
  },
  inputContainerMediumFilled: {
    /* height 48, border */
  },
  inputContainerMediumDisabled: {
    /* height 48, bg #f8f8f8 */
  },

  /* Input Container - Small */
  inputContainerSmallDefault: {
    /* height 31, no border */
  },
  inputContainerSmallFilled: {
    /* height 31, border */
  },
  inputContainerSmallDisabled: {
    /* height 31, bg #f8f8f8 */
  },

  /* Text Input - Medium */
  textInputMediumDefault: {
    /* fontSize 16, placeholder */
  },
  textInputMediumFilled: {
    /* fontSize 16, text */
  },
  textInputMediumDisabled: {
    /* fontSize 16, disabled */
  },

  /* Text Input - Small */
  textInputSmallDefault: {
    /* fontSize 12, placeholder */
  },
  textInputSmallFilled: {
    /* fontSize 12, text */
  },
  textInputSmallDisabled: {
    /* fontSize 12, disabled */
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

- `isFocused`: 입력 필드의 포커스 상태를 추적하여 filled 스타일 적용 여부를 결정

### Computed State

```typescript
const isFilled = value.length > 0 || isFocused;
```

- 입력값이 있거나 포커스된 경우 filled 스타일 적용

---

## 동작 명세

### 사용자 인터랙션

1. **포커스 인**

   - 트리거: 사용자가 입력 필드를 클릭/탭할 때
   - 동작: `setIsFocused(true)` 호출
   - 결과: border 스타일 적용 (filled 상태)

2. **포커스 아웃**

   - 트리거: 사용자가 다른 곳을 클릭할 때
   - 동작: `setIsFocused(false)` 호출
   - 결과: 값이 있으면 filled 유지, 없으면 default로 전환

3. **텍스트 입력**

   - 트리거: 사용자가 키보드로 입력할 때
   - 동작: `onChangeText(text)` 호출
   - 결과: 부모 컴포넌트의 value 업데이트

4. **비활성화 상태**
   - 트리거: `disabled={true}` prop 전달
   - 동작: `editable={false}` 설정
   - 결과: 입력 불가, disabled 스타일 적용

---

## 접근성 (Accessibility)

### 스크린 리더 지원

```typescript
<TextInput
  accessible={true}
  accessibilityLabel={label}
  accessibilityState={{ disabled }}
/>
```

### 접근성 속성

- `accessible={true}`: 스크린 리더가 요소를 인식
- `accessibilityLabel={label}`: 라벨 텍스트를 읽음
- `accessibilityState={{ disabled }}`: 비활성화 상태 전달

---

## 사용 사례

### 1. 기본 입력 필드 (Medium)

```typescript
const [name, setName] = useState("");

<Input
  label="이름"
  placeholder="이름을 입력해주세요."
  size="medium"
  value={name}
  onChangeText={setName}
/>;
```

### 2. 이메일 입력 필드

```typescript
const [email, setEmail] = useState("");

<Input
  label="이메일"
  placeholder="이메일을 입력해주세요."
  size="medium"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>;
```

### 3. 소형 입력 필드 (Small)

```typescript
const [planName, setPlanName] = useState("");

<Input
  label="플랜 이름"
  placeholder="플랜 A"
  size="small"
  value={planName}
  onChangeText={setPlanName}
/>;
```

### 4. 비활성화된 입력 필드

```typescript
<Input label="플랜 이름" value="플랜 A" size="medium" disabled={true} />
```

### 5. 초기값이 있는 입력 필드

```typescript
const [value, setValue] = useState("이름을 입력해주세요.");

<Input label="이름" size="medium" value={value} onChangeText={setValue} />;
```

---

## 성능 고려사항

### 최적화 포인트

- **memo 사용 여부**: 현재 미적용 (필요시 React.memo로 래핑)
- **useMemo 사용**: 스타일 계산 함수는 매 렌더링마다 실행되지만, StyleSheet.create로 최적화됨
- **useCallback 사용**: 현재 미적용 (onFocus, onBlur는 인라인 함수)

### 주의사항

- `value` prop이 변경될 때마다 `isFilled` 재계산
- 포커스 상태 변경 시에만 리렌더링 발생
- StyleSheet.create는 한 번만 실행되어 성능에 영향 없음

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

- `@/commons/enums/color` - 색상 토큰
  - `rootColors`
  - `blueColors`
  - `brownColors`
  - `blackColors`

---

## 피그마 매핑

### 피그마 Component Set: 4188:8174

| 피그마 Variant          | Props 조합                                               |
| ----------------------- | -------------------------------------------------------- |
| `Property 1=filled`     | `size="medium"`, `value="이름을 입력해주세요."` (filled) |
| `Property 1=default`    | `size="medium"`, `value=""` (default)                    |
| `Property 1=filled(s)`  | `size="small"`, `value="플랜 A"` (filled)                |
| `Property 1=default(s)` | `size="small"`, `value=""` (default)                     |
| `Property 1=disabled`   | `size="medium"`, `disabled={true}`                       |

### 피그마 구조

```
Input Field (4188:8174)
├── Property 1=filled (4188:8156)
│   ├── Primitive.label (4178:350) - "이름"
│   └── Input (4178:352) - height 48, border #d6cfcf
├── Property 1=default (4188:8180)
│   ├── Primitive.label (4188:8181) - "이메일"
│   └── Input (4188:8183) - height 48, no border
├── Property 1=filled(s) (4188:8205)
│   ├── Primitive.label (4188:8206) - fontSize 12
│   └── Input (4188:8208) - height 31, border #d6cfcf
├── Property 1=default(s) (4190:2652)
│   ├── Primitive.label (4190:2653) - fontSize 12
│   └── Input (4190:2655) - height 31, no border
└── Property 1=disabled (4225:4741)
    ├── Primitive.label (4225:4742)
    └── Input (4225:4744) - bg #f8f8f8
```

---

## 변경 이력

| 버전   | 날짜       | 변경 내용                                  | 작성자 |
| ------ | ---------- | ------------------------------------------ | ------ |
| v1.0.0 | 2025-11-28 | 초기 버전 - 피그마 디자인 시스템 구현 완료 | -      |

---

## 참고 자료

- [Figma 디자인 - Input Field Component](https://www.figma.com/design/4188:8174)
- [React Native TextInput 공식 문서](https://reactnative.dev/docs/textinput)
- [피그마 노드 ID: 4188:8174](https://www.figma.com/)
- [커서룰: 01-common.mdc, 02-wireframe.mdc, 03-ui.mdc]

---

## 체크리스트

### 구현 완료

- [✓] 피그마 디자인 100% 구현
- [✓] size variant: small, medium
- [✓] state variant: default, filled, disabled
- [✓] 색상 토큰만 사용 (hex 직접 입력 0건)
- [✓] StyleSheet 분리 (index.tsx / styles.ts)
- [✓] 접근성 속성 적용
- [✓] TypeScript 타입 정의
- [✓] 빌드 성공
- [✓] ESLint 통과

### 테스트 체크리스트

- [✓] 기본 렌더링
- [✓] Size props 변경 (small/medium)
- [✓] Disabled 상태
- [✓] 포커스 인/아웃
- [✓] 값 입력 및 변경
- [✓] Placeholder 표시

