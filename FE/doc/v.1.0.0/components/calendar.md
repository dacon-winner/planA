# 컴포넌트 명세서: Calendar

> 가로 스크롤 방식의 월별 캘린더 컴포넌트

## 컴포넌트명: Calendar

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Calendar |
| **위치** | `commons/components/calendar/` |
| **작성일** | 2025-11-29 |
| **작성자** | - |
| **버전** | 1.0.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
사용자가 날짜를 선택할 수 있는 캘린더 UI를 제공합니다. 가로 스크롤 방식으로 여러 달을 탐색할 수 있으며, 오늘 이후의 날짜만 선택 가능합니다.

### 주요 기능
- 가로 스크롤 방식의 월별 캘린더
- 오늘 기준 +12개월까지 표시
- 단일 날짜 선택
- 오늘 이전 날짜는 비활성화
- Controlled/Uncontrolled 패턴 지원
- Momentum scroll 지원

### 사용 예시
```typescript
import { Calendar } from '@/commons/components/calendar';

function Example() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <Calendar
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      subtitle="날짜를 선택하세요"
    />
  );
}
```

---

## Props 명세

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `selectedDate` | `Date \| null` | `undefined` | 선택된 날짜 (외부 제어) | `new Date()` |
| `onDateSelect` | `(date: Date) => void` | `undefined` | 날짜 선택 시 호출되는 콜백 | `(date) => console.log(date)` |
| `subtitle` | `string` | `"날짜를 선택하세요"` | 서브타이틀 텍스트 | `"원하는 날짜를 선택해주세요"` |

### Type Definitions

```typescript
// Calendar Props
export interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  subtitle?: string;
}

// DayCell 상태 타입
export type DayCellState = "default" | "selected" | "today" | "disabled";

// 날짜 데이터 타입
export interface DateData {
  year: number;
  month: number;
  day: number;
  date: Date;
  state: DayCellState;
}

// DayCell Props
export interface DayCellProps {
  dateData: DateData;
  isSelected: boolean;
  onPress: (date: Date) => void;
  isFirstInRow?: boolean;
}

// MonthSection Props
export interface MonthSectionProps {
  year: number;
  month: number;
  today: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  width: number;
  subtitle: string;
}
```

---

## 스타일 명세

### 피그마 디자인 참조

| 노드 ID | 설명 |
|---------|------|
| `4183:2063` | 월 타이틀 + 서브 타이틀 |
| `4183:2068` | 요일 헤더 (일~토) |
| `4183:2090` | 날짜 셀 - default |
| `4285:9741` | 날짜 셀 - today |
| `4285:9735` | 날짜 셀 - disabled |
| `4183:7901` | 날짜 셀 - selected |

### 사용하는 디자인 토큰

#### Colors
```typescript
// 월 타이틀
#ff6593  // 브랜드 핑크

// 서브타이틀
#6a7282  // 그레이

// 요일 헤더
#fb2c36  // 일요일 (빨강)
#4a5565  // 평일 (진한 그레이)
#2b7fff  // 토요일 (파랑)

// 날짜 셀
#101828  // default 텍스트
rgba(92, 80, 80, 0.2)    // today 배경
#5c5050  // today 텍스트
#d1d5dc  // disabled 텍스트
rgba(230, 68, 133, 0.8)  // selected 배경
#ffffff  // selected 텍스트
```

#### Typography
```typescript
// 월 타이틀
fontFamily: "Pretendard Variable"
fontWeight: 700
fontSize: 16px
lineHeight: 24px
letterSpacing: -0.3125px

// 서브타이틀, 요일 헤더, 날짜
fontFamily: "Pretendard Variable"
fontWeight: 400/700
fontSize: 14px/16px
lineHeight: 20px/24px
```

#### Layout
```typescript
// 캘린더 섹션 너비
MONTH_WIDTH: 280px
CALENDAR_GRID_WIDTH: 248px

// 셀 크기
DAY_CELL: 29x29px
WEEKDAY_CELL: 29x20px

// 간격
CELL_MARGIN: 7.5px (첫 번째 제외)
ROW_MARGIN_BOTTOM: 8px
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* Layout */
  calendarContainer: { /* 전체 컨테이너 */ },
  headerContainer: { /* 헤더 영역 */ },
  weekdayHeaderContainer: { /* 요일 헤더 */ },
  scrollView: { /* 스크롤 뷰 */ },
  monthSection: { /* 월별 섹션 */ },
  monthGrid: { /* 달력 그리드 */ },
  weekRow: { /* 주 행 */ },
  
  /* Components */
  monthTitleContainer: { /* 월 타이틀 */ },
  subtitleContainer: { /* 서브타이틀 */ },
  weekdayCell: { /* 요일 셀 */ },
  dayCellBase: { /* 날짜 셀 기본 */ },
  
  /* States */
  dayCellDefault: { /* 기본 상태 */ },
  dayCellToday: { /* 오늘 */ },
  dayCellSelected: { /* 선택됨 */ },
  dayCellDisabled: { /* 비활성 */ },
});
```

