/**
 * Schedule Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 업데이트: 2025-12-19
 * 피그마 노드ID: 4100:84
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { PlannerCard } from '../MyInfo/components/planner-card';
import { AddNewPlanCard } from '../MyInfo/components/add-new-plan-card';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { NewPlanModalContent } from '@/commons/components/modal/NewPlanModal';
import { getPlanDetailUrl } from '@/commons/enums/url';

export default function Schedule() {
  const { openModal } = useModal();
  const router = useRouter();

  // TODO: 실제 데이터로 교체 필요
  const plans = [
    {
      id: '1',
      planName: '플랜 A',
      isAi: true,
      isRepresentative: true,
      date: '2026년 3월 28일 토요일',
      location: '서울특별시 강남구',
      budget: '5,000만원',
    },
    {
      id: '2',
      planName: '플랜 B',
      isAi: false,
      isRepresentative: false,
      date: '2026년 6월 19일 토요일',
      location: '서울특별시 용산구',
      budget: '7,500만원',
    },
  ];

  const handleSetRepresentative = (planName: string) => {
    // TODO: 대표 플랜 설정 로직 구현
    console.log(`대표 플랜 설정: ${planName}`);
  };

  const handleViewDetails = (planId: string) => {
    const url = getPlanDetailUrl(planId);
    router.push(url);
  };

  const handleAddNewPlan = () => {
    // NewPlanModal 열기
    openModal(
      <NewPlanModalContent
        onManualAdd={() => {
          console.log('직접 업체 추가');
        }}
        onAIGenerate={(planName: string) => {
          console.log('AI 플랜 생성:', planName);
        }}
      />
    );
  };

  return (
    <View style={styles['schedule-wrapper']}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      
      {/* 배경 그라데이션 */}
      <Image
        source={require('@/assets/Gradient.png')}
        style={styles['background-gradient']}
      />

      <SafeAreaView style={styles['safe-area']}>
        <View style={styles['schedule-container']}>
          {/* Header with Gradient */}
          <View style={styles['schedule-header']}>
            <View style={styles['header-content']}>
              <Text style={styles['schedule-header-title']}>
                나의 플랜 관리
              </Text>
              <Text style={styles['schedule-header-subtitle']}>D-0일</Text>
            </View>
          </View>

          {/* Content: Plan Cards */}
          <ScrollView
            style={styles['schedule-content']}
            contentContainerStyle={styles['schedule-content-container']}
          >
            {plans.map((plan, index) => (
              <PlannerCard
                key={index}
                planName={plan.planName}
                isAi={plan.isAi}
                isRepresentative={plan.isRepresentative}
                date={plan.date}
                location={plan.location}
                budget={plan.budget}
                onSetRepresentative={() => handleSetRepresentative(plan.planName)}
                onViewDetails={() => handleViewDetails(plan.id)}
              />
            ))}
            <AddNewPlanCard onPress={handleAddNewPlan} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}




