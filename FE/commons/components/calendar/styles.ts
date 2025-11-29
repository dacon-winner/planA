/**
 * Calendar Styles
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4183:2063, 4183:2068, 4183:2090, 4285:9741, 4285:9735, 4183:7901
 */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Container
  calendarContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  // Header Section
  headerContainer: {
    width: 248,
    paddingVertical: 12,
    gap: 4,
    alignSelf: "center",
  },

  monthTitleContainer: {
    width: 248,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  monthTitle: {
    fontFamily: "Pretendard Variable",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: "#ff6593",
    textAlign: "center",
  },

  subtitleContainer: {
    width: 248,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.150390625,
    color: "#6a7282",
    textAlign: "center",
  },

  // Weekday Header
  weekdayHeaderContainer: {
    width: 248,
    height: 20,
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 8,
  },

  weekdayCell: {
    width: 29,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7.5,
  },

  weekdayCellFirst: {
    width: 29,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },

  weekdayTextSunday: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.150390625,
    color: "#fb2c36",
    textAlign: "center",
  },

  weekdayTextWeekday: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.150390625,
    color: "#4a5565",
    textAlign: "center",
  },

  weekdayTextSaturday: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.150390625,
    color: "#2b7fff",
    textAlign: "center",
  },

  // Scroll View
  scrollView: {
    width: 280,
    alignSelf: "center",
  },

  scrollViewContent: {
    paddingHorizontal: 0,
  },

  // Month Section
  monthSection: {
    alignItems: "center",
    justifyContent: "flex-start",
  },

  monthGrid: {
    width: 248,
  },

  // Week Row
  weekRow: {
    width: 248,
    flexDirection: "row",
    marginBottom: 8,
  },

  // Day Cell - Base
  dayCellBase: {
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 7.5,
  },

  dayCellBaseFirst: {
    width: 29,
    height: 29,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
  },

  // Day Cell - Default State
  dayCellDefault: {
    backgroundColor: "transparent",
    borderRadius: 10,
  },

  dayCellTextDefault: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: "#101828",
    textAlign: "center",
  },

  // Day Cell - Today State
  dayCellToday: {
    backgroundColor: "rgba(92, 80, 80, 0.2)",
    borderRadius: 15,
  },

  dayCellTextToday: {
    fontFamily: "Pretendard Variable",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: "#5c5050",
    textAlign: "center",
  },

  // Day Cell - Disabled State
  dayCellDisabled: {
    backgroundColor: "transparent",
    borderRadius: 10,
  },

  dayCellTextDisabled: {
    fontFamily: "Pretendard Variable",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: "#d1d5dc",
    textAlign: "center",
  },

  // Day Cell - Selected State
  dayCellSelected: {
    backgroundColor: "rgba(230, 68, 133, 0.8)",
    borderRadius: 15,
  },

  dayCellTextSelected: {
    fontFamily: "Pretendard Variable",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3125,
    color: "#ffffff",
    textAlign: "center",
  },

  // Empty Cell (for spacing)
  emptyCell: {
    width: 29,
    height: 29,
  },
});
