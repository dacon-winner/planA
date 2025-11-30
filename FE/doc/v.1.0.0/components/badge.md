# Badge 컴포넌트 명세서

> 이 문서는 Badge와 BadgePolicy 컴포넌트를 작성할 때 사용하는 표준 템플릿입니다.

## 컴포넌트명: Badge

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Badge |
| **위치** | `commons/components/badge/` |
| **작성일** | 2025-01-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
Badge 컴포넌트는 콘텐츠의 상태나 카테고리를 시각적으로 표시하기 위한 컴포넌트입니다. variant에 따라 자동으로 텍스트와 아이콘이 결정되어 일관된 디자인을 유지합니다.

### 사용 예시
```typescript
import { Badge } from '@/commons/components/badge';

function Example() {
  return (
    <View>
      <Badge variant="summary" />
      <Badge variant="ai" />
      <Badge variant="plan" />
    </View>
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `variant` | `'summary' \| 'ai' \| 'plan'` | 뱃지의 유형을 지정 | `"summary"` |

### Type Definitions

```typescript
interface BadgeProps {
  variant: 'summary' | 'ai' | 'plan';
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.red['red-1']        // 요약 뱃지 배경색
colors.root.brand          // AI 뱃지 배경색, 요약 뱃지 글자색
colors.secondary['secondary-600'] // 대표 플랜 뱃지 배경색
colors.black['black-1']    // 흰색 텍스트
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Badge 컴포넌트 */
  'badgeSummaryContainer': { /* 요약 뱃지 컨테이너 */ },
  'badgeSummaryText': { /* 요약 뱃지 텍스트 */ },
  'badgeSummaryIcon': { /* 요약 뱃지 아이콘 */ },
  'badgeAiContainer': { /* AI 뱃지 컨테이너 */ },
  'badgeAiText': { /* AI 뱃지 텍스트 */ },
  'badgeAiIcon': { /* AI 뱃지 아이콘 */ },
  'badgePlanContainer': { /* 대표 플랜 뱃지 컨테이너 */ },
  'badgePlanText': { /* 대표 플랜 뱃지 텍스트 */ },
  'badgePlanIcon': { /* 대표 플랜 뱃지 아이콘 */ },
});
```

---

## 동작 명세

### 사용자 인터랙션

컴포넌트는 정적인 표시 용도로 사용되며, 사용자 인터랙션은 없습니다.

### Variant별 표시 내용

1. **summary**
   - 아이콘: FileText (문서 아이콘)
   - 텍스트: "요약"
   - 스타일: 연한 핑크 배경, 브랜드 색상 텍스트

2. **ai**
   - 아이콘: Bot (로봇 아이콘)
   - 텍스트: "AI"
   - 스타일: 브랜드 색상 배경, 흰색 텍스트

3. **plan**
   - 아이콘: Crown (왕관 아이콘)
   - 텍스트: "대표 플랜"
   - 스타일: 회색 배경, 흰색 텍스트

---

## 의존성

### 필수 라이브러리
```json
{
  "lucide-react-native": "^0.555.0",
  "react-native": "0.81.5"
}
```

### 내부 의존성
- `@/commons/enums/color`
- `@/commons/components/badge/styles`

---

## 컴포넌트명: BadgePolicy

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | BadgePolicy |
| **위치** | `commons/components/badge/` |
| **작성일** | 2025-01-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
BadgePolicy 컴포넌트는 정책 관련 정보를 표시하기 위한 컴포넌트입니다. 텍스트만 표시하며, 배경색과 테두리로 상태를 구분합니다.

### 사용 예시
```typescript
import { BadgePolicy } from '@/commons/components/badge';

function Example() {
  return (
    <View>
      <BadgePolicy variant="loan" />
      <BadgePolicy variant="always" />
      <BadgePolicy variant="period" />
      <BadgePolicy variant="subsidy" />
    </View>
  );
}
```

---

## Props 명세

### Required Props

| Prop 이름 | 타입 | 설명 | 예시 |
|-----------|------|------|------|
| `variant` | `'loan' \| 'always' \| 'period' \| 'subsidy'` | 정책 뱃지의 유형을 지정 | `"loan"` |

### Type Definitions

```typescript
interface BadgePolicyProps {
  variant: 'loan' | 'always' | 'period' | 'subsidy';
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.secondary['secondary-100'] // 대출 뱃지 배경색
colors.root.brand                 // 브랜드 색상 (배경/테두리/텍스트)
colors.black['black-1']           // 흰색 텍스트
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* BadgePolicy 컴포넌트 */
  'badgePolicyLoanContainer': { /* 대출 뱃지 컨테이너 */ },
  'badgePolicyLoanText': { /* 대출 뱃지 텍스트 */ },
  'badgePolicyAlwaysContainer': { /* 상시 뱃지 컨테이너 */ },
  'badgePolicyAlwaysText': { /* 상시 뱃지 텍스트 */ },
  'badgePolicyPeriodContainer': { /* 기간제 뱃지 컨테이너 */ },
  'badgePolicyPeriodText': { /* 기간제 뱃지 텍스트 */ },
  'badgePolicySubsidyContainer': { /* 보조금 뱃지 컨테이너 */ },
  'badgePolicySubsidyText': { /* 보조금 뱃지 텍스트 */ },
});
```

---

## 동작 명세

### 사용자 인터랙션

컴포넌트는 정적인 표시 용도로 사용되며, 사용자 인터랙션은 없습니다.

### Variant별 표시 내용

1. **loan**
   - 텍스트: "대출"
   - 스타일: 연한 핑크 배경, 브랜드 색상 텍스트

2. **always**
   - 텍스트: "상시"
   - 스타일: 투명 배경, 브랜드 색상 테두리와 텍스트

3. **period**
   - 텍스트: "기간제"
   - 스타일: 투명 배경, 브랜드 색상 테두리와 텍스트

4. **subsidy**
   - 텍스트: "보조금"
   - 스타일: 브랜드 색상 배경, 흰색 텍스트

---

## 의존성

### 필수 라이브러리
```json
{
  "react-native": "0.81.5"
}
```

### 내부 의존성
- `@/commons/enums/color`
- `@/commons/components/badge/styles`

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-01-29 | 초기 버전 | - |

---

## 참고 자료
- [Figma 디자인](https://www.figma.com/design/d6pu0ncj)
- [lucide-react-native](https://lucide.dev/)