---

## 상태 관리

### 내부 상태
```typescript
// 선택된 날짜 (Uncontrolled)
const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

// 현재 보이는 월 인덱스
const [currentVisibleMonthIndex, setCurrentVisibleMonthIndex] = useState(0);
```

### 상태 설명
- `internalSelectedDate`: Uncontrolled 모드에서 사용하는 내부 선택 날짜 상태
- `currentVisibleMonthIndex`: 스크롤 시 현재 화면에 보이는 월의 인덱스 (0-12)

### Controlled vs Uncontrolled
```typescript
// Controlled: 외부에서 상태 관리
const [date, setDate] = useState<Date | null>(null);
<Calendar selectedDate={date} onDateSelect={setDate} />

// Uncontrolled: 내부에서 상태 관리
<Calendar onDateSelect={(date) => console.log(date)} />
```

---

## 동작 명세

### 사용자 인터랙션

1. **가로 스크롤**
   - 트리거: 사용자가 좌우로 스크롤
   - 동작: 다음/이전 월로 이동
   - 결과: 
     - 280px 단위로 스냅
     - 월 타이틀, 요일 헤더, 달력이 함께 이동
     - currentVisibleMonthIndex 업데이트

2. **날짜 선택**
   - 트리거: 사용자가 날짜 셀 클릭
   - 동작: 
     - disabled 상태가 아닌 경우에만 선택 가능
     - 이전 선택 해제, 새 날짜 선택
   - 결과: 
     - 선택된 날짜 셀이 selected 스타일로 변경
     - onDateSelect 콜백 호출

3. **Disabled 날짜 클릭**
   - 트리거: 오늘 이전 날짜 클릭
   - 동작: 아무 반응 없음
   - 결과: 선택 상태 변경 없음

### 생명주기

```typescript
// 스크롤 이벤트 리스너
const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const scrollX = event.nativeEvent.contentOffset.x;
  const monthIndex = Math.round(scrollX / MONTH_WIDTH);
  
  if (monthIndex >= 0 && monthIndex < months.length) {
    setCurrentVisibleMonthIndex(monthIndex);
  }
};
```

---

## DayCell Variant 시스템

### 4가지 상태

1. **default**
   - 조건: 오늘 이후의 기본 날짜
   - 스타일:
     - 배경: 투명
     - 텍스트: #101828, Regular, 16px
     - borderRadius: 10px

2. **today**
   - 조건: 오늘 날짜
   - 스타일:
     - 배경: rgba(92, 80, 80, 0.2)
     - 텍스트: #5c5050, Bold, 16px
     - borderRadius: 15px

3. **selected**
   - 조건: 사용자가 선택한 날짜
   - 스타일:
     - 배경: rgba(230, 68, 133, 0.8)
     - 텍스트: #ffffff, Bold, 16px
     - borderRadius: 15px
   - 우선순위: 오늘 날짜가 선택된 경우 selected 스타일 우선

4. **disabled**
   - 조건: 오늘 이전 날짜
   - 스타일:
     - 배경: 투명
     - 텍스트: #d1d5dc, Regular, 16px
     - borderRadius: 10px
   - 동작: 클릭/포커스 불가

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
// ScrollView
<ScrollView
  accessible={true}
  accessibilityLabel="월별 캘린더"
/>

// DayCell
<Pressable
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel={`${month + 1}월 ${day}일`}
  accessibilityState={{
    selected: isSelected,
    disabled: state === "disabled",
  }}
/>
```

### 접근성 체크리스트
- ✅ accessibilityRole 설정
- ✅ accessibilityLabel 제공
- ✅ accessibilityState로 상태 전달
- ✅ disabled 상태 처리
- ✅ 충분한 터치 타겟 크기 (29x29px)
- ✅ 명도 대비 적절하게 유지

---

## 구조

### 컴포넌트 계층

```
Calendar
└── ScrollView
    └── MonthSection (반복: 오늘 ~ +12개월)
        ├── Header
        │   ├── MonthTitle (예: "2025년 11월")
        │   └── Subtitle (예: "날짜를 선택하세요")
        ├── WeekdayHeader
        │   └── WeekdayCell x7 (일~토)
        └── MonthGrid
            └── WeekRow (반복: 4-6주)
                └── DayCell x7 (또는 EmptyCell)
