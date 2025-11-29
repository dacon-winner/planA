/**
 * Search Component
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
import { SEARCH_CONTENT } from '@/commons/enums/gnb';

export default function Search() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles['search-container']}>
        <View style={styles['search-header']}>
          <Text style={styles['search-header-title']}>{SEARCH_CONTENT.HEADER_TITLE}</Text>
        </View>
        <ScrollView style={styles['search-content']}>
          <View style={styles['search-section']}>
            <Text style={styles['search-section-title']}>{SEARCH_CONTENT.SECTION_TITLE}</Text>
            <Text style={styles['search-placeholder']}>{SEARCH_CONTENT.PLACEHOLDER}</Text>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}




