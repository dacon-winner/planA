# SelectButton 컴포넌트

## 개요

피그마 디자인 시스템을 기반으로 한 재사용 가능한 선택 버튼 컴포넌트입니다.

## 버전 정보

- **버전**: v1.0.0
- **생성일**: 2025-11-29
- **피그마 노드ID**: 4116:600

## 특징

- ✅ 2가지 상태: `default`, `selected`
- ✅ 2가지 크기: `small`, `medium`
- ✅ 아이콘 지원 (선택사항)
- ✅ 단일 선택 그룹 지원 (SelectButtonGroup)
- ✅ 완전한 접근성 지원
- ✅ TypeScript 타입 지원

## 기본 사용법

### 단일 SelectButton

```tsx
import { SelectButton } from "@/commons/components/select-button";
import { MapPin } from "lucide-react-native";
import { brownColors } from "@/commons/enums/color";

function MyComponent() {
  const [selected, setSelected] = React.useState(false);

  return (
    <SelectButton
      state={selected ? "selected" : "default"}
      label="강남구"
      size="medium"
      icon={<MapPin size={20} color={selected ? "#861043" : brownColors["brown-2"]} />}
      onSelect={() => setSelected(!selected)}
    />
  );
}
```

### SelectButtonGroup (권장)

```tsx
import { SelectButtonGroup } from "@/commons/components/select-button";
import { MapPin, Clock } from "lucide-react-native";

function MyComponent() {
  const [selectedValue, setSelectedValue] = React.useState("gangnam");

  const options = [
    {
      value: "gangnam",
      label: "강남구",
      icon: <MapPin size={20} />,
    },
    {
      value: "seocho",
      label: "서초구",
      icon: <MapPin size={20} />,
    },
    {
      value: "songpa",
      label: "송파구",
      icon: <MapPin size={20} />,
    },
  ];

  return (
    <SelectButtonGroup
      value={selectedValue}
      onChange={setSelectedValue}
      options={options}
      size="medium"
      direction="horizontal"
    />
  );
}
```

## Props

### SelectButton Props

| Prop       | Type                      | Default    | Required | Description             |
| ---------- | ------------------------- | ---------- | -------- | ----------------------- |
| `state`    | `'default' \| 'selected'` | -          | ✅       | 버튼 상태               |
| `label`    | `string`                  | -          | ✅       | 버튼 라벨 텍스트        |
| `size`     | `'small' \| 'medium'`     | `'medium'` | ❌       | 버튼 크기               |
| `onSelect` | `() => void`              | -          | ❌       | 선택 시 호출되는 콜백   |
| `disabled` | `boolean`                 | `false`    | ❌       | 비활성화 상태           |
| `value`    | `string`                  | -          | ❌       | 버튼 값 (그룹에서 사용) |
| `icon`     | `React.ReactNode`         | -          | ❌       | 아이콘 컴포넌트         |

### SelectButtonGroup Props

| Prop        | Type                             | Default        | Required | Description    |
| ----------- | -------------------------------- | -------------- | -------- | -------------- |
| `value`     | `string`                         | -              | ✅       | 현재 선택된 값 |
| `onChange`  | `(value: string) => void`        | -              | ✅       | 값 변경 핸들러 |
| `options`   | `Array<{ value, label, icon? }>` | -              | ✅       | 선택 옵션 배열 |
| `size`      | `'small' \| 'medium'`            | `'medium'`     | ❌       | 버튼 크기      |
| `direction` | `'horizontal' \| 'vertical'`     | `'horizontal'` | ❌       | 정렬 방향      |
| `disabled`  | `boolean`                        | `false`        | ❌       | 비활성화 상태  |
| `style`     | `object`                         | -              | ❌       | 커스텀 스타일  |

## 사용 예시

### 아이콘 없는 버튼

```tsx
<SelectButton
  state="default"
  label="1,000만원"
  size="medium"
  onSelect={() => console.log("selected")}
/>
```

### 작은 크기 시간 선택 버튼

```tsx
import { Clock } from "lucide-react-native";
import { brownColors } from "@/commons/enums/color";

const [selected, setSelected] = React.useState(true);

<SelectButton
  state={selected ? "selected" : "default"}
  label="09:00"
  size="small"
  icon={<Clock size={16} color={selected ? "#861043" : brownColors["brown-2"]} />}
  onSelect={() => setSelected(!selected)}
/>;
```

### 지역 선택 그룹 (수직 정렬)

```tsx
const [region, setRegion] = React.useState("gangnam");

const regions = [
  { value: "gangnam", label: "강남구" },
  { value: "seocho", label: "서초구" },
  { value: "songpa", label: "송파구" },
  { value: "jongno", label: "종로구" },
];

<SelectButtonGroup
  value={region}
  onChange={setRegion}
  options={regions}
  size="medium"
  direction="vertical"
/>;
```

### 예산 선택 그룹

```tsx
const [budget, setBudget] = React.useState("1000");

const budgets = [
  { value: "1000", label: "1,000만원" },
  { value: "3000", label: "3,000만원" },
  { value: "5000", label: "5,000만원" },
  { value: "10000", label: "1억원" },
];

<SelectButtonGroup
  value={budget}
  onChange={setBudget}
  options={budgets}
  size="medium"
  direction="horizontal"
/>;
```

## 디자인 토큰

### 색상

- **Default 상태**

  - Border: `#e5e7eb` (root.navigation)
  - Text: `#364153`
  - Icon: `#d5d4d5` (brownColors['brown-2'])
  - Background: `transparent`

- **Selected 상태**
  - Border: `#e60076`
  - Text: `#861043`
  - Icon: `#861043`
  - Background: `#fdf2f8`

### 크기

- **Medium**: 142px × 84px (아이콘 있음), 141px × 60px (아이콘 없음)
- **Small**: 112px × 68px

### 타이포그래피

- **Medium**: 16px / 500 / 24px line-height
- **Small**: 14px / 500 / 20px line-height

## 접근성

- `accessibilityRole="button"` 설정
- `accessibilityState`로 선택/비활성화 상태 전달
- `accessibilityLabel`로 버튼 라벨 제공
- 최소 44×44 터치 영역 보장

## 파일 구조

```
select-button/
├── index.tsx          # 컴포넌트 구현
├── styles.ts          # 스타일 정의
├── prompts/           # 구현 프롬프트
│   └── prompt.101.ui.txt
└── README.md          # 사용 가이드 (본 문서)
```

## 주의사항

1. SelectButtonGroup 사용 시 각 옵션의 `value`는 고유해야 합니다
2. 아이콘 색상은 상태에 따라 직접 조정해야 합니다
   - Default 상태: `brownColors['brown-2']` (#d5d4d5)
   - Selected 상태: `#861043`
3. 그룹 사용 시 하나의 값만 선택됩니다 (단일 선택)
4. `direction="horizontal"` 사용 시 flexWrap이 적용되어 자동 줄바꿈됩니다

## 변경 이력

- **v1.0.0** (2025-11-29): 초기 릴리즈
  - 기본 SelectButton 컴포넌트
  - SelectButtonGroup 컴포넌트
  - 2가지 상태, 2가지 크기 지원
  - 아이콘 지원
