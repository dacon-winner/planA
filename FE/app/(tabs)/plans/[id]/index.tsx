/**
 * Plan Detail Page
 * 버전: 1.0.0
 * 생성 시각: 2025-12-19
 * 피그마 노드ID: 4069:14018
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { View, Text, ScrollView, SafeAreaView, Image, Pressable, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { Calendar, MapPin, Wallet, Phone, Clock, CircleDollarSign, ClockCheck } from 'lucide-react-native';
import { ContentSwitcher } from '@/commons/components/content-switcher';
import { Button } from '@/commons/components/button';
import { styles } from './styles';
import { colors } from '@/commons/enums/color';
import { useState, useRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function PlanDetail() {
  const { id: planId } = useLocalSearchParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isBottomSheetAt70, setIsBottomSheetAt70] = useState(false); // 바텀 시트가 70% 높이에 도달했는지
  const hasSnappedToMaxRef = useRef(false); // 이미 최대 높이로 올라갔는지 추적
  
  // Bottom Sheet 설정
  const bottomSheetRef = useRef<BottomSheet>(null);
  // snapPoints를 숫자로 명시적으로 제한
  const snapPoints = useMemo(() => {
    const screenHeight = Dimensions.get('window').height;
    return [
      screenHeight * 0.35, // 35% - 인덱스 0 (최소 높이 증가)
      screenHeight * 0.35, // 35% - 인덱스 1
      screenHeight * 0.70, // 70% - 인덱스 2 (최대값)
    ];
  }, []);
  
  const handleSheetChanges = useCallback((index: number) => {
    // Bottom sheet 상태 변경 시 처리
    console.log('Bottom sheet index:', index);
    // 바텀 시트가 70% 높이(인덱스 2)에 도달했는지 확인
    setIsBottomSheetAt70(index === 2);
    // 최대 높이로 올라갔으면 플래그 리셋
    if (index === 2) {
      hasSnappedToMaxRef.current = true;
    } else if (index < 2) {
      hasSnappedToMaxRef.current = false;
    }
  }, []);


  // TODO: 실제 데이터로 교체 필요 (planId 기반으로 API 호출)
  // 현재는 planId를 사용하지 않지만, 나중에 API 호출 시 사용 예정
  void planId;
  const planData = {
    planName: '김철수님만을 위한 플랜A',
    daysLeft: 'N',
    date: '2026년 3월 28일 토요일',
    location: '서울특별시 강남구',
    budget: '5,000만원',
    services: [
      {
        type: '스튜디오',
        name: '에이비 스튜디오',
        status: '예약 문의 중',
        statusIcon: 'clock' as const,
        isSelected: true,
      },
      {
        type: '드레스',
        name: '브라이드 드레스',
        status: '2025년 11월 27일 방문 예정',
        statusIcon: 'clock' as const,
        isSelected: true,
      },
      {
        type: '메이크업',
        name: '프롬바이어스',
        status: '업체 저장 전',
        statusIcon: null,
        isSelected: false,
      },
      {
        type: '웨딩홀',
        name: '타임스퀘어홀',
        status: '계약 완료',
        statusIcon: 'clockCheck' as const,
        isSelected: true,
      },
    ],
    detailInfo: {
      summary: '아담하고 사랑스러운 무드의 스튜디오',
      name: '에이비 스튜디오',
      address: '서울특별시 강남구 서초동 23-1',
      phone: '070-1111-1234',
      hours: '09:00 ~ 20:00 (매주 수요일 휴무)',
      service: '웨딩 촬영 + 본식 헤어 & 메이크업',
      prices: [
        { level: '원장급', price: '440,000 원' },
        { level: '부원장급', price: '440,000 원' },
        { level: '실장급', price: '440,000 원' },
      ],
    },
  };

  const handleViewOtherVendors = () => {
    // TODO: 다른 업체 보기 로직 구현
    console.log('다른 업체 보기');
  };

  const handleSave = () => {
    // TODO: 저장하기 로직 구현
    console.log('저장하기');
  };

  const handleServiceItemPress = (serviceIndex: number) => {
    // 선택된 서비스에 해당하는 탭으로 변경
    setSelectedTab(serviceIndex);
    // Bottom sheet를 중간 높이로 열기
    bottomSheetRef.current?.snapToIndex(1);
  };

  const getStatusIcon = (iconType: string | null, isSelected: boolean) => {
    if (!iconType) return null;
    const iconColor = isSelected ? colors.root.text : colors.brown['brown-3'];
    switch (iconType) {
      case 'clock':
        return <Clock size={12} color={iconColor} />;
      case 'clockCheck':
        return <ClockCheck size={12} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles['plan-detail-wrapper']}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      
      {/* 배경 그라데이션 */}
      <Image
        source={require('@/assets/Gradient.png')}
        style={styles['background-gradient']}
      />

      <SafeAreaView style={styles['safe-area']}>
        <ScrollView
          style={styles['plan-detail-scroll']}
          contentContainerStyle={styles['plan-detail-scroll-container']}
        >
          {/* 상단 헤더 섹션 */}
          <View style={[
            styles['header-section'],
            isBottomSheetAt70 && styles['header-section-compact']
          ]}>
            <View style={styles['header-content']}>
              {!isBottomSheetAt70 && (
                <Text style={styles['header-subtitle']}>
                  결혼식까지 {planData.daysLeft}일 남았어요
                </Text>
              )}
              <Text style={[
                styles['header-title'],
                isBottomSheetAt70 && styles['header-title-compact']
              ]}>{planData.planName}</Text>
            </View>

            {/* 기본 정보 */}
            <View style={styles['basic-info']}>
              <View style={styles['info-row']}>
                <Calendar size={14} color={colors.root.text} />
                <Text style={styles['info-text']}>{planData.date}</Text>
              </View>
              <View style={styles['info-row']}>
                <MapPin size={14} color={colors.root.text} />
                <Text style={styles['info-text']}>{planData.location}</Text>
              </View>
              <View style={styles['info-row']}>
                <Wallet size={14} color={colors.root.text} />
                <Text style={styles['info-text']}>{planData.budget}</Text>
              </View>
            </View>
          </View>

          {/* 서비스 선택 그리드 카드 */}
          <View style={styles['service-grid-card']}>
            {/* Top Left - 스튜디오 */}
            <Pressable
              onPress={() => handleServiceItemPress(0)}
              style={[styles['service-grid-item'], styles['service-grid-item-top-left'], !planData.services[0].isSelected && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], !planData.services[0].isSelected && styles['service-grid-type-inactive']]}>
                {planData.services[0].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], !planData.services[0].isSelected && styles['service-grid-name-inactive']]}>
                  {planData.services[0].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {planData.services[0].statusIcon && getStatusIcon(planData.services[0].statusIcon, planData.services[0].isSelected)}
                  <Text style={[styles['service-grid-status-text'], !planData.services[0].isSelected && styles['service-grid-status-text-inactive']]}>
                    {planData.services[0].status}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Top Right - 드레스 */}
            <Pressable
              onPress={() => handleServiceItemPress(1)}
              style={[styles['service-grid-item'], styles['service-grid-item-top-right'], !planData.services[1].isSelected && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], !planData.services[1].isSelected && styles['service-grid-type-inactive']]}>
                {planData.services[1].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], !planData.services[1].isSelected && styles['service-grid-name-inactive']]}>
                  {planData.services[1].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {planData.services[1].statusIcon && getStatusIcon(planData.services[1].statusIcon, planData.services[1].isSelected)}
                  <Text style={[styles['service-grid-status-text'], !planData.services[1].isSelected && styles['service-grid-status-text-inactive']]}>
                    {planData.services[1].status}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Bottom Left - 메이크업 */}
            <Pressable
              onPress={() => handleServiceItemPress(2)}
              style={[styles['service-grid-item'], styles['service-grid-item-bottom-left'], !planData.services[2].isSelected && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], !planData.services[2].isSelected && styles['service-grid-type-inactive']]}>
                {planData.services[2].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], !planData.services[2].isSelected && styles['service-grid-name-inactive']]}>
                  {planData.services[2].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {planData.services[2].statusIcon && getStatusIcon(planData.services[2].statusIcon, planData.services[2].isSelected)}
                  <Text style={[styles['service-grid-status-text'], !planData.services[2].isSelected && styles['service-grid-status-text-inactive']]}>
                    {planData.services[2].status}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Bottom Right - 웨딩홀 */}
            <Pressable
              onPress={() => handleServiceItemPress(3)}
              style={[styles['service-grid-item'], styles['service-grid-item-bottom-right'], !planData.services[3].isSelected && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], !planData.services[3].isSelected && styles['service-grid-type-inactive']]}>
                {planData.services[3].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], !planData.services[3].isSelected && styles['service-grid-name-inactive']]}>
                  {planData.services[3].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {planData.services[3].statusIcon && getStatusIcon(planData.services[3].statusIcon, planData.services[3].isSelected)}
                  <Text style={[styles['service-grid-status-text'], !planData.services[3].isSelected && styles['service-grid-status-text-inactive']]}>
                    {planData.services[3].status}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* 그리드 구분선 */}
            <View style={styles['service-grid-divider-horizontal']} />
            <View style={styles['service-grid-divider-vertical']} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* 상세 정보 섹션 (Bottom Sheet) */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        enableOverDrag={false}
        enableDynamicSizing={false}
        enableContentPanningGesture={true}
        handleComponent={null}
        backgroundStyle={styles['bottom-sheet-background']}
      >
        <BottomSheetView style={styles['bottom-sheet-content']}>
          {/* Bottom Sheet Handle */}
          <View style={styles['detail-section-header']}>
            <View style={styles['detail-section-handle']} />
          </View>

          {/* Content Switcher */}
          <View style={styles['content-switcher-wrapper']}>
            <ContentSwitcher
              selectedIndex={selectedTab}
              onSelectionChange={setSelectedTab}
            />
          </View>

          {/* 상세 정보 컨텐츠 - 스크롤 가능 */}
          <View style={[styles['detail-content-scroll'], { height: Dimensions.get('window').height * 0.6 }]}>
            <ScrollView
              contentContainerStyle={styles['detail-content']}
              showsVerticalScrollIndicator={false}
            >
            <Text style={styles['detail-name']}>
              {planData.detailInfo.name}
            </Text>

            {/* 이미지 플레이스홀더 */}
            <View style={styles['detail-images']}>
              <View style={styles['detail-image-placeholder']} />
              <View style={styles['detail-image-placeholder']} />
            </View>

            {/* 연락처 및 정보 */}
            <View style={styles['detail-info-list']}>
              <View style={styles['detail-info-item']}>
                <MapPin size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {planData.detailInfo.address}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <Phone size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {planData.detailInfo.phone}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <Clock size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {planData.detailInfo.hours}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <CircleDollarSign size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {planData.detailInfo.service}
                </Text>
              </View>
            </View>

            {/* 가격 정보 */}
            <View style={styles['detail-prices']}>
              {planData.detailInfo.prices.map((price, index) => (
                <View key={index} style={styles['detail-price-row']}>
                  <Text style={styles['detail-price-level']}>{price.level}</Text>
                  <View style={styles['detail-price-dots']}>
                    {Array.from({ length: 40 }).map((_, dotIndex) => (
                      <View key={dotIndex} style={styles['detail-price-dot']} />
                    ))}
                  </View>
                  <Text style={styles['detail-price-amount']}>{price.price}</Text>
                </View>
              ))}
            </View>

            {/* 액션 버튼 */}
            <View style={styles['detail-actions']}>
              <View style={styles['detail-action-button']}>
                <Button
                  variant="outlined"
                  size="medium"
                  onPress={handleViewOtherVendors}
                >
                  다른 업체 보기
                </Button>
              </View>
              <View style={styles['detail-action-button']}>
                <Button
                  variant="filled"
                  size="medium"
                  onPress={handleSave}
                >
                  저장하기
                </Button>
              </View>
            </View>

            {/* AI 추천 업체 */}
            <View style={styles['ai-recommendations']}>
              <Text style={styles['ai-recommendations-title']}>
                AI가 추천하는 다른 업체
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles['ai-recommendations-images']}
              >
                <View style={styles['ai-recommendation-image']} />
                <View style={styles['ai-recommendation-image']} />
                <View style={styles['ai-recommendation-image']} />
              </ScrollView>
            </View>
            </ScrollView>
          </View>
         
        </BottomSheetView>
       
      </BottomSheet>
    </View>
  );
}

