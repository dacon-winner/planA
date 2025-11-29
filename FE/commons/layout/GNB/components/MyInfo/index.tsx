/**
 * MyInfo Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import { MY_INFO_CONTENT } from '@/commons/enums/gnb';
import { Badge, BadgePolicy } from '@/commons/components/badge';

export default function MyInfo() {
  return (
    <View style={styles['myinfo-container']}>
      <View style={styles['myinfo-header']}>
        <Text style={styles['myinfo-header-title']}>{MY_INFO_CONTENT.HEADER_TITLE}</Text>
      </View>
      <ScrollView style={styles['myinfo-content']}>
        <View style={styles['myinfo-section']}>
          <Text style={styles['myinfo-section-title']}>{MY_INFO_CONTENT.SECTION_TITLE}</Text>
          <Text style={styles['myinfo-placeholder']}>{MY_INFO_CONTENT.PLACEHOLDER}</Text>
        </View>

        {/* Badge 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>Badge 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <Badge variant="summary" />
              <Text style={styles['badge-demo-label']}>요약</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <Badge variant="ai" />
              <Text style={styles['badge-demo-label']}>AI</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <Badge variant="plan" />
              <Text style={styles['badge-demo-label']}>대표 플랜</Text>
            </View>
          </View>
        </View>

        {/* BadgePolicy 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>BadgePolicy 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="loan" />
              <Text style={styles['badge-demo-label']}>대출</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="always" />
              <Text style={styles['badge-demo-label']}>상시</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="period" />
              <Text style={styles['badge-demo-label']}>기간제</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="subsidy" />
              <Text style={styles['badge-demo-label']}>보조금</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}




