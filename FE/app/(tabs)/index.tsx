import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SelectButton, SelectButtonGroup } from "@/commons/components/select-button";
import { MapPin, Clock } from "lucide-react-native";

/**
 * Home Screen - SelectButton 예시
 */
export default function Home() {
  // 지역 선택 상태
  const [selectedRegion, setSelectedRegion] = React.useState("gangnam");

  // 예산 선택 상태
  const [selectedBudget, setSelectedBudget] = React.useState("3000");

  // 시간 선택 상태
  const [selectedTime, setSelectedTime] = React.useState("14:00");

  // 지역 옵션 (아이콘 있음, medium)
  const regionOptions = [
    {
      value: "gangnam",
      label: "강남구",
      icon: (
        <MapPin
          size={20}
          color={selectedRegion === "gangnam" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "seocho",
      label: "서초구",
      icon: (
        <MapPin
          size={20}
          color={selectedRegion === "seocho" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "songpa",
      label: "송파구",
      icon: (
        <MapPin
          size={20}
          color={selectedRegion === "songpa" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "jongno",
      label: "종로구",
      icon: (
        <MapPin
          size={20}
          color={selectedRegion === "jongno" ? "#861043" : "#364153"}
        />
      ),
    },
  ];

  // 예산 옵션 (아이콘 없음, medium)
  const budgetOptions = [
    { value: "1000", label: "1,000만원" },
    { value: "3000", label: "3,000만원" },
    { value: "5000", label: "5,000만원" },
    { value: "10000", label: "1억원" },
  ];

  // 시간 옵션 (아이콘 있음, small)
  const timeOptions = [
    {
      value: "09:00",
      label: "09:00",
      icon: (
        <Clock
          size={16}
          color={selectedTime === "09:00" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "11:00",
      label: "11:00",
      icon: (
        <Clock
          size={16}
          color={selectedTime === "11:00" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "14:00",
      label: "14:00",
      icon: (
        <Clock
          size={16}
          color={selectedTime === "14:00" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "16:00",
      label: "16:00",
      icon: (
        <Clock
          size={16}
          color={selectedTime === "16:00" ? "#861043" : "#364153"}
        />
      ),
    },
    {
      value: "18:00",
      label: "18:00",
      icon: (
        <Clock
          size={16}
          color={selectedTime === "18:00" ? "#861043" : "#364153"}
        />
      ),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>SelectButton 컴포넌트 예시</Text>
          <Text style={styles.subtitle}>
            다양한 크기와 스타일의 선택 버튼을 확인하세요
          </Text>
        </View>

        {/* 예시 1: 지역 선택 (아이콘 있음, medium) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            1. 지역 선택 (아이콘 있음, medium)
          </Text>
          <Text style={styles.sectionSubtitle}>
            선택된 지역: {selectedRegion}
          </Text>
          <SelectButtonGroup
            value={selectedRegion}
            onChange={setSelectedRegion}
            options={regionOptions}
            size="medium"
            direction="horizontal"
          />
        </View>

        {/* 예시 2: 예산 선택 (아이콘 없음, medium) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. 예산 선택 (아이콘 없음, medium)
          </Text>
          <Text style={styles.sectionSubtitle}>
            선택된 예산: {selectedBudget}만원
          </Text>
          <SelectButtonGroup
            value={selectedBudget}
            onChange={setSelectedBudget}
            options={budgetOptions}
            size="medium"
            direction="horizontal"
          />
        </View>

        {/* 예시 3: 시간 선택 (아이콘 있음, small) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. 시간 선택 (아이콘 있음, small)
          </Text>
          <Text style={styles.sectionSubtitle}>
            선택된 시간: {selectedTime}
          </Text>
          <SelectButtonGroup
            value={selectedTime}
            onChange={setSelectedTime}
            options={timeOptions}
            size="small"
            direction="horizontal"
          />
        </View>

        {/* 예시 4: 단일 SelectButton */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 단일 SelectButton</Text>
          <Text style={styles.sectionSubtitle}>
            개별 버튼으로도 사용 가능합니다
          </Text>
          <View style={styles.singleButtonRow}>
            <SelectButton
              state="default"
              label="Default"
              size="medium"
              onSelect={() => console.log("Default clicked")}
            />
            <SelectButton
              state="selected"
              label="Selected"
              size="medium"
              onSelect={() => console.log("Selected clicked")}
            />
          </View>
        </View>

        {/* 안내 텍스트 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 각 그룹에서는 하나의 항목만 선택할 수 있습니다
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 20,
    gap: 32,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2024",
    fontFamily: "Pretendard Variable",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#716b6e",
    fontFamily: "Pretendard Variable",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#524a4e",
    fontFamily: "Pretendard Variable",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#928d8f",
    fontFamily: "Pretendard Variable",
  },
  singleButtonRow: {
    flexDirection: "row",
    gap: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#524a4e",
    textAlign: "center",
    fontFamily: "Pretendard Variable",
  },
});

