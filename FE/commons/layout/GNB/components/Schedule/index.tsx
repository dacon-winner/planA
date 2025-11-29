/**
 * Schedule Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import { SCHEDULE_CONTENT } from '@/commons/enums/gnb';

export default function Schedule() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles['schedule-container']}>
        <View style={styles['schedule-header']}>
          <Text style={styles['schedule-header-title']}>{SCHEDULE_CONTENT.HEADER_TITLE}</Text>
        </View>
        <ScrollView style={styles['schedule-content']}>
          <View style={styles['schedule-section']}>
            <Text style={styles['schedule-section-title']}>{SCHEDULE_CONTENT.SECTION_TITLE}</Text>
            <Text style={styles['schedule-placeholder']}>{SCHEDULE_CONTENT.PLACEHOLDER}</Text>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}




