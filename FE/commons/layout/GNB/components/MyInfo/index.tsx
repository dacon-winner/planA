/**
 * MyInfo Component
 * 버전: 2.0.0
 * 생성 시각: 2025-01-XX
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 * 피그마 노드ID: 4162-1063
 */

import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Phone,
  Calendar,
  MapPin,
  Wallet,
  Edit,
  User,
  CalendarClock,
  Bell,
  Settings,
  LogOut,
} from "lucide-react-native";
import { styles } from "./styles";
import { MY_INFO_CONTENT } from "@/commons/enums/gnb";
import { Toggle } from "@/commons/components/toggle";
import { GradientBackground } from "@/commons/components/gradient-background";
import { Button } from "@/commons/components/button";
import { colors } from "@/commons/enums/color";
import { useMe, usePlans, useUpcomingReservations } from "@/commons/hooks";
import { useAuth } from "@/commons/providers/auth/auth.provider";

const notificationSettings = [
  {
    id: "schedule",
    title: "일정 알림",
    subtitle: "예약 및 일정 관련 알림",
    enabled: true,
  },
  {
    id: "recommendation",
    title: "추천 알림",
    subtitle: "맞춤 추천 업체 알림",
    enabled: true,
  },
  {
    id: "reservation-change",
    title: "예약 변경 알림",
    subtitle: "예약 상태 변경 시 알림",
    enabled: false,
  },
];

