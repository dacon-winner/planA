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
import { Calendar as CalendarIcon, MapPin, Wallet, Phone, Clock, CircleDollarSign, ClockCheck } from 'lucide-react-native';
import { ContentSwitcher } from '@/commons/components/content-switcher';
import { Button } from '@/commons/components/button';
import { Toast } from '@/commons/components/toast-message';
import { Calendar } from '@/commons/components/calendar';
import { SelectButton } from '@/commons/components/select-button';
import { ErrorModal } from '@/commons/components/modal/ErrorModal';
import { styles, getDetailContentScrollStyle } from './styles';
import { colors } from '@/commons/enums/color';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import BottomSheet, { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';

export default function PlanDetail() {
  const { id: planId } = useLocalSearchParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false); // 헤더가 컴팩트 모드인지 (0.65 기준)
  const [savedServices, setSavedServices] = useState<Record<string, boolean>>({
    '스튜디오': false,
    '드레스': false,
    '메이크업': false,
    '웨딩홀': false,
  }); // 각 서비스별 저장 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 달력 선택 날짜
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // 선택된 시간
  const [showTimePicker, setShowTimePicker] = useState(false); // 시간 선택 버튼 표시 여부
  const [isReserved, setIsReserved] = useState(false); // 예약 완료 상태
  const [selectedAiRecommendation, setSelectedAiRecommendation] = useState<{
    name: string;
    price: string;
  } | null>(null); // 선택된 AI 추천 업체
  const [changeVendorModals, setChangeVendorModals] = useState<Record<string, boolean>>({
    '스튜디오': false,
    '드레스': false,
    '메이크업': false,
    '웨딩홀': false,
  }); // 각 서비스별 업체 변경 확인 모달 표시 상태
  const [aiRecommendationsCount, setAiRecommendationsCount] = useState(3); // 표시할 AI 추천 업체 개수 (기본 3개)
  const hasSnappedToMaxRef = useRef(false); // 이미 최대 높이로 올라갔는지 추적

  // 시간 옵션 생성 (9시부터 20시까지)
  const timeOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = 9 + i;
      return {
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${hour.toString().padStart(2, '0')}:00`,
      };
    });
  }, []);

  // 탭 변경 시 AI 추천 선택 상태 초기화 (저장 상태는 유지)
  useEffect(() => {
    setSelectedAiRecommendation(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowTimePicker(false);
    setIsReserved(false);
    setAiRecommendationsCount(3);
  }, [selectedTab]);
  
  // Bottom Sheet 설정
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = useMemo(() => Dimensions.get('window').height, []);
  const thresholdHeight = useMemo(() => screenHeight * 0.65, [screenHeight]);
  
  // snapPoints를 [0.35, 0.70]로 설정
  const snapPoints = useMemo(() => {
    return [
      screenHeight * 0.35, // 35% - 인덱스 0 (최소 높이)
      screenHeight * 0.70, // 70% - 인덱스 1 (최대값)
    ];
  }, [screenHeight]);
  
  // 현재 높이에 따라 헤더 상태 업데이트
  const updateHeaderState = useCallback((currentHeight: number) => {
    const shouldBeCompact = currentHeight > thresholdHeight;
    setIsHeaderCompact(shouldBeCompact);
  }, [thresholdHeight]);
  
  const handleSheetChanges = useCallback((index: number) => {
    // 현재 snap point의 높이 계산
    const currentHeight = snapPoints[index];
    updateHeaderState(currentHeight);
    // 최대 높이로 올라갔으면 플래그 리셋
    if (index === 1) {
      hasSnappedToMaxRef.current = true;
    } else if (index < 1) {
      hasSnappedToMaxRef.current = false;
    }
  }, [snapPoints, updateHeaderState]);
  
  // BottomSheet 내부 컴포넌트에서 animatedPosition 추적
  const BottomSheetContentWrapper = () => {
    const { animatedPosition } = useBottomSheet();
    
    // animatedPosition 변경 시 헤더 상태 업데이트
    useAnimatedReaction(
      () => animatedPosition.value,
      (currentPosition) => {
        // 현재 높이 계산 (screenHeight - currentPosition = bottom sheet 높이)
        const currentHeight = screenHeight - currentPosition;
        runOnJS(updateHeaderState)(currentHeight);
      },
      [screenHeight, updateHeaderState]
    );
    
    return null;
  };

  // TODO: 실제 데이터로 교체 필요 (planId 기반으로 API 호출)
  // 현재는 planId를 사용하지 않지만, 나중에 API 호출 시 사용 예정
  void planId;

  // 결혼 예정일 파싱 함수
  const parseWeddingDate = (dateString: string): Date | null => {
    try {
      // "2026년 3월 28일 토요일" 형태에서 연도, 월, 일을 추출
      const match = dateString.match(/(\d{4})년\s+(\d{1,2})월\s+(\d{1,2})일/);
      if (match) {
        const [, year, month, day] = match;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
      return null;
    } catch (error) {
      console.error('결혼 예정일 파싱 실패:', error);
      return null;
    }
  };

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
    aiRecommendations: {
      '스튜디오': [
        {
          name: '에이비 스튜디오',
          price: '예상비용 440만원',
        },
        {
          name: '웨딩 스튜디오 A',
          price: '예상비용 320만원',
        },
        {
          name: '럭셔리 스튜디오',
          price: '예상비용 380만원',
        },
        {
          name: '아트 스튜디오',
          price: '예상비용 290만원',
        },
        {
          name: '모던 스튜디오',
          price: '예상비용 360만원',
        },
        {
          name: '클래식 스튜디오',
          price: '예상비용 420만원',
        },
        {
          name: '빈티지 스튜디오',
          price: '예상비용 390만원',
        },
        {
          name: '네이처 스튜디오',
          price: '예상비용 350만원',
        },
        {
          name: '시티 스튜디오',
          price: '예상비용 410만원',
        },
      ],
      '드레스': [
        {
          name: '브라이드 드레스',
          price: '예상비용 440만원',
        },
        {
          name: '엘레강스 드레스',
          price: '예상비용 250만원',
        },
        {
          name: '로맨틱 드레스',
          price: '예상비용 320만원',
        },
        {
          name: '프리미엄 드레스',
          price: '예상비용 400만원',
        },
        {
          name: '모던 드레스',
          price: '예상비용 380만원',
        },
        {
          name: '클래식 드레스',
          price: '예상비용 450만원',
        },
        {
          name: '빈티지 드레스',
          price: '예상비용 420만원',
        },
        {
          name: '심플 드레스',
          price: '예상비용 350만원',
        },
        {
          name: '럭셔리 드레스',
          price: '예상비용 500만원',
        },
      ],
      '메이크업': [
        {
          name: '프롬바이어스',
          price: '예상비용 440만원',
        },
        {
          name: '뷰티 메이크업',
          price: '예상비용 150만원',
        },
        {
          name: '아트 메이크업',
          price: '예상비용 180만원',
        },
        {
          name: '럭셔리 메이크업',
          price: '예상비용 220만원',
        },
        {
          name: '내추럴 메이크업',
          price: '예상비용 160만원',
        },
        {
          name: '드라마틱 메이크업',
          price: '예상비용 200만원',
        },
        {
          name: '웨딩 메이크업',
          price: '예상비용 250만원',
        },
        {
          name: '파티 메이크업',
          price: '예상비용 190만원',
        },
        {
          name: '데일리 메이크업',
          price: '예상비용 140만원',
        },
      ],
      '웨딩홀': [
        {
          name: '타임스퀘어홀',
          price: '예상비용 440만원',
        },
        {
          name: '드림 웨딩홀',
          price: '예상비용 450만원',
        },
        {
          name: '그랜드 홀',
          price: '예상비용 550만원',
        },
        {
          name: '프리미엄 홀',
          price: '예상비용 480만원',
        },
        {
          name: '가든 홀',
          price: '예상비용 520만원',
        },
        {
          name: '시티 홀',
          price: '예상비용 490만원',
        },
        {
          name: '루프탑 홀',
          price: '예상비용 580만원',
        },
        {
          name: '트래디셔널 홀',
          price: '예상비용 460만원',
        },
        {
          name: '모던 홀',
          price: '예상비용 530만원',
        },
      ],
    },
  };

  const handleViewOtherVendors = () => {
    // AI 추천 업체 표시 개수를 3개씩 늘림
    setAiRecommendationsCount(prev => prev + 3);
  };

  const handleAiRecommendationPress = (recommendation: { name: string; price: string }) => {
    // 선택된 AI 추천 업체를 메인 상세 섹션에 표시
    setSelectedAiRecommendation(recommendation);
    // Bottom sheet를 최대 높이로 열기
    bottomSheetRef.current?.snapToIndex(1);
  };

  // 동적 상세 정보 계산
  const currentDetailInfo = useMemo(() => {
    if (selectedAiRecommendation) {
      // 선택된 AI 추천 업체 정보로 상세 정보 생성
      const serviceType = planData.services[selectedTab].type;
      return {
        summary: `AI 추천 ${serviceType} 업체`,
        name: selectedAiRecommendation.name,
        address: '주소 정보가 제공되지 않습니다',
        phone: '전화번호 정보가 제공되지 않습니다',
        hours: '영업시간 정보가 제공되지 않습니다',
        service: `${serviceType} 서비스`,
        prices: [
          { level: '기본', price: selectedAiRecommendation.price.replace('예상비용 ', '') },
        ],
      };
    }
    // 현재 선택된 탭의 서비스 정보 반환
    const currentService = planData.services[selectedTab];
    if (selectedTab === 0) {
      // 스튜디오 탭 (기본 detailInfo 사용)
      return planData.detailInfo;
    } else {
      // 다른 탭들은 기본 정보 생성
      return {
        summary: `${currentService.type} 기본 정보`,
        name: currentService.name,
        address: '주소 정보가 제공되지 않습니다',
        phone: '전화번호 정보가 제공되지 않습니다',
        hours: '영업시간 정보가 제공되지 않습니다',
        service: `${currentService.type} 서비스`,
        prices: [
          { level: '기본', price: '정보 없음' },
        ],
      };
    }
  }, [selectedAiRecommendation, selectedTab, planData.services, planData.detailInfo]);

  const handleSaveConfirm = () => {
    // 실제 저장 실행 - 현재 선택된 탭의 서비스만 저장
    const currentServiceType = planData.services[selectedTab].type;
    setSavedServices(prev => ({
      ...prev,
      [currentServiceType]: true,
    }));
    setChangeVendorModals(prev => ({
      ...prev,
      [currentServiceType]: false,
    }));
    Toast.success('플랜이 성공적으로 저장되었습니다.');
  };

  const handleSaveCancel = () => {
    // 모달 닫기 - 현재 선택된 탭의 서비스 모달만 닫기
    const currentServiceType = planData.services[selectedTab].type;
    setChangeVendorModals(prev => ({
      ...prev,
      [currentServiceType]: false,
    }));
  };

  const handleSave = () => {
    const currentServiceType = planData.services[selectedTab].type;
    const isCurrentServiceSaved = savedServices[currentServiceType];

    if (isCurrentServiceSaved) {
      // 이미 저장된 경우, 모달 표시 (업체 변경 확인)
      setChangeVendorModals(prev => ({
        ...prev,
        [currentServiceType]: true,
      }));
    } else {
      // 저장되지 않은 경우, 바로 저장
      setSavedServices(prev => ({
        ...prev,
        [currentServiceType]: true,
      }));
      Toast.success('플랜이 성공적으로 저장되었습니다.');
    }
  };

  // 서비스 상태 계산 함수
  const getServiceStatus = (serviceIndex: number) => {
    const serviceType = planData.services[serviceIndex].type;
    const isServiceSaved = savedServices[serviceType];
    const currentService = planData.services[serviceIndex];

    // 현재 선택된 서비스가 아니면 원래 상태 반환
    if (serviceIndex !== selectedTab) {
      // 다른 서비스의 저장 상태에 따라 상태 표시
      if (isServiceSaved) {
        return '업체 저장됨';
      }
      return '업체 저장 전';
    }

    // 계약 완료 상태
    if (currentService.status === '계약 완료') {
      return '계약 완료';
    }

    // 방문 예정 상태 (status에 '방문 예정'이 포함된 경우)
    if (currentService.status.includes('방문 예정')) {
      return '방문 예정';
    }

    // 예약 확정된 경우 (방문 예정)
    if (isReserved && selectedDate && selectedTime) {
      return '방문 예정';
    }

    // 날짜 지정된 상태 (시간은 선택되지 않은 경우)
    if (selectedDate && !selectedTime) {
      return '날짜 지정됨';
    }

    // 저장 완료된 경우
    if (isServiceSaved) {
      return '업체 저장됨';
    }

    // 예약 문의 중인 상태
    if (currentService.status === '예약 문의 중') {
      return '예약 문의 중';
    }

    // 기본 상태 (업체 저장 전)
    return '업체 저장 전';
  };

  // 서비스 상태 아이콘 계산 함수
  const getServiceStatusIcon = (serviceIndex: number) => {
    const serviceType = planData.services[serviceIndex].type;
    const isServiceSaved = savedServices[serviceType];
    const currentService = planData.services[serviceIndex];

    // 현재 선택된 서비스가 아니면 원래 아이콘 반환 (저장 상태에 따라 다름)
    if (serviceIndex !== selectedTab) {
      if (isServiceSaved) {
        return 'clock' as const;
      }
      return null; // 업체 저장 전은 아이콘 없음
    }

    // 계약 완료 상태
    if (currentService.status === '계약 완료') {
      return 'clockCheck' as const;
    }

    // 방문 예정 상태 (status에 '방문 예정'이 포함되거나 예약 확정된 경우)
    if (currentService.status.includes('방문 예정') || (isReserved && selectedDate && selectedTime)) {
      return 'clockCheck' as const;
    }

    // 날짜 지정된 상태 (시간은 선택되지 않은 경우)
    if (selectedDate && !selectedTime) {
      return 'calendar' as const;
    }

    // 업체 저장됨 상태
    if (isServiceSaved) {
      return 'clock' as const;
    }

    // 예약 문의 중인 상태
    if (currentService.status === '예약 문의 중') {
      return 'clock' as const;
    }

    // 업체 저장 전 상태
    return null;
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
      case 'calendar':
        return <CalendarIcon size={12} color={iconColor} />;
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
            isHeaderCompact && styles['header-section-compact']
          ]}>
            <View style={styles['header-content']}>
              {!isHeaderCompact && (
                <Text style={styles['header-subtitle']}>
                  결혼식까지 {planData.daysLeft}일 남았어요
                </Text>
              )}
              <Text style={[
                styles['header-title'],
                isHeaderCompact && styles['header-title-compact']
              ]}>{planData.planName}</Text>
            </View>

            {/* 기본 정보 */}
            <View style={styles['basic-info']}>
              <View style={styles['info-row']}>
                <CalendarIcon size={14} color={colors.root.text} />
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
              style={[styles['service-grid-item'], styles['service-grid-item-top-left'], getServiceStatus(0) === '업체 저장 전' && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], getServiceStatus(0) === '업체 저장 전' && styles['service-grid-type-inactive']]}>
                {planData.services[0].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], getServiceStatus(0) === '업체 저장 전' && styles['service-grid-name-inactive']]}>
                  {planData.services[0].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {getServiceStatusIcon(0) && getStatusIcon(getServiceStatusIcon(0)!, getServiceStatus(0) !== '업체 저장 전')}
                  <Text style={[styles['service-grid-status-text'], getServiceStatus(0) === '업체 저장 전' && styles['service-grid-status-text-inactive']]}>
                    {getServiceStatus(0)}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Top Right - 드레스 */}
            <Pressable
              onPress={() => handleServiceItemPress(1)}
              style={[styles['service-grid-item'], styles['service-grid-item-top-right'], getServiceStatus(1) === '업체 저장 전' && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], getServiceStatus(1) === '업체 저장 전' && styles['service-grid-type-inactive']]}>
                {planData.services[1].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], getServiceStatus(1) === '업체 저장 전' && styles['service-grid-name-inactive']]}>
                  {planData.services[1].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {getServiceStatusIcon(1) && getStatusIcon(getServiceStatusIcon(1)!, getServiceStatus(1) !== '업체 저장 전')}
                  <Text style={[styles['service-grid-status-text'], getServiceStatus(1) === '업체 저장 전' && styles['service-grid-status-text-inactive']]}>
                    {getServiceStatus(1)}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Bottom Left - 메이크업 */}
            <Pressable
              onPress={() => handleServiceItemPress(2)}
              style={[styles['service-grid-item'], styles['service-grid-item-bottom-left'], getServiceStatus(2) === '업체 저장 전' && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], getServiceStatus(2) === '업체 저장 전' && styles['service-grid-type-inactive']]}>
                {planData.services[2].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], getServiceStatus(2) === '업체 저장 전' && styles['service-grid-name-inactive']]}>
                  {planData.services[2].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {getServiceStatusIcon(2) && getStatusIcon(getServiceStatusIcon(2)!, getServiceStatus(2) !== '업체 저장 전')}
                  <Text style={[styles['service-grid-status-text'], getServiceStatus(2) === '업체 저장 전' && styles['service-grid-status-text-inactive']]}>
                    {getServiceStatus(2)}
                  </Text>
                </View>
              </View>
            </Pressable>
            
            {/* Bottom Right - 웨딩홀 */}
            <Pressable
              onPress={() => handleServiceItemPress(3)}
              style={[styles['service-grid-item'], styles['service-grid-item-bottom-right'], getServiceStatus(3) === '업체 저장 전' && styles['service-grid-item-inactive']]}
            >
              <Text style={[styles['service-grid-type'], getServiceStatus(3) === '업체 저장 전' && styles['service-grid-type-inactive']]}>
                {planData.services[3].type}
              </Text>
              <View style={styles['service-grid-content']}>
                <Text style={[styles['service-grid-name'], getServiceStatus(3) === '업체 저장 전' && styles['service-grid-name-inactive']]}>
                  {planData.services[3].name}
                </Text>
                <View style={styles['service-grid-status']}>
                  {getServiceStatusIcon(3) && getStatusIcon(getServiceStatusIcon(3)!, getServiceStatus(3) !== '업체 저장 전')}
                  <Text style={[styles['service-grid-status-text'], getServiceStatus(3) === '업체 저장 전' && styles['service-grid-status-text-inactive']]}>
                    {getServiceStatus(3)}
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
          {/* animatedPosition 추적을 위한 래퍼 */}
          <BottomSheetContentWrapper />
          
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
          <View style={useMemo(() => getDetailContentScrollStyle(screenHeight), [screenHeight])}>
            <ScrollView
              contentContainerStyle={styles['detail-content']}
              showsVerticalScrollIndicator={false}
            >
            <Text style={styles['detail-name']}>
              {currentDetailInfo.name}
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
                  {currentDetailInfo.address}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <Phone size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {currentDetailInfo.phone}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <Clock size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {currentDetailInfo.hours}
                </Text>
              </View>
              <View style={styles['detail-info-item']}>
                <CircleDollarSign size={16} color={colors.root.text} />
                <Text style={styles['detail-info-text']}>
                  {currentDetailInfo.service}
                </Text>
              </View>
            </View>

            {/* 가격 정보 */}
            <View style={styles['detail-prices']}>
              {currentDetailInfo.prices.map((price, index) => (
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
                  {savedServices[planData.services[selectedTab].type] ? '저장 변경하기' : '저장하기'}
                </Button>
              </View>
            </View>

            {/* 방문 예약하기 - 현재 서비스가 저장된 경우에만 표시 */}
            {savedServices[planData.services[selectedTab].type] && (
              <View style={styles['reservation-section']}>
                {/* 구분선 */}
                <View style={styles['reservation-divider']} />

                {/* 방문 예약하기 제목 */}
                <Text style={styles['reservation-title']}>
                  방문 예약하기
                </Text>

                {/* 날짜/시간 선택 UI */}
                <View style={styles['datetime-picker-container']}>
                  {/* 날짜 섹션 */}
                  <Pressable
                    style={styles['datetime-picker-item']}
                    onPress={() => {
                      // 날짜 섹션 클릭 시 달력 표시
                      setShowTimePicker(false);
                    }}
                  >
                    <Text style={styles['datetime-picker-label']}>날짜</Text>
                    <Text style={styles['datetime-picker-value']}>
                      {selectedDate
                        ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
                        : '-'}
                    </Text>
                  </Pressable>

                  {/* 구분선 */}
                  <View style={styles['datetime-picker-divider']} />

                  {/* 시간 섹션 */}
                  <Pressable
                    style={styles['datetime-picker-item']}
                    disabled={!selectedDate}
                    onPress={() => {
                      // 시간 섹션 클릭 시 시간 선택 버튼 표시 (날짜가 선택된 경우만)
                      if (selectedDate) {
                        setShowTimePicker(true);
                      }
                    }}
                  >
                    <Text style={styles['datetime-picker-label']}>시간</Text>
                    <Text style={styles['datetime-picker-value']}>
                      {selectedTime || '-'}
                    </Text>
                  </Pressable>
                </View>

                {/* 달력 또는 시간 선택 버튼 그리드 - 예약 완료 시 숨김 */}
                {!isReserved && (
                  <>
                    {showTimePicker && selectedDate ? (
                      <View style={styles['time-picker-container']}>
                        <View style={styles['time-picker-grid']}>
                          {timeOptions.map((option) => {
                            const isSelected = selectedTime === option.value;
                            return (
                              <View key={option.value} style={styles['time-picker-button-wrapper']}>
                                <SelectButton
                                  state={isSelected ? 'selected' : 'default'}
                                  label={option.label}
                                  size="small"
                                  icon={
                                    <Clock
                                      size={20}
                                      color={isSelected ? colors.red['red-9'] : colors.brown['brown-2']}
                                    />
                                  }
                                  onSelect={() => setSelectedTime(option.value)}
                                />
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    ) : (
                      <View style={styles['calendar-section']}>
                        <Calendar
                          selectedDate={selectedDate}
                          onDateSelect={(date) => {
                            // 결혼 예정일 이후 날짜 선택 시 에러 메시지 표시
                            const weddingDate = parseWeddingDate(planData.date);
                            if (weddingDate && date > weddingDate) {
                              Toast.error('결혼 예정일보다 예약일이 늦습니다.');
                              return;
                            }

                            // 날짜가 변경되면 시간 초기화
                            if (selectedDate && date.getTime() !== selectedDate.getTime()) {
                              setSelectedTime(null);
                            }
                            setSelectedDate(date);
                            setShowTimePicker(true); // 날짜 선택 시 자동으로 시간 선택 버튼 표시
                          }}
                          subtitle="날짜를 선택하세요"
                          weddingDate={parseWeddingDate(planData.date)}
                        />
                      </View>
                    )}
                  </>
                )}

                {/* 예약 버튼 - 예약 완료 시 숨김 */}
                {!isReserved && (
                  <View style={styles['reservation-actions']}>
                    <View style={styles['reservation-action-button']}>
                      <Button
                        variant="outlined"
                        size="medium"
                        onPress={() => {
                          // TODO: 취소 로직 구현
                        }}
                      >
                        취소
                      </Button>
                    </View>
                    <View style={styles['reservation-action-button']}>
                      <Button
                        variant="filled"
                        size="medium"
                        disabled={!selectedDate || !selectedTime}
                        onPress={() => {
                          // 예약 신청 완료
                          setIsReserved(true);
                          setShowTimePicker(false); // 시간 선택 버튼 숨김
                          Toast.success('예약 신청이 완료되었습니다.');
                        }}
                      >
                        예약 신청
                      </Button>
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* AI 추천 업체 - 현재 서비스가 저장되지 않은 경우에만 표시 */}
            {!savedServices[planData.services[selectedTab].type] && (
              <View style={styles['ai-recommendations']}>
              <Text style={styles['ai-recommendations-title']}>
                AI가 추천하는 다른 업체
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles['ai-recommendations-images']}
              >
                {(() => {
                  const currentMainServiceName = selectedAiRecommendation?.name || planData.services[selectedTab].name;
                  return (planData.aiRecommendations as any)[planData.services[selectedTab].type]
                    ?.filter((recommendation: any) =>
                      recommendation.name !== currentMainServiceName
                    )
                    ?.slice(0, aiRecommendationsCount)
                    ?.map((recommendation: any, index: number) => (
                      <Pressable
                        key={index}
                        style={styles['ai-recommendation-item']}
                        onPress={() => handleAiRecommendationPress(recommendation)}
                      >
                        <View style={styles['ai-recommendation-image']} />
                        <View style={styles['ai-recommendation-text-container']}>
                          <Text style={styles['ai-recommendation-name']}>
                            {recommendation.name}
                          </Text>
                          <Text style={styles['ai-recommendation-price']}>
                            {recommendation.price}
                          </Text>
                        </View>
                      </Pressable>
                    ));
                })()}
              </ScrollView>
            </View>
            )}
            </ScrollView>
          </View>
         
        </BottomSheetView>
       
      </BottomSheet>

      {/* 업체 변경 확인 모달 */}
      {changeVendorModals[planData.services[selectedTab].type] && (
        <ErrorModal
          planAName={planData.planName}
          serviceType={planData.services[selectedTab].type}
          serviceName={selectedAiRecommendation?.name || planData.services[selectedTab].name}
          onConfirm={handleSaveConfirm}
          onCancel={handleSaveCancel}
        />
      )}
    </View>
  );
}

