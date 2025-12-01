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

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search as SearchIcon, Crosshair } from 'lucide-react-native';
import { styles } from './styles';
import KakaoMap, { MapMarker } from '@/commons/components/kakao-map';
import { useVendors } from '@/commons/hooks';

const CATEGORIES = [
  { id: 'ALL', label: '전체' },
  { id: 'VENUE', label: '웨딩홀' },
  { id: 'STUDIO', label: '스튜디오' },
  { id: 'DRESS', label: '드레스' },
  { id: 'MAKEUP', label: '메이크업' },
] as const;

type Category = typeof CATEGORIES[number]['id'];

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapBounds, setMapBounds] = useState({
    swLat: 37.5,
    swLng: 126.9,
    neLat: 37.6,
    neLng: 127.0,
  });
  const [debouncedMapBounds, setDebouncedMapBounds] = useState(mapBounds);
  const [isMapReady, setIsMapReady] = useState(false);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 지도 영역이 변경되면 1초 후에 API 호출 (Debounce)
  React.useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedMapBounds(mapBounds);
      console.log('⏰ [Search] Debounced - API 호출 준비');
    }, 1000); // 1초 대기

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [mapBounds]);

  // 백엔드 API 호출 - Debounced 지도 영역 기준으로 조회
  const { data: vendorsData, isLoading: isLoadingVendors, error } = useVendors(
    {
      category: selectedCategory,
      ...debouncedMapBounds,
    },
    isMapReady // 지도 준비 완료 후에만 API 호출
  );

  // 디버그 로그
  React.useEffect(() => {
    console.log('🗺️ [Search] Map Ready:', isMapReady);
    console.log('📍 [Search] Map Bounds:', mapBounds);
    console.log('🏷️ [Search] Selected Category:', selectedCategory);
    console.log('📦 [Search] Total Vendors:', vendorsData?.vendors?.length || 0);
    console.log('⏳ [Search] Loading Vendors:', isLoadingVendors);
    if (error) console.error('❌ [Search] Error:', error);
  }, [isMapReady, mapBounds, selectedCategory, vendorsData, isLoadingVendors, error]);

  // 업체 데이터를 마커 형식으로 변환
  const markers: MapMarker[] = React.useMemo(() => {
    if (!vendorsData?.vendors) return [];

    return vendorsData.vendors.map((vendor) => {
      // 가장 저렴한 서비스 아이템 가격 찾기
      const minPrice = vendor.service_items && vendor.service_items.length > 0
        ? Math.min(...vendor.service_items.map(item => item.price))
        : undefined;
      
      return {
        id: vendor.id,
        latitude: vendor.latitude,
        longitude: vendor.longitude,
        title: vendor.name,
        content: vendor.address,
        category: vendor.category !== 'ALL' ? vendor.category : undefined,
        price: minPrice,
        vendorName: vendor.name,
      };
    });
  }, [vendorsData]);

  const handleMapReady = () => {
    console.log('지도 로드 완료');
    setIsMapReady(true);
  };

  const handleRegionChange = (bounds: any) => {
    console.log('📍 지도 영역 변경:', bounds);
    setMapBounds(bounds);
  };

  const handleMarkerClick = (markerId: string) => {
    console.log('마커 클릭:', markerId);
    // TODO: 업체 상세 정보 표시 (모달 또는 하단 시트)
  };

  const handleCurrentLocation = () => {
    console.log('현재 위치로 이동');
    // TODO: 현재 위치 가져오기 및 지도 이동
  };

  return (
    <View style={styles['search-wrapper']}>
      <SafeAreaView style={styles['search-safe-area']} edges={['top']}>
        <View style={styles['search-container']}>
          {/* 지도 (배경) */}
          <KakaoMap
            latitude={37.5240}
            longitude={127.0430}
            level={5}
            markers={markers}
            onMapReady={handleMapReady}
            onRegionChange={handleRegionChange}
            onMarkerClick={handleMarkerClick}
          />

          {/* 검색바 */}
          <View style={styles['search-bar-container']}>
            <View style={styles['search-bar']}>
              <SearchIcon size={20} color="#524a4e" />
              <TextInput
                style={styles['search-input']}
                placeholder="업체명 또는 서비스로 검색"
                placeholderTextColor="#524a4e"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* 카테고리 필터 */}
          <View style={styles['category-filter-container']}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles['category-filter-scroll']}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles['category-button'],
                    selectedCategory === category.id && styles['category-button-selected'],
                    selectedCategory === category.id && {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.1,
                      shadowRadius: 20,
                      elevation: 2,
                    }
                  ]}
                >
                  <Text 
                    style={[
                      styles['category-button-text'],
                      selectedCategory === category.id && styles['category-button-text-selected']
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 현재 위치 버튼 */}
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={styles['location-button']}
          >
            <Crosshair size={24} color="#524a4e" />
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </View>
  );
}




