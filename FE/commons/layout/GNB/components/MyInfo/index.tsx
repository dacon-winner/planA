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

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Wallet, 
  Edit, 
  User, 
  CalendarClock, 
  Bell,
  Settings
} from 'lucide-react-native';
import { styles } from './styles';
import { MY_INFO_CONTENT } from '@/commons/enums/gnb';
import { Toggle } from '@/commons/components/toggle';
import { GradientBackground } from '@/commons/components/gradient-background';
import { Button } from '@/commons/components/button';
import { colors } from '@/commons/enums/color';

// 임시 데이터 (추후 API로 대체)
const userInfo = {
  name: '김동언',
  weddingInfo: '김철수 님의 웨딩 정보',
  phone: '010-1111-1234',
  date: '2026년 3월 28일 토요일',
  location: '서울특별시 강남구',
  budget: '5,000만원',
};

const stats = {
  planCount: 1,
  reservationCount: 0,
};

const upcomingSchedules = [
  {
    date: '1월 6일',
    items: [
      { time: '17:00', name: '에이비 스튜디오', address: '서울 강남구 압구정동 23-6' },
      { time: '18:00', name: '유앤아이 스튜디오', address: '서울 서초구 서초동 26' },
    ],
  },
  {
    date: '1월 12일',
    items: [
      { time: '11:00', name: '타임스퀘어홀', address: '서울 강남구 논현동 130' },
      { time: '13:00', name: '오트 아트홀', address: '서울 강남구 논현동 12-2' },
    ],
  },
];

const notificationSettings = [
  {
    id: 'schedule',
    title: '일정 알림',
    subtitle: '예약 및 일정 관련 알림',
    enabled: true,
  },
  {
    id: 'recommendation',
    title: '추천 알림',
    subtitle: '맞춤 추천 업체 알림',
    enabled: true,
  },
  {
    id: 'reservation-change',
    title: '예약 변경 알림',
    subtitle: '예약 상태 변경 시 알림',
    enabled: false,
  },
];

export default function MyInfo() {
  const [notifications, setNotifications] = useState(
    notificationSettings.reduce((acc, item) => {
      acc[item.id] = item.enabled ? 'on' : 'off';
      return acc;
    }, {} as Record<string, 'on' | 'off'>)
  );

  const handleToggle = (id: string, newState: 'on' | 'off') => {
    setNotifications((prev) => ({
      ...prev,
      [id]: newState,
    }));
  };

  return (
    <View style={styles['myinfo-wrapper']}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      
      {/* 배경 그라데이션 */}
      <GradientBackground zIndex={0} />

      <ScrollView
        style={styles['content-scroll']}
        contentContainerStyle={styles['content-container']}
      >
        {/* 헤더 섹션 */}
        <View style={styles['header-container']}>
          <View style={styles['header-section']}>
            <Text style={styles['header-title']}>{MY_INFO_CONTENT.HEADER_TITLE}</Text>
            <Text style={styles['header-subtitle']}>{userInfo.weddingInfo}</Text>
          </View>
        </View>
        {/* 사용자 정보 카드 */}
        <View style={styles['user-card']}>
            <View style={styles['user-header']}>
              <View style={styles['user-info-row']}>
                <View style={styles['profile-container']}>
                  <View style={styles['profile-icon-wrapper']}>
                    <User size={24} color={colors.root.brand} />
                  </View>
                  <View style={styles['user-name-container']}>
                    <Text style={styles['user-name']}>{userInfo.name}</Text>
                    <Text style={styles['user-name-suffix']}>님</Text>
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

            <View style={styles['divider']} />

            <View style={styles['user-details']}>
              <View style={styles['detail-row']}>
                <Phone size={14} color={colors.root.text} />
                <Text style={styles['detail-text']}>{userInfo.phone}</Text>
              </View>
              <View style={styles['detail-row']}>
                <Calendar size={14} color={colors.root.text} />
                <Text style={styles['detail-text']}>{userInfo.date}</Text>
              </View>
              <View style={styles['detail-row']}>
                <MapPin size={14} color={colors.root.text} />
                <Text style={styles['detail-text']}>{userInfo.location}</Text>
              </View>
              <View style={styles['detail-row']}>
                <Wallet size={14} color={colors.root.text} />
                <Text style={styles['detail-text']}>{userInfo.budget}</Text>
              </View>
            </View>
          </View>

          {/* 통계 카드 */}
          <View style={styles['stats-row']}>
            <View style={styles['stat-card']}>
              <View style={styles['stat-card-content']}>
                <Calendar size={24} color={colors.root.brand} />
                <View style={styles['stat-text-container']}>
                  <Text style={styles['stat-label']}>나의 플랜</Text>
                  <Text style={styles['stat-value']}>{stats.planCount}개</Text>
                </View>
              </View>
            </View>
            <View style={styles['stat-card']}>
              <View style={styles['stat-card-content']}>
                <Settings size={24} color={colors.root.brand} />
                <View style={styles['stat-text-container']}>
                  <Text style={styles['stat-label']}>예약</Text>
                  <Text style={styles['stat-value']}>{stats.reservationCount}건</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 다가오는 일정 카드 */}
          <View style={styles['schedule-card']}>
            <View style={styles['schedule-header']}>
              <CalendarClock size={24} color={colors.root.brand} />
              <Text style={styles['schedule-title']}>다가오는 일정</Text>
            </View>

            <View style={styles['schedule-content']}>
              {upcomingSchedules.map((schedule, scheduleIndex) => (
                <View key={scheduleIndex} style={styles['schedule-date-group']}>
                  <View style={styles['schedule-date-header']}>
                    <Text style={styles['schedule-date']}>{schedule.date}</Text>
                  </View>
                  <View style={styles['schedule-items']}>
                    {schedule.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles['schedule-item']}>
                        <Text style={styles['schedule-time']}>{item.time}</Text>
                        <View style={styles['schedule-item-content']}>
                          <Text style={styles['schedule-item-name']}>{item.name}</Text>
                          <Text style={styles['schedule-item-address']}>{item.address}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* 알림 설정 카드 */}
          <View style={styles['notification-card']}>
            <View style={styles['notification-header']}>
              <Bell size={20} color={colors.root.brand} />
              <Text style={styles['notification-title']}>알림 설정</Text>
            </View>

            <View style={styles['notification-content']}>
              {notificationSettings.map((setting, index) => (
                <React.Fragment key={setting.id}>
                  <View style={styles['notification-item']}>
                    <View style={styles['notification-item-content']}>
                      <Text style={styles['notification-item-title']}>{setting.title}</Text>
                      <Text style={styles['notification-item-subtitle']}>{setting.subtitle}</Text>
                    </View>
                    <Toggle
                      state={notifications[setting.id]}
                      onToggle={(newState) => handleToggle(setting.id, newState)}
                    />
                  </View>
                  {index < notificationSettings.length - 1 && (
                    <View style={styles['notification-divider']} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
      </ScrollView>
    </View>
  );
}
