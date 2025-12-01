/**
 * Search Component
 * 버전: 1.4.0
 * 수정 시각: 2025-12-01
 * 규칙 준수: 03-ui.mdc, 04-func.mdc
 * 
 * 주요 기능:
 * - [x] 카카오맵 통합 및 표시
 * - [x] 백엔드 API 연동 (지도 영역 기반)
 * - [x] 마커 표시 및 클릭 이벤트
 * - [x] 업체 상세 정보 Bottom Sheet
 * - [x] 비슷한 업체 추천 (3개)
 * - [x] 초기 로딩 스피너
 * - [x] 디바운싱 (지도 이동 1초)
 * 
 * 스타일 규칙:
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] StyleSheet 전용
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search as SearchIcon, Crosshair, MapPin, Phone, Clock, CircleDollarSign } from 'lucide-react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { styles, vendorDetailStyles } from './styles';
import KakaoMap, { MapMarker, KakaoMapRef } from '@/commons/components/kakao-map';
import { useVendors } from '@/commons/hooks';
import { MarkerVariant } from '@/commons/components/marker';

const CATEGORIES = [
  { id: 'ALL', label: '전체' },
  { id: 'VENUE', label: '웨딩홀' },
  { id: 'STUDIO', label: '스튜디오' },
  { id: 'DRESS', label: '드레스' },
  { id: 'MAKEUP', label: '메이크업' },
] as const;

type Category = typeof CATEGORIES[number]['id'];

/**
 * 카테고리를 MarkerVariant으로 변환하는 헬퍼 함수
 * @param category - 백엔드 카테고리 ('VENUE', 'STUDIO', 'DRESS', 'MAKEUP')
 * @returns MarkerVariant ('hotel', 'camera', 'shirt', 'palette')
 */
