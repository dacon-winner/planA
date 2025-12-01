import React, { useRef, useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MapPin, Phone, Clock, CircleDollarSign, RotateCw } from "lucide-react-native";
import BottomSheet, {
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { Button } from "@/commons/components/button";
import { Calendar } from "@/commons/components/calendar";
import { SelectButton } from "@/commons/components/select-button";
import {
  styles,
  getDetailContentScrollStyle,
} from "@/commons/styles/planDetail";
import { colors } from "@/commons/enums/color";
import { usePlanDetailScreen } from "@/commons/hooks/usePlanDetailScreen";
import { usePlanDetailStore } from "@/commons/stores/usePlanDetailStore";
import { useRegenerateVendor } from "@/commons/hooks/useRegenerateVendor";
import { usePlanDetail } from "@/commons/hooks/usePlans";
import { getVendorCategoryByIndex, mapApiCategoryToVendorCategory } from "@/commons/utils";
import { PlanHeader } from "./plan-header";
import { ServiceGrid } from "./service-grid";
import { PlanLoadingState } from "./plan-loading-state";
import { PlanVendorChangeModal } from "@/commons/components/plan-detail/vendor-change-modal";
import { showPlanToast } from "@/commons/components/plan-detail/plan-toast";

interface PlanDetailContainerProps {
  planId: string;
}

export const PlanDetailContainer: React.FC<PlanDetailContainerProps> = ({
  planId,
}) => {
  // 훅에서 필요한 데이터와 액션만 가져오기
  const {
    isLoading,
    error,
    isReservationLoading,
    finalPlanData,
    serviceCards,
    currentDetailInfo,
    selectedTab,
    setSelectedTab,
    timeOptions,
    parseWeddingDate,
    isServiceSaved,
    handleSave,
    handleSaveConfirm,
    handleSaveCancel,
    handleReservation,
    changeVendorModals,
  } = usePlanDetailScreen(planId);

  // Zustand 스토어에서 UI 상태 가져오기
  const {
    isHeaderCompact,
    setIsHeaderCompact,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    showTimePicker,
    setShowTimePicker,
    isReserved,
    selectedAiRecommendation,
  } = usePlanDetailStore();

  // 플랜 상세 데이터 조회 (예약 정보 확인용)
  const { data: planDetailData } = usePlanDetail(planId);

  // 업체 재생성 훅
  const regenerateVendorMutation = useRegenerateVendor();

  // 현재 선택된 탭의 예약 여부 확인
  const hasReservation = useMemo(() => {
    if (!planDetailData || !planDetailData.plan_items) {
      return false;
    }

    const targetCategory = getVendorCategoryByIndex(selectedTab);
    if (!targetCategory) {
      return false;
    }

    const planItem = planDetailData.plan_items.find((item: any) => {
      const normalized = mapApiCategoryToVendorCategory(item.vendor.category);
      return normalized === targetCategory;
    });

    return planItem?.reservation !== null && planItem?.reservation !== undefined;
  }, [planDetailData, selectedTab]);

  // 현재 선택된 업체 ID
  const currentVendorId = useMemo(() => {
    if (!planDetailData || !planDetailData.plan_items) {
      return null;
    }

    const targetCategory = getVendorCategoryByIndex(selectedTab);
    if (!targetCategory) {
      return null;
    }

    const planItem = planDetailData.plan_items.find((item: any) => {
      const normalized = mapApiCategoryToVendorCategory(item.vendor.category);
      return normalized === targetCategory;
    });

    return planItem?.vendor.id || null;
  }, [planDetailData, selectedTab]);

  // 업체 재생성 핸들러
  const handleRegenerateVendor = useCallback(async () => {
    console.log("🔄 [Regenerate] 버튼 클릭됨", {
      planId,
      currentVendorId,
      hasReservation,
    });

    if (!currentVendorId) {
      showPlanToast({
        variant: "error",
        message: "업체를 선택해주세요.",
      });
      return;
    }

    try {
      console.log("🔄 [Regenerate] API 호출 시작", {
        planId,
        vendorId: currentVendorId,
      });
      await regenerateVendorMutation.mutateAsync({
        planId,
        vendorId: currentVendorId,
      });
    } catch {
      // 에러는 훅 내부에서 토스트로 표시됨
    }
  }, [planId, currentVendorId, regenerateVendorMutation, hasReservation]);

  const hasSnappedToMaxRef = useRef(false);

  // 이미지 캐러셀 인덱스 추적
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageScrollViewRef = useRef<ScrollView>(null);

  // Bottom Sheet 설정
  const bottomSheetRef = useRef<BottomSheet>(null);
  const screenHeight = useMemo(() => Dimensions.get("window").height, []);
  const screenWidth = useMemo(() => Dimensions.get("window").width, []);
  const snapPoints = useMemo(
    () => [screenHeight * 0.35, screenHeight * 0.7],
    [screenHeight]
  );

  // 헤더 상태 업데이트
  const updateHeaderState = useCallback(
    (currentHeight: number) => {
      setIsHeaderCompact(currentHeight > screenHeight * 0.65);
    },
    [screenHeight, setIsHeaderCompact]
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      updateHeaderState(snapPoints[index]);
      hasSnappedToMaxRef.current = index === 1;
    },
    [snapPoints, updateHeaderState]
  );

  // BottomSheet 내부 컴포넌트에서 animatedPosition 추적
  const BottomSheetContentWrapper = () => {
    const { animatedPosition } = useBottomSheet();

    // animatedPosition 변경 시 헤더 상태 업데이트
    useAnimatedReaction(
      () => animatedPosition.value,
      (currentPosition) => {
        const currentHeight = screenHeight - currentPosition;
        runOnJS(updateHeaderState)(currentHeight);
      },
      [screenHeight, updateHeaderState]
    );

    return null;
  };

  const expandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const handleServiceItemPress = useCallback(
    (serviceIndex: number) => {
      setSelectedTab(serviceIndex);
      expandBottomSheet();
    },
    [setSelectedTab, expandBottomSheet]
  );

  // 이미지 스크롤 핸들러
  const handleImageScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / screenWidth);
      setCurrentImageIndex(index);
    },
    [screenWidth]
  );

  // 로딩/에러/데이터 없음 상태 처리
  if (isLoading || error || !finalPlanData) {
    return <PlanLoadingState isLoading={isLoading} error={error} />;
  }

  return (
    <View style={styles["plan-detail-wrapper"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 배경 그라데이션 */}
      <Image
        source={require("@/assets/Gradient.png")}
        style={styles["background-gradient"]}
      />

      <SafeAreaView style={styles["safe-area"]}>
        <ScrollView
          style={styles["plan-detail-scroll"]}
          contentContainerStyle={styles["plan-detail-scroll-container"]}
        >
          <PlanHeader
            planName={finalPlanData.planName}
            daysLeft={finalPlanData.daysLeft}
            date={finalPlanData.date}
            location={finalPlanData.location}
            budget={finalPlanData.budget}
            isCompact={isHeaderCompact}
          />

          <ServiceGrid
            services={serviceCards}
            onSelect={handleServiceItemPress}
          />
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
        backgroundStyle={styles["bottom-sheet-background"]}
      >
        <BottomSheetView style={styles["bottom-sheet-content"]}>
          <BottomSheetContentWrapper />

          {/* Bottom Sheet Handle */}
          <View
            style={[
              styles["detail-section-header"],
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View style={{ flex: 1 }} />
            <View style={styles["detail-section-handle"]} />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {!hasReservation && currentVendorId ? (
                <Pressable
                  style={({ pressed }) => [
                    {
                      padding: 8,
                      opacity: pressed ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleRegenerateVendor}
                  disabled={regenerateVendorMutation.isPending}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <RotateCw 
                    size={20} 
                    color={
                      regenerateVendorMutation.isPending
                        ? colors.root.text + "80"
                        : colors.root.text
                    } 
                  />
                </Pressable>
              ) : (
                // 디버깅용: 버튼이 왜 안 보이는지 확인
                __DEV__ && (
                  <View style={{ padding: 8 }}>
                    <Text style={{ fontSize: 10, color: colors.root.text + "50" }}>
                      {!currentVendorId ? "no vendor" : "has reservation"}
                    </Text>
                  </View>
                )
              )}
            </View>
          </View>

          {/* 상세 정보 컨텐츠 - 스크롤 가능 */}
          <View style={getDetailContentScrollStyle(screenHeight)}>
            <ScrollView
              contentContainerStyle={styles["detail-content"]}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles["detail-name"]}>
                {currentDetailInfo.name}
              </Text>

              {/* 이미지 섹션 */}
              <View style={styles["detail-images"]}>
                <ScrollView
                  ref={imageScrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={screenWidth}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  onScroll={handleImageScroll}
                  scrollEventThrottle={16}
                  contentContainerStyle={styles["detail-images-scroll-content"]}
                >
                  {currentDetailInfo.images && currentDetailInfo.images.length > 0
                    ? currentDetailInfo.images.map((imageUrl, index) => (
                        <Image
                          key={index}
                          source={{ uri: imageUrl }}
                          style={[
                            styles["detail-image-placeholder"],
                            { width: screenWidth }
                          ]}
                          resizeMode="cover"
                        />
                      ))
                    : (
                      <View
                        style={[
                          styles["detail-image-placeholder"],
                          { width: screenWidth }
                        ]}
                      />
                    )}
                </ScrollView>
                {/* 페이지 인디케이터 */}
                {currentDetailInfo.images && currentDetailInfo.images.length > 1 && (
                  <View style={styles["image-indicator-container"]}>
                    {currentDetailInfo.images.map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles["image-indicator-dot"],
                          index === currentImageIndex && styles["image-indicator-dot-active"]
                        ]}
                      />
                    ))}
                  </View>
                )}
              </View>

              {/* 연락처 및 정보 */}
              <View style={styles["detail-info-list"]}>
                <View style={styles["detail-info-item"]}>
                  <MapPin size={16} color={colors.root.text} />
                  <Text style={styles["detail-info-text"]}>
                    {currentDetailInfo.address}
                  </Text>
                </View>
                <View style={styles["detail-info-item"]}>
                  <Phone size={16} color={colors.root.text} />
                  <Text style={styles["detail-info-text"]}>
                    {currentDetailInfo.phone}
                  </Text>
                </View>
                <View style={styles["detail-info-item"]}>
                  <Clock size={16} color={colors.root.text} />
                  <Text style={styles["detail-info-text"]}>
                    {currentDetailInfo.hours}
                  </Text>
                </View>
                <View style={styles["detail-info-item"]}>
                  <CircleDollarSign size={16} color={colors.root.text} />
                  <Text style={styles["detail-info-text"]}>
                    {`${getVendorCategoryByIndex(selectedTab)} 서비스`}
                    {/* {currentDetailInfo.service} */}
                  </Text>
                </View>
              </View>

              {/* 가격 정보 */}
              <View style={styles["detail-prices"]}>
                {currentDetailInfo.prices.map((price, index) => (
                  <View key={index} style={styles["detail-price-row"]}>
                    <Text style={styles["detail-price-level"]}>
                      {price.level}
                    </Text>
                    <View style={styles["detail-price-dots"]}>
                      {Array.from({ length: 40 }).map((_, dotIndex) => (
                        <View
                          key={dotIndex}
                          style={styles["detail-price-dot"]}
                        />
                      ))}
                    </View>
                    <Text style={styles["detail-price-amount"]}>
                      {price.price}
                    </Text>
                  </View>
                ))}
              </View>

              {/* 액션 버튼 */}
              <View style={styles["detail-actions"]}>
                <View style={styles["detail-action-button"]}>
                  <Button variant="filled" size="medium" onPress={handleSave}>
                    {isServiceSaved(finalPlanData.services[selectedTab].type)
                      ? "저장 변경하기"
                      : "저장하기"}
                  </Button>
                </View>
              </View>

              {/* 방문 예약하기 */}
              <View style={styles["reservation-section"]}>
                <View style={styles["reservation-divider"]} />

                <Text style={styles["reservation-title"]}>방문 예약하기</Text>

                  {/* 날짜/시간 선택 UI */}
                  <View style={styles["datetime-picker-container"]}>
                    <View
                      style={[
                        styles["datetime-picker-item"],
                        isReserved && { opacity: 0.6 }
                      ]}
                    >
                      <Text style={styles["datetime-picker-label"]}>날짜</Text>
                      <Text style={styles["datetime-picker-value"]}>
                        {selectedDate
                          ? `${selectedDate.getFullYear()}년 ${
                              selectedDate.getMonth() + 1
                            }월 ${selectedDate.getDate()}일`
                          : "-"}
                      </Text>
                    </View>

                    <View style={styles["datetime-picker-divider"]} />

                    <View
                      style={[
                        styles["datetime-picker-item"],
                        isReserved && { opacity: 0.6 }
                      ]}
                    >
                      <Text style={styles["datetime-picker-label"]}>시간</Text>
                      <Text style={styles["datetime-picker-value"]}>
                        {selectedTime
                          ? selectedTime.split(":").slice(0, 2).join(":")
                          : "-"}
                      </Text>
                    </View>
                  </View>

                  {/* 예약된 경우 예약 정보 표시, 아닌 경우 달력 또는 시간 선택 버튼 그리드 */}
                  {isReserved && selectedDate && selectedTime ? (
                    <View style={styles["reservation-info-container"]}>
                      <Text style={styles["reservation-info-text"]}>
                        예약이 완료되었습니다.
                      </Text>
                    </View>
                  ) : (
                    <>
                      {showTimePicker && selectedDate ? (
                        <View style={styles["time-picker-container"]}>
                          <View style={styles["time-picker-grid"]}>
                            {timeOptions.map((option) => {
                              const isSelected = selectedTime === option.value;
                              return (
                                <View
                                  key={option.value}
                                  style={styles["time-picker-button-wrapper"]}
                                >
                                  <SelectButton
                                    state={isSelected ? "selected" : "default"}
                                    label={option.label}
                                    size="small"
                                    icon={
                                      <Clock
                                        size={20}
                                        color={
                                          isSelected
                                            ? colors.red["red-9"]
                                            : colors.brown["brown-2"]
                                        }
                                      />
                                    }
                                    onSelect={() =>
                                      setSelectedTime(option.value)
                                    }
                                  />
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      ) : (
                        <View style={styles["calendar-section"]}>
                          <Calendar
                            selectedDate={selectedDate}
                            onDateSelect={(date) => {
                              const weddingDate = parseWeddingDate(
                                finalPlanData.date
                              );
                              if (weddingDate && date > weddingDate) {
                                showPlanToast({
                                  variant: "error",
                                  message: "결혼 예정일보다 예약일이 늦습니다.",
                                });
                                return;
                              }

                              if (
                                selectedDate &&
                                date.getTime() !== selectedDate.getTime()
                              ) {
                                setSelectedTime(null);
                              }
                              setSelectedDate(date);
                              setShowTimePicker(true);
                            }}
                            subtitle="날짜를 선택하세요"
                            weddingDate={parseWeddingDate(finalPlanData.date)}
                          />
                        </View>
                      )}
                    </>
                  )}

                  {/* 예약 버튼 */}
                  {!isReserved && (
                    <View style={styles["reservation-actions"]}>
                      <View style={styles["reservation-action-button"]}>
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
                      <View style={styles["reservation-action-button"]}>
                        <Button
                          variant="filled"
                          size="medium"
                          disabled={
                            !selectedDate || !selectedTime || isReservationLoading
                          }
                          onPress={handleReservation}
                        >
                          예약 신청
                        </Button>
                      </View>
                    </View>
                  )}
              </View>
            </ScrollView>
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* 업체 변경 확인 모달 */}
      <PlanVendorChangeModal
        visible={changeVendorModals[finalPlanData.services[selectedTab].type]}
        planName={finalPlanData.planName}
        serviceType={finalPlanData.services[selectedTab].type}
        serviceName={
          selectedAiRecommendation?.name ||
          finalPlanData.services[selectedTab].name
        }
        onConfirm={handleSaveConfirm}
        onCancel={handleSaveCancel}
      />
    </View>
  );
};