export default function MyInfo() {
  // API 데이터 조회
  const { data: userData, isLoading: userLoading } = useMe();
  const { data: plansData } = usePlans();
  const {
    data: upcomingReservationsData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useUpcomingReservations();
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState(
    notificationSettings.reduce((acc, item) => {
      acc[item.id] = item.enabled ? "on" : "off";
      return acc;
    }, {} as Record<string, "on" | "off">)
  );

  // API 데이터 기반 계산값들
  const userInfo = userData
    ? {
        name: userData.name,
        weddingInfo: userData.wedding_date
          ? `${userData.name} 님의 웨딩 정보`
          : "웨딩 정보가 설정되지 않았습니다",
        phone: userData.phone,
        date: userData.wedding_date
          ? new Date(userData.wedding_date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })
          : "날짜 미설정",
        location: userData.preferred_region || "지역 미설정",
        budget: userData.budget_limit
          ? `${(userData.budget_limit / 10000).toLocaleString()}만원`
          : "예산 미설정",
      }
    : null;

  const stats = {
    planCount: plansData?.items?.length || 0,
    reservationCount: upcomingReservationsData?.reservations?.length || 0,
  };

  /**
   * 시간 포맷팅 헬퍼 함수: HH:MM 형식으로 변환
   * @param time - "HH:MM:SS" 또는 "HH:MM" 형식의 시간 문자열
   * @returns "HH:MM" 형식의 시간 문자열
   */
  const formatTime = (time: string): string => {
    // "HH:MM:SS" 또는 "HH:MM" 형식에서 "HH:MM"만 추출
    const parts = time.split(":");
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return time;
  };

  /**
   * API 응답 데이터를 화면 표시 형태로 변환
   * API: { reservation_date, reservation_time, vendor: { name, address } }
   * 화면: { date: "1월 6일", items: [{ time, name, address }] }
   */
  const upcomingSchedules =
    upcomingReservationsData?.reservations?.reduce((acc, reservation) => {
      // 날짜 포맷팅: "1월 6일" 형식
      const dateStr = new Date(reservation.reservation_date).toLocaleDateString(
        "ko-KR",
        {
          month: "long",
          day: "numeric",
        }
      );

      // 같은 날짜의 예약이 이미 있는지 확인
      const existingDateGroup = acc.find((group) => group.date === dateStr);

      if (existingDateGroup) {
        // 같은 날짜에 추가
        existingDateGroup.items.push({
          time: formatTime(reservation.reservation_time),
          name: reservation.vendor.name,
          address: reservation.vendor.address,
        });
      } else {
        // 새로운 날짜 그룹 생성
        acc.push({
          date: dateStr,
          items: [
            {
              time: formatTime(reservation.reservation_time),
              name: reservation.vendor.name,
              address: reservation.vendor.address,
            },
          ],
        });
      }

      return acc;
    }, [] as Array<{ date: string; items: Array<{ time: string; name: string; address: string }> }>) ||
    [];

  const handleToggle = (id: string, newState: "on" | "off") => {
    setNotifications((prev) => ({
      ...prev,
      [id]: newState,
    }));
  };

  /**
   * 로그아웃 처리
   */
  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles["myinfo-wrapper"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 배경 그라데이션 */}
      <GradientBackground zIndex={0} />

      <ScrollView
        style={styles["content-scroll"]}
        contentContainerStyle={styles["content-container"]}
      >
        {/* 헤더 섹션 */}
        <View style={styles["header-container"]}>
          <View style={styles["header-section"]}>
            <Text style={styles["header-title"]}>
              {MY_INFO_CONTENT.HEADER_TITLE}
            </Text>
            <Text style={styles["header-subtitle"]}>
              {userLoading
                ? "로딩 중..."
                : userInfo?.weddingInfo || "웨딩 정보가 설정되지 않았습니다"}
            </Text>
          </View>
        </View>
        {/* 사용자 정보 카드 */}
        <View style={styles["user-card"]}>
          <View style={styles["user-header"]}>
            <View style={styles["user-info-row"]}>
              <View style={styles["profile-container"]}>
                <View style={styles["profile-icon-wrapper"]}>
                  <User size={24} color={colors.root.brand} />
                </View>
                <View style={styles["user-name-container"]}>
                  <Text style={styles["user-name"]}>
                    {userLoading ? "로딩 중..." : userInfo?.name || "이름 없음"}
                  </Text>
                  <Text style={styles["user-name-suffix"]}>님</Text>
                </View>
              </View>
              <Button
                variant="outlined"
                size="small"
                icon={true}
                iconComponent={<Edit size={16} color={colors.root.brand} />}
              >
                수정
              </Button>
            </View>
          </View>

          <View style={styles["divider"]} />

          <View style={styles["user-details"]}>
            <View style={styles["detail-row"]}>
              <Phone size={14} color={colors.root.text} />
              <Text style={styles["detail-text"]}>
                {userLoading
                  ? "로딩 중..."
                  : userInfo?.phone || "전화번호 미설정"}
              </Text>
            </View>
            <View style={styles["detail-row"]}>
              <Calendar size={14} color={colors.root.text} />
              <Text style={styles["detail-text"]}>
                {userLoading ? "로딩 중..." : userInfo?.date || "날짜 미설정"}
              </Text>
            </View>
            <View style={styles["detail-row"]}>
              <MapPin size={14} color={colors.root.text} />
              <Text style={styles["detail-text"]}>
                {userLoading
                  ? "로딩 중..."
                  : userInfo?.location || "지역 미설정"}
              </Text>
            </View>
            <View style={styles["detail-row"]}>
              <Wallet size={14} color={colors.root.text} />
              <Text style={styles["detail-text"]}>
                {userLoading ? "로딩 중..." : userInfo?.budget || "예산 미설정"}
              </Text>
            </View>
          </View>
        </View>

        {/* 통계 카드 */}
        <View style={styles["stats-row"]}>
          <View style={styles["stat-card"]}>
            <View style={styles["stat-card-content"]}>
              <Calendar size={24} color={colors.root.brand} />
              <View style={styles["stat-text-container"]}>
                <Text style={styles["stat-label"]}>나의 플랜</Text>
                <Text style={styles["stat-value"]}>{stats.planCount}개</Text>
              </View>
            </View>
          </View>
          <View style={styles["stat-card"]}>
            <View style={styles["stat-card-content"]}>
              <Settings size={24} color={colors.root.brand} />
              <View style={styles["stat-text-container"]}>
                <Text style={styles["stat-label"]}>예약</Text>
                <Text style={styles["stat-value"]}>
                  {stats.reservationCount}건
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 다가오는 일정 카드 */}
        <View style={styles["schedule-card"]}>
          <View style={styles["schedule-header"]}>
            <CalendarClock size={24} color={colors.root.brand} />
            <Text style={styles["schedule-title"]}>다가오는 일정</Text>
          </View>

          <View style={styles["schedule-content"]}>
            {upcomingLoading ? (
              <Text style={styles["schedule-item-address"]}>
                일정을 불러오는 중...
              </Text>
            ) : upcomingError ? (
              <Text style={styles["schedule-item-address"]}>
                일정을 불러오는데 실패했습니다.
              </Text>
            ) : upcomingSchedules.length === 0 ? (
              <Text style={styles["schedule-item-address"]}>
                예정된 일정이 없습니다.
              </Text>
            ) : (
              upcomingSchedules.map((schedule, scheduleIndex) => (
                <View key={scheduleIndex} style={styles["schedule-date-group"]}>
                  <View style={styles["schedule-date-header"]}>
                    <Text style={styles["schedule-date"]}>{schedule.date}</Text>
                  </View>
                  <View style={styles["schedule-items"]}>
                    {schedule.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles["schedule-item"]}>
                        <View style={styles["schedule-item-header"]}>
                          <Text style={styles["schedule-time"]}>
                            {item.time}
                          </Text>
                          <View style={styles["schedule-item-content"]}>
                            <Text style={styles["schedule-item-name"]}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles["schedule-item-address"]}>
                          {item.address}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        {/* 알림 설정 카드 */}
        <View style={styles["notification-card"]}>
          <View style={styles["notification-header"]}>
            <Bell size={20} color={colors.root.brand} />
            <Text style={styles["notification-title"]}>알림 설정</Text>
          </View>

          <View style={styles["notification-content"]}>
            {notificationSettings.map((setting, index) => (
              <React.Fragment key={setting.id}>
                <View style={styles["notification-item"]}>
                  <View style={styles["notification-item-content"]}>
                    <Text style={styles["notification-item-title"]}>
                      {setting.title}
                    </Text>
                    <Text style={styles["notification-item-subtitle"]}>
                      {setting.subtitle}
                    </Text>
                  </View>
                  <Toggle
                    state={notifications[setting.id]}
                    onToggle={(newState) => handleToggle(setting.id, newState)}
                  />
                </View>
                {index < notificationSettings.length - 1 && (
                  <View style={styles["notification-divider"]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* 로그아웃 버튼 */}
        <View style={styles["logout-section"]}>
          <Button
            variant="outlined"
            size="medium"
            icon={true}
            iconComponent={<LogOut size={20} color={colors.root.brand} />}
            onPress={handleLogout}
          >
            로그아웃
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
