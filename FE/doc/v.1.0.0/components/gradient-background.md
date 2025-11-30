# GradientBackground 컴포넌트

페이지 배경에 그라데이션 이미지를 적용하기 위한 공통 컴포넌트입니다.

## 버전

- **버전**: 1.0.0
- **생성 시각**: 2025-11-30

## 개요

다양한 페이지에서 일관된 배경 그라데이션을 적용할 수 있도록 만들어진 재사용 가능한 컴포넌트입니다.

## Props

| Prop   | Type                | Default                          | Description      |
| ------ | ------------------- | -------------------------------- | ---------------- |
| source | ImageSourcePropType | require("@/assets/Gradient.png") | 배경 이미지 소스 |
| top    | number              | 0                                | 상단 위치 조정   |
| left   | number              | 0                                | 좌측 위치 조정   |
| zIndex | number              | 0                                | z-index 값       |

## 사용 예시

### 기본 사용

```tsx
import { View, ScrollView } from "react-native";
import { GradientBackground } from "@/commons/components/gradient-background";

export function MyPage() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <GradientBackground />
      <ScrollView>{/* 페이지 컨텐츠 */}</ScrollView>
    </View>
  );
}
```

### 위치 조정

```tsx
<GradientBackground top={-50} left={20} zIndex={-1} />
```

### 다른 배경 이미지 사용

```tsx
<GradientBackground source={require("@/assets/CustomGradient.png")} />
```

## 주의사항

1. **부모 컨테이너**: 부모 View는 `position: 'relative'`를 가져야 합니다.
2. **z-index**: 컨텐츠가 배경 위에 표시되도록 적절한 z-index를 설정하세요.
3. **레이아웃**: 배경은 absolute positioning을 사용하므로 레이아웃 흐름에 영향을 주지 않습니다.

## 스타일 규칙 준수

- [x] StyleSheet 전용
- [x] position absolute 사용 (배경 레이어 목적)
- [x] 재사용 가능한 구조
- [x] Props를 통한 커스터마이징 가능
