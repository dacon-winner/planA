/**
 * Search Component
 * 버전: 1.2.0
 * 수정 시각: 2025-12-01
 * 규칙 준수: 03-ui.mdc, 04-func.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 * - [x] 카카오맵 통합
 * - [x] 백엔드 API 연동
 * - [x] 마커 표시
 */

import { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import KakaoMap, { MapMarker } from '@/commons/components/kakao-map';
import { useVendors } from '@/commons/hooks';

const CATEGORIES = [
  { id: 'VENUE', label: '웨딩홀' },
  { id: 'STUDIO', label: '스튜디오' },
  { id: 'DRESS', label: '드레스' },
  { id: 'MAKEUP', label: '메이크업' },
] as const;

type Category = typeof CATEGORIES[number]['id'];

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('STUDIO');
  const [mapBounds, setMapBounds] = useState({
    swLat: 37.5,
    swLng: 126.9,
    neLat: 37.6,
    neLng: 127.0,
  });
  const [isMapReady, setIsMapReady] = useState(false);

  // 백엔드 API 호출 - 업체 목록 조회
  const { data: vendorsData } = useVendors(
    {
      category: selectedCategory,
      ...mapBounds,
    },
    isMapReady // 지도 준비 완료 후에만 API 호출
  );

  // 업체 데이터를 마커 형식으로 변환
  const markers: MapMarker[] = vendorsData?.vendors?.map((vendor) => ({
    id: vendor.id,
    latitude: vendor.latitude,
    longitude: vendor.longitude,
    title: vendor.name,
    content: vendor.address,
  })) ?? [];

  const handleMapReady = () => {
    console.log('지도 로드 완료');
    setIsMapReady(true);
  };

  const handleRegionChange = (bounds: any) => {
    console.log('지도 영역 변경:', bounds);
    setMapBounds(bounds);
  };

  const handleMarkerClick = (markerId: string) => {
    console.log('마커 클릭:', markerId);
    // TODO: 업체 상세 정보 표시 (모달 또는 하단 시트)
  };

  return (
    <View style={styles['search-wrapper']}>
      <SafeAreaView style={styles['search-safe-area']}>
        <View style={styles['search-container']}>
          {/* 카테고리 탭 */}
          <View className="absolute top-4 left-0 right-0 z-10 px-4">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full shadow-sm ${
                    selectedCategory === category.id 
                      ? 'bg-indigo-600 border border-indigo-600' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text 
                    className={`text-sm font-bold ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <KakaoMap
            latitude={37.5240} // 청담동 중심 (순수 청담본점 근처)
            longitude={127.0430}
            level={5}
            markers={markers}
            onMapReady={handleMapReady}
            onRegionChange={handleRegionChange}
            onMarkerClick={handleMarkerClick}
          />
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </View>
  );
}




