# Card Component

정책 정보를 표시하는 카드 컴포넌트입니다.

## 버전
- v1.0.0

## Figma
- 노드 ID: 4174:1462
- URL: https://www.figma.com/design/ts4rknjsqv0LEfLMbSlL5E/plan-A---FE?node-id=4174-1462&m=dev

## 사용된 공통 컴포넌트
- `BadgePolicy`: 정책 카테고리 뱃지 (대출, 상시 등)
- `Button`: 신청하기 버튼
- `CircleCheck` (lucide-react-native): 혜택 섹션 아이콘

## Props

```typescript
interface CardProps {
  /** 정책 카테고리 (대출/상시/기간제/보조금) */
  categories: Array<"loan" | "always" | "period" | "subsidy">;
  /** 정책 제목 */
  title: string;
  /** 정책 간단 설명 */
  description: string;
  /** 혜택 정보 */
  benefits: {
    /** 혜택 텍스트 */
    text: string;
    /** 혜택 금액 */
    amount: string;
  };
  /** 상세 정보 목록 */
  details: Array<{
    /** 아이콘 (이모지) */
    icon: string;
    /** 상세 텍스트 */
    text: string;
  }>;
  /** 전체 상세 설명 */
  fullDescription: string;
  /** 신청하기 버튼 클릭 핸들러 */
  onApply?: () => void;
  /** 카드 클릭 핸들러 (optional) */
  onPress?: () => void;
}
```

## 사용 예시

```tsx
import { Card } from "@/commons/components/card";

// 기본 사용
<Card
  categories={["loan", "always"]}
  title="신혼부부 전세자금 대출"
  description="무주택 신혼부부를 위한 저금리 전세자금 대출"
  benefits={{
    text: "연 1.2~2.1% 저금리 대출",
    amount: "최대 20,000만원"
  }}
  details={[
    { icon: "📋", text: "주택도시기금" },
    { icon: "ℹ️", text: "혼인신고 후 7년 이내, 부부합산 소득 7천만원 이하" },
    { icon: "📅", text: "신청기한: 상시" }
  ]}
  fullDescription="무주택 세대주인 신혼부부(혼인신고일로부터 7년 이내)를 대상으로 연 1.2~2.1%의 저금리로 최대 2억원까지 전세자금을 대출해드립니다."
  onApply={() => console.log("신청하기 클릭")}
/>

// 카드 전체 클릭 이벤트 추가
<Card
  {...props}
  onPress={() => console.log("카드 클릭")}
  onApply={() => console.log("신청하기 클릭")}
/>
```

## 구조

1. **뱃지 섹션**: 정책 카테고리 뱃지들 (대출, 상시 등)
2. **제목**: 정책 제목
3. **설명**: 정책 간단 설명
4. **혜택 박스**: 
   - 체크 아이콘 + "지원 혜택" 라벨
   - 혜택 내용
   - 혜택 금액 (강조)
5. **상세 정보**: 이모지 아이콘 + 텍스트 (최대 3줄)
6. **구분선 + 전체 설명**: 정책 상세 설명
7. **신청하기 버튼**: 신청 액션 버튼

## 스타일

- **크기**: 345px 고정 너비
- **배경**: 흰색
- **테두리**: 1px, rgba(82, 74, 78, 0.1)
- **모서리**: 14px 라운드
- **패딩**: 20px
- **간격**: 12px (컨텐츠 간)

## 접근성

- 카드 전체에 `onPress`가 있는 경우 `accessibilityRole="button"` 적용
- 버튼은 `Button` 컴포넌트에서 접근성 자동 처리

## 주의사항

- 모든 색상은 `commons/enums/color.ts`의 토큰 사용
- StyleSheet는 `styles.ts`에 분리
- 이모지 아이콘은 `details`의 `icon` prop으로 전달
- `CircleCheck` 아이콘은 lucide-react-native 사용 (이미 설치됨)

