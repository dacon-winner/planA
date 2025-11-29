/**
 * Calendar Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4183:5016
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

import React, { useState, useRef } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from "./styles";

/**
 * DayCell 상태 타입
 */
export type DayCellState = "default" | "selected" | "today" | "disabled";

/**
 * DayCell Props 타입 정의
 */
export interface DayCellProps {
  /** 날짜 */
  date: Date;
  /** DayCell 상태 */
  state: DayCellState;
  /** 클릭 핸들러 */
  onPress?: () => void;
}

/**
 * DayCell 컴포넌트
 * 날짜 셀을 나타내는 컴포넌트
 */
export const DayCell: React.FC<DayCellProps> = ({ date, state, onPress }) => {
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  /**
   * 컨테이너 스타일 결정
   */
  const getContainerStyle = () => {
    if (state === "selected") {
      return styles.dayCellSelected;
    } else if (state === "today") {
      return styles.dayCellToday;
    } else if (state === "disabled") {
      return styles.dayCellDisabled;
    } else {
      return styles.dayCellDefault;
    }
  };

  /**
   * 텍스트 스타일 결정
   */
  const getTextStyle = () => {
    if (state === "selected") {
      return styles.dayCellTextSelected;
    } else if (state === "today") {
      return styles.dayCellTextToday;
    } else if (state === "disabled") {
      return styles.dayCellTextDisabled;
    } else if (isWeekend) {
      return styles.dayCellTextWeekend;
    } else {
      return styles.dayCellTextDefault;
    }
  };

  const isDisabled = state === "disabled";

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      accessible={!isDisabled}
      accessibilityRole={isDisabled ? "none" : "button"}
      accessibilityLabel={isDisabled ? undefined : `${date.getMonth() + 1}월 ${day}일`}
      accessibilityState={{
        selected: state === "selected",
        disabled: isDisabled,
      }}
    >
      <View style={getContainerStyle()}>
        <Text style={getTextStyle()}>{day}</Text>
      </View>
    </Pressable>
  );
};

/**
 * MonthSection Props 타입 정의
 */
export interface MonthSectionProps {
  /** 연도 */
  year: number;
  /** 월 (1-12) */
  month: number;
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 오늘 날짜 */
  today: Date;
  /** 날짜 선택 핸들러 */
  onDateSelect?: (date: Date) => void;
}

/**
 * MonthSection 컴포넌트
 * 한 달의 캘린더를 표시하는 컴포넌트
 */
export const MonthSection: React.FC<MonthSectionProps> = ({
  year,
  month,
  selectedDate,
  today,
  onDateSelect,
}) => {
  /**
   * 해당 월의 날짜 배열 생성
   */
  const getDaysInMonth = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

    const days: (Date | null)[] = [];

    // 빈 칸 추가 (일요일부터 시작하도록)
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month - 1, day));
    }

    return days;
  };

  /**
   * DayCell 상태 결정
   */
  const getDayCellState = (date: Date): DayCellState => {
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const targetDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // disabled: 오늘 이전 날짜
    if (targetDateOnly < todayDateOnly) {
      return "disabled";
    }

    // selected: 선택된 날짜
    if (
      selectedDate &&
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate()
    ) {
      return "selected";
    }

    // today: 오늘 날짜
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return "today";
    }

    // default
    return "default";
  };

  const days = getDaysInMonth();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View style={styles.monthSection}>
      {/* Month Title */}
      <Text style={styles.monthTitle}>
        {year}년 {month}월
      </Text>

      {/* Subtitle */}
      <Text style={styles.monthSubtitle}>날짜를 선택하세요.</Text>

      {/* Weekday Header */}
      <View style={styles.weekdayHeader}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekdayCell}>
            <Text
              style={
                index === 0 || index === 6
                  ? styles.weekdayTextWeekend
                  : styles.weekdayTextDefault
              }
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Date Grid */}
      <View style={styles.dateGrid}>
        {days.map((date, index) => (
          <View key={index} style={styles.dateCellWrapper}>
            {date ? (
              <DayCell
                date={date}
                state={getDayCellState(date)}
                onPress={() => {
                  const state = getDayCellState(date);
                  if (state !== "disabled" && onDateSelect) {
                    onDateSelect(date);
                  }
                }}
              />
            ) : (
              <View style={styles.dayCellEmpty} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

/**
 * Calendar Props 타입 정의
 */
export interface CalendarProps {
  /** 선택된 날짜 */
  selectedDate?: Date | null;
  /** 날짜 선택 핸들러 */
  onDateSelect?: (date: Date) => void;
  /** 오늘 날짜 (기본값: new Date()) */
  today?: Date;
}

/**
 * Calendar 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 캘린더 컴포넌트
 * 가로 스크롤 구조로 한 달씩 표시되며, 오늘로부터 12개월까지 스크롤 가능
 */
export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  today = new Date(),
}) => {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  const currentSelectedDate = selectedDate !== undefined ? selectedDate : internalSelectedDate;

  /**
   * 날짜 선택 핸들러
   */
  const handleDateSelect = (date: Date) => {
    if (selectedDate === undefined) {
      setInternalSelectedDate(date);
    }
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  /**
   * 향후 12개월 생성
   */
  const getNext12Months = () => {
    const months: Array<{ year: number; month: number }> = [];
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    for (let i = 0; i < 12; i++) {
      const year = currentYear + Math.floor((currentMonth + i - 1) / 12);
      const month = ((currentMonth + i - 1) % 12) + 1;
      months.push({ year, month });
    }

    return months;
  };

  const months = getNext12Months();

  return (
    <View style={styles.calendarContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={360} // 한 달의 너비 (여백 포함)
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
      >
        {months.map((monthData, index) => (
          <MonthSection
            key={`${monthData.year}-${monthData.month}`}
            year={monthData.year}
            month={monthData.month}
            selectedDate={currentSelectedDate}
            today={today}
            onDateSelect={handleDateSelect}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Calendar;

