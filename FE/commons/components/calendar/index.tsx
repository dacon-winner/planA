/**
 * Calendar Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4183:2063, 4183:2068, 4183:2090, 4285:9741, 4285:9735, 4183:7901
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 구조와 로직만 구현 (스타일은 styles.ts에 분리)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] variant 시스템 완전 구현 (default, selected, today, disabled)
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from "./styles";

/**
 * DayCell 상태 타입
 */
export type DayCellState = "default" | "selected" | "today" | "disabled";

/**
 * 날짜 데이터 타입
 */
export interface DateData {
  year: number;
  month: number;
  day: number;
  date: Date;
  state: DayCellState;
}

/**
 * DayCell Props 타입
 */
export interface DayCellProps {
  dateData: DateData;
  isSelected: boolean;
  onPress: (date: Date) => void;
}

/**
 * DayCell 컴포넌트
 * 각 날짜를 나타내는 셀
 */
export const DayCell: React.FC<DayCellProps> = ({
  dateData,
  isSelected,
  onPress,
}) => {
  // 선택된 경우 selected 스타일 우선 적용
  const effectiveState: DayCellState = isSelected ? "selected" : dateData.state;

  const getCellStyle = () => {
    switch (effectiveState) {
      case "selected":
        return [styles.dayCellBase, styles.dayCellSelected];
      case "today":
        return [styles.dayCellBase, styles.dayCellToday];
      case "disabled":
        return [styles.dayCellBase, styles.dayCellDisabled];
      default:
        return [styles.dayCellBase, styles.dayCellDefault];
    }
  };

  const getTextStyle = () => {
    switch (effectiveState) {
      case "selected":
        return styles.dayCellTextSelected;
      case "today":
        return styles.dayCellTextToday;
      case "disabled":
        return styles.dayCellTextDisabled;
      default:
        return styles.dayCellTextDefault;
    }
  };

  const handlePress = () => {
    // disabled 상태일 때는 클릭 불가
    if (dateData.state === "disabled") {
      return;
    }
    onPress(dateData.date);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={dateData.state === "disabled"}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${dateData.month + 1}월 ${dateData.day}일`}
      accessibilityState={{
        selected: isSelected,
        disabled: dateData.state === "disabled",
      }}
      style={getCellStyle()}
    >
      <Text style={getTextStyle()}>{dateData.day}</Text>
    </Pressable>
  );
};

/**
 * 월별 캘린더 섹션 Props
 */
export interface MonthSectionProps {
  year: number;
  month: number;
  today: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

/**
 * MonthSection 컴포넌트
 * 한 달의 캘린더를 표시
 */
export const MonthSection: React.FC<MonthSectionProps> = ({
  year,
  month,
  today,
  selectedDate,
  onDateSelect,
}) => {
  /**
   * 해당 월의 날짜 데이터 생성
   */
  const generateMonthData = (): DateData[][] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay(); // 0: 일요일, 1: 월요일, ...
    const daysInMonth = lastDay.getDate();

    const weeks: DateData[][] = [];
    let currentWeek: DateData[] = [];

    // 첫 주의 빈 셀 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({
        year: 0,
        month: 0,
        day: 0,
        date: new Date(0),
        state: "disabled",
      });
    }

    // 날짜 셀 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateData: DateData = {
        year,
        month,
        day,
        date,
        state: getDayState(date, today),
      };

      currentWeek.push(dateData);

      // 주가 끝나면 (토요일) 다음 주로
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // 마지막 주의 빈 셀 추가
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          year: 0,
          month: 0,
          day: 0,
          date: new Date(0),
          state: "disabled",
        });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

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

  /**
   * 날짜 비교 함수
   */
  const isSameDate = (date1: Date | null, date2: Date): boolean => {
    if (!date1) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const weeks = generateMonthData();

  return (
    <View style={styles.monthSection}>
      <View style={styles.monthGrid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((dateData, dayIndex) => {
              // 빈 셀 처리
              if (dateData.day === 0) {
                return <View key={dayIndex} style={styles.emptyCell} />;
              }

              return (
                <DayCell
                  key={dayIndex}
                  dateData={dateData}
                  isSelected={isSameDate(selectedDate, dateData.date)}
                  onPress={onDateSelect}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

/**
 * Calendar Props 타입
 */
export interface CalendarProps {
  /** 선택된 날짜 (외부 제어) */
  selectedDate?: Date | null;
  /** 날짜 선택 핸들러 */
  onDateSelect?: (date: Date) => void;
  /** 서브타이틀 텍스트 */
  subtitle?: string;
}

/**
 * Calendar 컴포넌트
 * 가로 스크롤 방식의 월별 캘린더
 * 오늘 기준 +12개월까지 표시
 */
export const Calendar: React.FC<CalendarProps> = ({
  selectedDate: controlledSelectedDate,
  onDateSelect,
  subtitle = "날짜를 선택하세요",
}) => {
  const today = new Date();
  const scrollViewRef = useRef<ScrollView>(null);

  // 내부 상태 관리 (Controlled/Uncontrolled 패턴)
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    null
  );

  const selectedDate =
    controlledSelectedDate !== undefined
      ? controlledSelectedDate
      : internalSelectedDate;

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

  const months = generateMonths();

  /**
   * 현재 표시 중인 월 결정
   */
  const getCurrentMonthIndex = (): number => {
    if (!selectedDate) {
      return 0; // 오늘이 속한 월
    }

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();

    const index = months.findIndex(
      (m) => m.year === selectedYear && m.month === selectedMonth
    );

    return index >= 0 ? index : 0;
  };

  const currentMonthIndex = getCurrentMonthIndex();
  const currentMonth = months[currentMonthIndex];

  /**
   * 날짜 선택 핸들러
   */
  const handleDateSelect = (date: Date) => {
    // 내부 상태 업데이트
    if (controlledSelectedDate === undefined) {
      setInternalSelectedDate(date);
    }

    // 외부 핸들러 호출
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  /**
   * 월 타이틀 포맷
   */
  const formatMonthTitle = (year: number, month: number): string => {
    return `${year}년 ${month + 1}월`;
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Month Title */}
        <View style={styles.monthTitleContainer}>
          <Text style={styles.monthTitle}>
            {formatMonthTitle(currentMonth.year, currentMonth.month)}
          </Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Weekday Header */}
      <View style={styles.weekdayHeaderContainer}>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextSunday}>일</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextWeekday}>월</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextWeekday}>화</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextWeekday}>수</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextWeekday}>목</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextWeekday}>금</Text>
        </View>
        <View style={styles.weekdayCell}>
          <Text style={styles.weekdayTextSaturday}>토</Text>
        </View>
      </View>

      {/* Scrollable Month Sections */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={264} // 248 (월 섹션 너비) + 16 (마진)
        snapToAlignment="start"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        accessible={true}
        accessibilityLabel="월별 캘린더"
      >
        {months.map((monthData, index) => (
          <MonthSection
            key={`${monthData.year}-${monthData.month}`}
            year={monthData.year}
            month={monthData.month}
            today={today}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Calendar;