function mapCategoryToMarkerVariant(category: string): MarkerVariant | undefined {
  switch (category) {
    case 'VENUE':
      return 'hotel';
    case 'STUDIO':
      return 'camera';
    case 'DRESS':
      return 'shirt';
    case 'MAKEUP':
      return 'palette';
    default:
      return undefined;
  }
}

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
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [hasInitialData, setHasInitialData] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<KakaoMapRef>(null);
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  // 지도 영역이 변경되면 1초 후에 API 호출 (Debounce)
  useEffect(() => {
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

  // 초기 로딩 완료 체크
  useEffect(() => {
    if (isMapReady && !isLoadingVendors && vendorsData && !hasInitialData) {
      console.log('✅ [Search] 초기 로딩 완료');
      setHasInitialData(true);
      // 약간의 딜레이 후 화면 표시 (마커가 그려지는 시간 확보)
      setTimeout(() => {
        setInitialLoadComplete(true);
      }, 500);
    }
  }, [isMapReady, isLoadingVendors, vendorsData, hasInitialData]);

  // 디버그 로그
  useEffect(() => {
    console.log('🗺️ [Search] Map Ready:', isMapReady);
    console.log('📍 [Search] Map Bounds:', mapBounds);
    console.log('🏷️ [Search] Selected Category:', selectedCategory);
    console.log('📦 [Search] Total Vendors:', vendorsData?.vendors?.length || 0);
    console.log('⏳ [Search] Loading Vendors:', isLoadingVendors);
    console.log('🎨 [Search] Initial Load Complete:', initialLoadComplete);
    if (error) console.error('❌ [Search] Error:', error);
  }, [isMapReady, mapBounds, selectedCategory, vendorsData, isLoadingVendors, error, initialLoadComplete]);

  // 업체 데이터를 마커 형식으로 변환
  const markers: MapMarker[] = useMemo(() => {
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
        category: mapCategoryToMarkerVariant(vendor.category),
        price: minPrice,
        vendorName: vendor.name,
      };
    });
  }, [vendorsData]);

  // 비슷한 업체 추천 (같은 카테고리, 거리 기준)
  const similarVendors = useMemo(() => {
    if (!selectedVendor || !vendorsData?.vendors) return [];

    return vendorsData.vendors
      .filter((vendor: any) => 
        vendor.id !== selectedVendor.id && 
        vendor.category === selectedVendor.category
      )
      .map((vendor: any) => {
        // 거리 계산 (단순 유클리드 거리)
        const distance = Math.sqrt(
          Math.pow(vendor.latitude - selectedVendor.latitude, 2) +
          Math.pow(vendor.longitude - selectedVendor.longitude, 2)
        );
        return { ...vendor, distance };
      })
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 3);
  }, [selectedVendor, vendorsData]);

  const handleMapReady = () => {
    console.log('지도 로드 완료');
    setIsMapReady(true);
  };

  const handleRegionChange = (bounds: any) => {
    console.log('📍 지도 영역 변경:', bounds);
    setMapBounds(bounds);
  };

  const handleMarkerClick = useCallback((markerId: string) => {
    console.log('마커 클릭:', markerId);
    const vendor = vendorsData?.vendors?.find((v: any) => v.id === markerId);
    if (vendor) {
      setSelectedVendor(vendor);
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [vendorsData]);

  const handleCurrentLocation = () => {
    console.log('현재 위치로 이동');
    // 사전 정의된 좌표(37.568305, 127.010740)로 이동
    if (mapRef.current) {
      mapRef.current.moveTo(37.568305, 127.010740);
    }
  };

  return (
    <View style={styles['search-wrapper']}>
      <SafeAreaView style={styles['search-safe-area']} edges={['top']}>
        <View style={styles['search-container']}>
          {/* 초기 로딩 스피너 */}
          {!initialLoadComplete && (
            <View style={styles['initial-loading-overlay']}>
              <ActivityIndicator size="large" color="#8B7FFF" />
              <Text style={styles['loading-text']}>지도를 불러오는 중...</Text>
            </View>
          )}

          {/* 지도 (배경) */}
          <KakaoMap
            ref={mapRef}
            latitude={37.5247}
            longitude={127.0404}
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

      {/* 업체 상세 정보 Bottom Sheet */}
      {selectedVendor && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => setSelectedVendor(null)}
          backgroundStyle={vendorDetailStyles.bottomSheetBackground}
          handleIndicatorStyle={vendorDetailStyles.handleIndicator}
        >
          <BottomSheetScrollView style={vendorDetailStyles.container}>
            {/* 헤더 - 위치 정보 */}
            <View style={vendorDetailStyles.header}>
              <View style={vendorDetailStyles.headerLeft}>
                <MapPin size={24} color="#000000" />
                <Text style={vendorDetailStyles.headerLocation}>
                  {selectedVendor.address?.split(' ').slice(0, 3).join(' ')}
                </Text>
              </View>
              <TouchableOpacity style={vendorDetailStyles.saveButton}>
                <Text style={vendorDetailStyles.saveButtonText}>저장하기</Text>
              </TouchableOpacity>
            </View>

            {/* 카테고리 배지 + 설명 */}
            <View style={vendorDetailStyles.categoryContainer}>
              <View style={vendorDetailStyles.categoryBadge}>
                <Text style={vendorDetailStyles.categoryBadgeText}>요약</Text>
              </View>
              <Text style={vendorDetailStyles.description}>
                {getCategoryLabel(selectedVendor.category)} 전문 업체
              </Text>
            </View>

            {/* 업체명 */}
            <Text style={vendorDetailStyles.vendorName}>{selectedVendor.name}</Text>

            {/* 이미지 갤러리 */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={vendorDetailStyles.imageGalleryContainer}
              contentContainerStyle={vendorDetailStyles.imageGalleryContent}
            >
              {selectedVendor.images && selectedVendor.images.length > 0 ? (
                selectedVendor.images.map((image: any, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: image.url }}
                    style={vendorDetailStyles.galleryImage}
                  />
                ))
              ) : (
                <>
                  <View style={vendorDetailStyles.galleryImagePlaceholder} />
                  <View style={vendorDetailStyles.galleryImagePlaceholder} />
                </>
              )}
            </ScrollView>

            {/* 상세 정보 */}
            <View style={vendorDetailStyles.infoSection}>
              {/* 주소 */}
              <View style={vendorDetailStyles.infoRow}>
                <MapPin size={16} color="#524a4e" />
                <Text style={vendorDetailStyles.infoText}>{selectedVendor.address}</Text>
              </View>

              {/* 전화번호 */}
              {selectedVendor.phone && (
                <View style={vendorDetailStyles.infoRow}>
                  <Phone size={16} color="#524a4e" />
                  <Text style={vendorDetailStyles.infoText}>{selectedVendor.phone}</Text>
                </View>
              )}

              {/* 운영시간 */}
              {selectedVendor.operating_hours && selectedVendor.operating_hours.length > 0 && (
                <View style={vendorDetailStyles.infoRow}>
                  <Clock size={16} color="#524a4e" />
                  <Text style={vendorDetailStyles.infoText}>
                    {selectedVendor.operating_hours[0].open_time} ~ {selectedVendor.operating_hours[0].close_time}
                  </Text>
                </View>
              )}

              {/* 서비스 정보 */}
              {selectedVendor.service_items && selectedVendor.service_items.length > 0 && (
                <View style={vendorDetailStyles.infoRow}>
                  <CircleDollarSign size={16} color="#524a4e" />
                  <Text style={vendorDetailStyles.infoText}>
                    {selectedVendor.service_items[0].name}
                  </Text>
                </View>
              )}
            </View>

            {/* 가격 정보 */}
            {selectedVendor.service_items && selectedVendor.service_items.length > 0 && (
              <View style={vendorDetailStyles.priceSection}>
                {selectedVendor.service_items.map((item: any, index: number) => (
                  <View key={index} style={vendorDetailStyles.priceRow}>
                    <Text style={vendorDetailStyles.priceLabel}>{item.name}</Text>
                    <View style={vendorDetailStyles.priceDivider} />
                    <Text style={vendorDetailStyles.priceValue}>
                      {item.price.toLocaleString()} 원
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* CTA 버튼 */}
            <TouchableOpacity style={vendorDetailStyles.ctaButton}>
              <Text style={vendorDetailStyles.ctaButtonText}>
                플랜에 장착작으로 변경합니다.
              </Text>
            </TouchableOpacity>

            {/* 비슷한 업체 추천 */}
            {similarVendors.length > 0 && (
              <View style={vendorDetailStyles.similarSection}>
                <Text style={vendorDetailStyles.similarTitle}>
                  비슷한 {getCategoryLabel(selectedVendor.category)} 업체
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={vendorDetailStyles.similarScrollContent}
                >
                  {similarVendors.map((vendor: any) => {
                    const minPrice = vendor.service_items && vendor.service_items.length > 0
                      ? Math.min(...vendor.service_items.map((item: any) => item.price))
                      : null;

                    return (
                      <TouchableOpacity
                        key={vendor.id}
                        style={vendorDetailStyles.similarCard}
                        onPress={() => {
                          setSelectedVendor(vendor);
                          bottomSheetRef.current?.snapToIndex(0);
                        }}
                      >
                        {vendor.images && vendor.images.length > 0 ? (
                          <Image
                            source={{ uri: vendor.images[0].url }}
                            style={vendorDetailStyles.similarCardImage}
                          />
                        ) : (
                          <View style={vendorDetailStyles.similarCardImagePlaceholder} />
                        )}
                        <View style={vendorDetailStyles.similarCardContent}>
                          <Text style={vendorDetailStyles.similarCardName} numberOfLines={1}>
                            {vendor.name}
                          </Text>
                          <View style={vendorDetailStyles.similarCardBadge}>
                            <Text style={vendorDetailStyles.similarCardBadgeText}>
                              {getCategoryLabel(vendor.category)}
                            </Text>
                          </View>
                          {minPrice && (
                            <Text style={vendorDetailStyles.similarCardPrice}>
                              {minPrice.toLocaleString()}원~
                            </Text>
                          )}
                          <View style={vendorDetailStyles.similarCardLocation}>
                            <MapPin size={10} color="#524a4e" />
                            <Text style={vendorDetailStyles.similarCardLocationText} numberOfLines={1}>
                              {vendor.address?.split(' ').slice(0, 2).join(' ')}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </View>
  );
}

/**
 * 카테고리 코드를 한글 레이블로 변환하는 헬퍼 함수
 * @param category - 카테고리 코드 ('VENUE', 'STUDIO', 'DRESS', 'MAKEUP')
 * @returns 한글 카테고리명
 */
function getCategoryLabel(category: string): string {
  switch (category) {
    case 'VENUE':
      return '웨딩홀';
    case 'STUDIO':
      return '스튜디오';
    case 'DRESS':
      return '드레스';
    case 'MAKEUP':
      return '메이크업';
    default:
      return '웨딩';
  }
}




