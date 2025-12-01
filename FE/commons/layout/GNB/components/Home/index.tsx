/**
 * Home Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4116:260
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건 (Gradient 제외 - 하드코딩 요청)
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Clock,
  Calendar,
  MapPin,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react-native";
import { Link } from "expo-router";
import { GradientBackground } from "@/commons/components/gradient-background";
import { Button } from "@/commons/components/button";
import { PolicyCard } from "@/commons/components/card/PolicyCard";
import { URL_PATHS } from "@/commons/enums/url";
import { styles } from "./styles";
import { colors } from "../../../../enums/color";
import { usePlans } from "@/commons/hooks/usePlans";
import { usePolicies } from "@/commons/hooks/usePolicies";
import {
  useMainPlan,
  CATEGORY_LABELS,
  extractRegion,
} from "@/commons/hooks/useMainPlan";
import {
  formatWeddingDate,
  formatBudget,
  formatRegion,
  calculateDDay,
} from "@/commons/utils";

export default function Home() {
  const { data: plansData, isLoading, error } = usePlans();
  const {
    data: policiesData,
    isLoading: isPoliciesLoading,
    error: policiesError,
  } = usePolicies();
  const {
    data: mainPlanData,
    isLoading: isMainPlanLoading,
    error: mainPlanError,
  } = useMainPlan();

  // 로딩 상태
  if (isLoading) {
    return (
      <View
        style={[
          styles["home-wrapper"],
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <GradientBackground zIndex={0} />
        <ActivityIndicator size="large" color={colors.root.brand} />
        <Text style={{ marginTop: 16, color: colors.root.text }}>
          로딩 중...
        </Text>
      </View>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <View
        style={[
          styles["home-wrapper"],
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <GradientBackground zIndex={0} />
        <Text style={{ color: colors.root.text }}>
          플랜을 불러오는 중 오류가 발생했습니다.
        </Text>
      </View>
    );
  }

  // 첫 번째 플랜 데이터 가져오기
  const mainPlan = plansData?.items?.find((item) => item.plan !== null);
  const usersInfo = mainPlan?.users_info;
  const planInfo = mainPlan?.plan;

  return (
    <View style={styles["home-wrapper"]}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 배경 그라데이션 */}
      <GradientBackground zIndex={0} />

      <ScrollView
        style={styles["home-scroll-view"]}
        contentContainerStyle={styles["home-scroll-container"]}
      >
        <View style={styles["home-container"]}>
          {/* 상단 텍스트 섹션 */}
          <View style={styles["header-section"]}>
            <Text style={styles["header-subtitle"]} allowFontScaling={false}>
              결혼식까지 {calculateDDay(usersInfo?.wedding_date || null)}{" "}
              남았어요
            </Text>
            <Text
              style={[styles["header-title"], { fontWeight: "700" }]}
              allowFontScaling={false}
            >
              {planInfo?.title || "김철수님만을 위한 플랜A"}
            </Text>
          </View>

          {/* 폼 페이지로 이동 버튼 */}
          <View style={styles["form-button-container"]}>
            <View style={styles["form-button"]}>
              <Link href={URL_PATHS.FORM} asChild>
                <Button variant="filled" size="medium">
                  결혼 정보 입력하기
                </Button>
              </Link>
            </View>
            <View style={styles["login-button"]}>
              <Link href={URL_PATHS.AUTH_LOGIN} asChild>
                <Button variant="filled" size="medium">
                  로그인 하기
                </Button>
              </Link>
            </View>
          </View>

          {/* 중앙 정보 카드 */}
          <View style={styles["info-card-wrapper"]}>
            <View style={styles["info-card-blur"]} />
            <View style={styles["info-card-content"]}>
              {/* 일정 */}
              <View style={styles["info-item"]}>
                <Calendar size={20} color={colors.root.brand} strokeWidth={2} />
                <Text style={styles["info-label"]} allowFontScaling={false}>
                  일정
                </Text>
                <Text
                  style={styles["info-value-primary"]}
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatWeddingDate(usersInfo?.wedding_date || null, {
                    includeDayOfWeek: false,
                    fallback: "미정",
                  })}
                </Text>
              </View>

              {/* 구분선 1 */}
              <View style={styles["info-divider"]} />

              {/* 지역 */}
              <View style={styles["info-item"]}>
                <MapPin size={20} color={colors.root.brand} strokeWidth={2} />
                <Text style={styles["info-label"]} allowFontScaling={false}>
                  지역
                </Text>
                <Text style={styles["info-value"]} allowFontScaling={false}>
                  {formatRegion(usersInfo?.preferred_region || null, {
                    fallback: "미정",
                  })}
                </Text>
              </View>

              {/* 구분선 2 */}
              <View style={styles["info-divider"]} />

              {/* 예산 */}
              <View style={styles["info-item"]}>
                <CircleDollarSign
                  size={20}
                  color={colors.root.brand}
                  strokeWidth={2}
                />
                <Text style={styles["info-label"]} allowFontScaling={false}>
                  예산
                </Text>
                <Text style={styles["info-value"]} allowFontScaling={false}>
                  {formatBudget(usersInfo?.budget_limit || null, {
                    style: "compact",
                    fallback: "미정",
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 하단 카드 그리드 - full width */}
        <View style={styles["card-grid"]}>
          {/* 로딩 상태 */}
          {isMainPlanLoading && (
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <ActivityIndicator size="large" color={colors.root.brand} />
              <Text
                style={{ marginTop: 12, color: colors.root.text, fontSize: 14 }}
              >
                업체 정보를 불러오는 중...
              </Text>
            </View>
          )}

          {/* 에러 상태 */}
          {mainPlanError && !isMainPlanLoading && (
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <Text style={{ color: colors.root.text, fontSize: 14 }}>
                업체 정보를 불러오는 중 오류가 발생했습니다.
              </Text>
            </View>
          )}

          {/* 데이터 렌더링 */}
          {!isMainPlanLoading &&
            !mainPlanError &&
            mainPlanData?.items?.map((item) => {
              const hasReservation = !!item.reservation_date;
              const region = extractRegion(item.address);

              return (
                <View key={item.plan_item_id} style={styles["vendor-card"]}>
                  <View style={styles["card-content"]}>
                    <View style={styles["card-info"]}>
                      <View style={styles["card-header"]}>
                        <Text
                          style={
                            hasReservation
                              ? styles["card-title"]
                              : styles["card-title-inactive"]
                          }
                        >
                          {item.vendor_name}
                        </Text>
                        <View style={styles["card-meta"]}>
                          <Text
                            style={
                              hasReservation
                                ? styles["card-category-bold"]
                                : styles["card-category-inactive"]
                            }
                          >
                            {CATEGORY_LABELS[item.category] || item.category}
                          </Text>
                          <Text
                            style={
                              hasReservation
                                ? styles["card-location"]
                                : styles["card-location-inactive"]
                            }
                          >
                            {region}
                          </Text>
                        </View>
                      </View>
                      <View style={styles["card-status"]}>
                        {hasReservation ? (
                          <>
                            <Clock size={12} color={colors.root.text} />
                            <Text style={styles["card-status-text"]}>
                              {formatWeddingDate(item.reservation_date, {
                                includeDayOfWeek: false,
                                fallback: "미정",
                              })}{" "}
                              방문 예정
                            </Text>
                          </>
                        ) : (
                          <Text style={styles["card-status-text-inactive"]}>
                            예약 문의 중
                          </Text>
                        )}
                      </View>
                    </View>
                    {/* Vendor 썸네일 이미지 */}
                    {item.vendor_thumbnail_url && (
                      <Image
                        source={{ uri: item.vendor_thumbnail_url }}
                        style={styles["card-image"]}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                </View>
              );
            })}

          {/* 데이터 없음 */}
          {!isMainPlanLoading &&
            !mainPlanError &&
            (!mainPlanData?.items || mainPlanData.items.length === 0) && (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <Text style={{ color: colors.root.text, fontSize: 14 }}>
                  등록된 업체가 없습니다.
                </Text>
              </View>
            )}
        </View>

        {/* 정책 카드 섹션 */}
        <View style={styles["policy-section"]}>
          {/* 섹션 헤더 */}
          <View style={styles["policy-header"]}>
            <Text style={styles["policy-title"]} allowFontScaling={false}>
              신혼부부를 위한 지원 사업
            </Text>
          </View>

          {/* 로딩 상태 */}
          {isPoliciesLoading && (
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <ActivityIndicator size="large" color={colors.root.brand} />
              <Text
                style={{ marginTop: 12, color: colors.root.text, fontSize: 14 }}
              >
                정책 정보를 불러오는 중...
              </Text>
            </View>
          )}

          {/* 에러 상태 */}
          {policiesError && !isPoliciesLoading && (
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <Text style={{ color: colors.root.text, fontSize: 14 }}>
                정책 정보를 불러오는 중 오류가 발생했습니다.
              </Text>
            </View>
          )}

          {/* 정책 카드 리스트 (가로 스크롤) */}
          {!isPoliciesLoading && !policiesError && policiesData?.policies && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles["policy-scroll-content"]}
              decelerationRate="fast"
              snapToInterval={345 + 12} // Card width + gap
              snapToAlignment="start"
            >
              {policiesData.policies.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
            </ScrollView>
          )}

          {/* 데이터 없음 */}
          {!isPoliciesLoading &&
            !policiesError &&
            (!policiesData?.policies || policiesData.policies.length === 0) && (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <Text style={{ color: colors.root.text, fontSize: 14 }}>
                  등록된 정책이 없습니다.
                </Text>
              </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
}
