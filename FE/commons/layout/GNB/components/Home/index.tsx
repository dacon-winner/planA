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

export default function Home() {
  const { data: plansData, isLoading, error } = usePlans();
  const {
    data: policiesData,
    isLoading: isPoliciesLoading,
    error: policiesError,
  } = usePolicies();

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
              결혼식까지 N일 남았어요
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
                  {usersInfo?.wedding_date || "미정"}
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
                  {usersInfo?.preferred_region || "미정"}
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
                  {usersInfo?.budget_limit
                    ? `${usersInfo.budget_limit.toLocaleString()}만원`
                    : "미정"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 하단 카드 그리드 - full width */}
        <View style={styles["card-grid"]}>
          {/* 카드 1 - 에이비 스튜디오 */}
          <View style={styles["vendor-card"]}>
            <View style={styles["card-content"]}>
              <View style={styles["card-info"]}>
                <View style={styles["card-header"]}>
                  <Text style={styles["card-title"]}>에이비 스튜디오</Text>
                  <View style={styles["card-meta"]}>
                    <Text style={styles["card-category-bold"]}>스튜디오</Text>
                    <Text style={styles["card-location"]}>서울 강남구</Text>
                  </View>
                </View>
                <View style={styles["card-status"]}>
                  <Clock size={12} color="#524a4e" />
                  <Text style={styles["card-status-text"]}>예약 문의 중</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "http://localhost:3845/assets/8ebf14d458196f6acfdcfdd1afa9adc590fb20e8.png",
                }}
                style={styles["card-image"]}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* 카드 2 - 브라이드 드레스 */}
          <View style={styles["vendor-card"]}>
            <View style={styles["card-content"]}>
              <View style={styles["card-info"]}>
                <View style={styles["card-header"]}>
                  <Text style={styles["card-title"]}>브라이드 드레스</Text>
                  <View style={styles["card-meta"]}>
                    <Text style={styles["card-category-bold"]}>드레스</Text>
                    <Text style={styles["card-location"]}>서울 서초구</Text>
                  </View>
                </View>
                <View style={styles["card-status"]}>
                  <Clock size={12} color={colors.root.text} />
                  <Text style={styles["card-status-text"]}>
                    2025년 11월 27일 방문 예정
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "http://localhost:3845/assets/e96f51116299bba1b4466fb0879e5d7378bef1c4.png",
                }}
                style={styles["card-image"]}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* 카드 3 - 프롬바이어스 (회색) */}
          <View style={styles["vendor-card"]}>
            <View style={styles["card-content"]}>
              <View style={styles["card-info"]}>
                <View style={styles["card-header"]}>
                  <Text style={styles["card-title-inactive"]}>
                    프롬바이어스
                  </Text>
                  <View style={styles["card-meta"]}>
                    <Text style={styles["card-category-inactive"]}>
                      메이크업
                    </Text>
                    <Text style={styles["card-location-inactive"]}>
                      서울 강남구
                    </Text>
                  </View>
                </View>
                <View style={styles["card-status"]}>
                  <Text style={styles["card-status-text-inactive"]}>
                    업체 저장 전
                  </Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "http://localhost:3845/assets/3e0d3efcb7266f84d34018e2a9bbc6e1f5cf69cc.png",
                }}
                style={styles["card-image"]}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* 카드 4 - 타임스퀘어홀 */}
          <View style={styles["vendor-card"]}>
            <View style={styles["card-content"]}>
              <View style={styles["card-info"]}>
                <View style={styles["card-header"]}>
                  <Text style={styles["card-title"]}>타임스퀘어홀</Text>
                  <View style={styles["card-meta"]}>
                    <Text style={styles["card-category-bold"]}>웨딩홀</Text>
                    <Text style={styles["card-location"]}>서울 강남구</Text>
                  </View>
                </View>
                <View style={styles["card-status"]}>
                  <Clock size={12} color={colors.root.text} />
                  <Text style={styles["card-status-text"]}>계약 완료</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: "http://localhost:3845/assets/5119a2164e6d4fd89fa9b492312fd60515cf25eb.png",
                }}
                style={styles["card-image"]}
                resizeMode="cover"
              />
            </View>
          </View>
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
