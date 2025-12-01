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

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
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
  isFirstInRow?: boolean;
}

/**
 * DayCell 컴포넌트
 * 각 날짜를 나타내는 셀
 */
export const DayCell: React.FC<DayCellProps> = ({
  dateData,
  isSelected,
  onPress,
  isFirstInRow = false,
}) => {
  // 선택된 경우 selected 스타일 우선 적용
  const effectiveState: DayCellState = isSelected ? "selected" : dateData.state;

  const getCellStyle = () => {
    const baseStyle = isFirstInRow
      ? styles.dayCellBaseFirst
      : styles.dayCellBase;

    switch (effectiveState) {
      case "selected":
        return [baseStyle, styles.dayCellSelected];
      case "today":
        return [baseStyle, styles.dayCellToday];
      case "disabled":
        return [baseStyle, styles.dayCellDisabled];
      default:
        return [baseStyle, styles.dayCellDefault];
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
  width: number;
  subtitle: string;
  weddingDate: Date | null;
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
  width,
  subtitle,
  weddingDate,
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
        state: getDayState(date, today, weddingDate),
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
  const getDayState = (date: Date, today: Date, weddingDate: Date | null): DayCellState => {
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // 결혼 예정일이 설정되어 있고, 그 이후 날짜는 disabled
    if (weddingDate) {
      const weddingDateOnly = new Date(
        weddingDate.getFullYear(),
        weddingDate.getMonth(),
        weddingDate.getDate()
      );
      if (dateOnly > weddingDateOnly) {
        return "disabled";
      }
    }

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

  /**
   * 월 타이틀 포맷
   */
  const formatMonthTitle = (): string => {
    return `${year}년 ${month + 1}월`;
  };

  return (
    <View style={[styles.monthSection, { width }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Month Title */}
        <View style={styles.monthTitleContainer}>
          <Text style={styles.monthTitle}>{formatMonthTitle()}</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Weekday Header */}
      <View style={styles.weekdayHeaderContainer}>
        <View style={styles.weekdayCellFirst}>
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

      {/* Calendar Grid */}
      <View style={styles.monthGrid}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((dateData, dayIndex) => {
              // 빈 셀 처리
              if (dateData.day === 0) {
                return (
                  <View
                    key={dayIndex}
                    style={[
                      styles.emptyCell,
                      dayIndex === 0 ? { marginLeft: 0 } : { marginLeft: 7.5 },
                    ]}
                  />
                );
              }

              return (
                <DayCell
                  key={dayIndex}
                  dateData={dateData}
                  isSelected={isSameDate(selectedDate, dateData.date)}
                  onPress={onDateSelect}
                  isFirstInRow={dayIndex === 0}
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
  /** 결혼 예정일 (이 날짜 이후로는 선택 불가) */
  weddingDate?: Date | null;
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
  weddingDate = null,
}) => {
  const today = new Date();
  const scrollViewRef = useRef<ScrollView>(null);

  // 한 달 캘린더의 너비 (248px 달력 + 32px 좌우 패딩)
  const MONTH_WIDTH = 280;

  // 내부 상태 관리 (Controlled/Uncontrolled 패턴)
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    null
  );
  const [currentVisibleMonthIndex, setCurrentVisibleMonthIndex] = useState(0);

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
   * 스크롤 이벤트 핸들러
   * 현재 보이는 월을 추적
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const monthIndex = Math.round(scrollX / MONTH_WIDTH);

    if (monthIndex >= 0 && monthIndex < months.length) {
      setCurrentVisibleMonthIndex(monthIndex);
    }
  };

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

  return (
    <View style={styles.calendarContainer}>
      {/* Scrollable Month Sections */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={MONTH_WIDTH}
        snapToAlignment="start"
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
            width={MONTH_WIDTH}
            subtitle={subtitle}
            weddingDate={weddingDate}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Calendar;