```

### 파일 구조

```
commons/components/calendar/
├── index.tsx          # 컴포넌트 로직
├── styles.ts          # 스타일 정의
├── README.md          # 명세서 (이 문서)
└── prompts/
    └── prompt.101.ui.txt  # 구현 요구사항
```

---

## 알고리즘

### 월별 데이터 생성

```typescript
/**
 * 오늘 기준 +12개월의 월 데이터 생성
 */
const generateMonths = (): Array<{ year: number; month: number }> => {
  const months: Array<{ year: number; month: number }> = [];
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  for (let i = 0; i <= 12; i++) {
    const targetMonth = currentMonth + i;
    const year = currentYear + Math.floor(targetMonth / 12);
    const month = targetMonth % 12;
    months.push({ year, month });
  }

  return months;
};
```

### 날짜 상태 결정

```typescript
/**
 * 날짜 상태 결정
 */
const getDayState = (date: Date, today: Date): DayCellState => {
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // 오늘 이전 날짜는 disabled
  if (dateOnly < todayOnly) {
    return "disabled";
  }

  // 오늘 날짜
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "today";
  }

  // 기본 상태
  return "default";
};
```

---

## 성능 고려사항

### 최적화 포인트
- **월 데이터 계산**: 컴포넌트 마운트 시 한 번만 계산
- **날짜 비교**: 시간 정보를 제거한 Date 객체로 비교
- **스크롤 이벤트**: `scrollEventThrottle={16}`으로 성능 최적화
- **조건부 렌더링**: 빈 셀은 EmptyCell로 처리하여 불필요한 렌더링 방지

### 주의사항
- 13개월(오늘 ~ +12개월) 데이터만 생성하여 메모리 사용 최소화
- MonthSection 컴포넌트는 key prop으로 `${year}-${month}` 사용
- DayCell의 상태 변경 시에만 리렌더링 발생

---

## 제약사항

### 날짜 선택 제한
- 오늘 이전 날짜는 선택 불가 (disabled)
- 오늘 ~ +12개월 범위만 표시
- 단일 날짜만 선택 가능 (다중 선택 미지원)

### 스크롤 제한
- 좌측 끝: 오늘이 속한 월
- 우측 끝: 오늘 +12개월
- 총 13개월만 스크롤 가능

### 스타일 제약
- 고정된 너비: 280px (캘린더 248px + 여백 32px)
- 반응형 미지원 (고정 크기)
- 커스텀 스타일 props 미제공

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
- `./styles` - 스타일 정의

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-29 | 초기 버전 구현 | - |

### 주요 커밋 이력

1. **feat: 가로 스크롤 캘린더 컴포넌트 구현**
   - 기본 캘린더 UI 구현
   - DayCell variant 시스템
   - 날짜 선택 기능

2. **fix: 캘린더 스크롤 및 월별 타이틀 동기화 개선**
   - 월 섹션 너비 280px 고정
   - 스크롤 시 타이틀 자동 업데이트

3. **fix: 달력 주차 수에 따른 시작 위치 정렬 수정**
   - justifyContent를 flex-start로 변경

4. **fix: 월 타이틀과 달력 중앙 정렬 맞춤**
   - 모든 요소 너비 248px 통일

5. **fix: 요일 헤더와 날짜 셀 정렬 정확히 맞춤**
   - marginLeft를 이용한 정렬

6. **refactor: 월 타이틀과 요일 헤더가 달력과 함께 스크롤되도록 구조 개선**
   - MonthSection 내에 헤더 통합

7. **fix: 한 번에 하나의 달력만 보이도록 ScrollView 너비 제한**
   - ScrollView 너비 280px 고정

---

## 참고 자료

### 피그마 디자인
- [공통컴포넌트 디자인](피그마 링크)
  - 노드 ID: 4183:2063, 4183:2068, 4183:2090, 4285:9741, 4285:9735, 4183:7901

### 관련 문서
- [컴포넌트 템플릿](/doc/v.1.0.0/component-template.md)
- [커서룰: 01-common](/FE/01-common.mdc)
- [커서룰: 02-wireframe](/FE/02-wireframe.mdc)

### 구현 참고
- React Native ScrollView
- React Native Pressable
- React Native StyleSheet

