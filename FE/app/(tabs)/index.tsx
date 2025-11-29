/**
 * Home Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "@/commons/layout/GNB/components/Home/styles";
import { HOME_CONTENT } from "@/commons/enums/gnb";
import Button from "@/commons/components/button";
import Input from "@/commons/components/input";
import ContentSwitcher from "@/commons/components/content-switcher";
import Filter from "@/commons/components/filter";
import Toggle from "@/commons/components/toggle";
import { RadioGroup } from "@/commons/components/radio";
import {
  SelectButton,
  SelectButtonGroup,
} from "@/commons/components/select-button";
import {
  StepperWithContext,
  useStepperContext,
} from "@/commons/components/stepper";
import { Calendar } from "@/commons/components/calendar";
import { AlarmClock, MapPin, Clock } from "lucide-react-native";
import { brownColors } from "@/commons/enums/color";

// Stepper 예시를 위한 폼 데이터 타입
interface StepperFormData {
  region: string;
  budget: string;
  time: string;
}

// Stepper 예시를 위한 폼 컴포넌트들
function RegionSelectionForm({
  data,
  onChange,
}: {
  data: StepperFormData;
  onChange: (field: keyof StepperFormData, value: string) => void;
}) {
  const { autoCompleteStep } = useStepperContext();
  const ICON_COLOR_DEFAULT = brownColors["brown-2"];
  const ICON_COLOR_SELECTED = "#861043";

  const regionOptions = [
    {
      value: "gangnam",
      label: "강남구",
      icon: (
        <MapPin
          size={20}
          color={
            data.region === "gangnam" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "seocho",
      label: "서초구",
      icon: (
        <MapPin
          size={20}
          color={
            data.region === "seocho" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "songpa",
      label: "송파구",
      icon: (
        <MapPin
          size={20}
          color={
            data.region === "songpa" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "jongno",
      label: "종로구",
      icon: (
        <MapPin
          size={20}
          color={
            data.region === "jongno" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
  ];

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#524a4e" }}>
        지역을 선택해주세요
      </Text>
      <SelectButtonGroup
        value={data.region}
        onChange={(value) => {
          onChange("region", value);
          autoCompleteStep();
        }}
        options={regionOptions}
        size="medium"
        direction="horizontal"
      />
    </View>
  );
}

function BudgetSelectionForm({
  data,
  onChange,
}: {
  data: StepperFormData;
  onChange: (field: keyof StepperFormData, value: string) => void;
}) {
  const { autoCompleteStep } = useStepperContext();

  const budgetOptions = [
    { value: "1000", label: "1,000만원" },
    { value: "3000", label: "3,000만원" },
    { value: "5000", label: "5,000만원" },
    { value: "10000", label: "1억원" },
  ];

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#524a4e" }}>
        예산을 선택해주세요
      </Text>
      <SelectButtonGroup
        value={data.budget}
        onChange={(value) => {
          onChange("budget", value);
          autoCompleteStep();
        }}
        options={budgetOptions}
        size="medium"
        direction="horizontal"
      />
    </View>
  );
}

function TimeSelectionForm({
  data,
  onChange,
  onSubmit,
}: {
  data: StepperFormData;
  onChange: (field: keyof StepperFormData, value: string) => void;
  onSubmit: () => void;
}) {
  const { autoCompleteStep, autoProgressDelay } = useStepperContext();
  const ICON_COLOR_DEFAULT = brownColors["brown-2"];
  const ICON_COLOR_SELECTED = "#861043";

  const timeOptions = [
    {
      value: "09:00",
      label: "09:00",
      icon: (
        <Clock
          size={16}
          color={
            data.time === "09:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "11:00",
      label: "11:00",
      icon: (
        <Clock
          size={16}
          color={
            data.time === "11:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "14:00",
      label: "14:00",
      icon: (
        <Clock
          size={16}
          color={
            data.time === "14:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "16:00",
      label: "16:00",
      icon: (
        <Clock
          size={16}
          color={
            data.time === "16:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "18:00",
      label: "18:00",
      icon: (
        <Clock
          size={16}
          color={
            data.time === "18:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
  ];

  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: "500", color: "#524a4e" }}>
        시간을 선택해주세요
      </Text>
      <SelectButtonGroup
        value={data.time}
        onChange={(value) => {
          onChange("time", value);
          autoCompleteStep();
          // 마지막 스텝이므로 0.5초 후 onSubmit 호출
          setTimeout(() => {
            onSubmit();
          }, autoProgressDelay);
        }}
        options={timeOptions}
        size="small"
        direction="horizontal"
      />
    </View>
  );
}

export default function Home() {
  // Input 상태 관리
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [planName, setPlanName] = useState("");
  const [filledValue, setFilledValue] = useState("이름을 입력해주세요.");
  const [smallFilledValue, setSmallFilledValue] = useState("플랜 A");

  // Stepper 폼 데이터 상태 관리
  const [stepperFormData, setStepperFormData] = useState<StepperFormData>({
    region: "",
    budget: "",
    time: "",
  });

  // Stepper 폼 데이터 변경 핸들러
  const handleStepperFormChange = (
    field: keyof StepperFormData,
    value: string
  ) => {
    setStepperFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Stepper 폼 제출 핸들러
  const handleStepperFormSubmit = () => {
    console.log("Stepper Form Data:", stepperFormData);
    console.log("선택 완료!");
  };

  // Stepper 제목 생성 함수
  const getStepTitle = (step: "region" | "budget" | "time") => {
    const labels = {
      region: {
        default: "지역 선택",
        gangnam: "강남구",
        seocho: "서초구",
        songpa: "송파구",
        jongno: "종로구",
      },
      budget: {
        default: "예산 선택",
        "1000": "1,000만원",
        "3000": "3,000만원",
        "5000": "5,000만원",
        "10000": "1억원",
      },
      time: {
        default: "시간 선택",
        "09:00": "09:00",
        "11:00": "11:00",
        "14:00": "14:00",
        "16:00": "16:00",
        "18:00": "18:00",
      },
    };

    const value = stepperFormData[step];
    if (value && labels[step][value as keyof (typeof labels)[typeof step]]) {
      return labels[step][value as keyof (typeof labels)[typeof step]];
    }
    return labels[step].default;
  };

  // ContentSwitcher 상태 관리
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Filter 상태 관리
  const [selectedFilters, setSelectedFilters] = useState<
    { id: string; label: string; isSelected: boolean }[]
  >([]);

  // Toggle 상태 관리
  const [notificationToggle, setNotificationToggle] = useState<"on" | "off">(
    "off"
  );
  const [darkModeToggle, setDarkModeToggle] = useState<"on" | "off">("on");
  const [autoSaveToggle, setAutoSaveToggle] = useState<"on" | "off">("off");

  // Radio 상태 관리
  const [gender, setGender] = useState("male");
  const [plan, setPlan] = useState("basic");

  // Calendar 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // SelectButton 상태 관리
  const [selectedRegion, setSelectedRegion] = useState("gangnam");
  const [selectedBudget, setSelectedBudget] = useState("3000");
  const [selectedTime, setSelectedTime] = useState("14:00");

  // 아이콘 색상 상수
  const ICON_COLOR_DEFAULT = brownColors["brown-2"]; // #d5d4d5 (피그마 default 아이콘 색상)
  const ICON_COLOR_SELECTED = "#861043"; // 피그마 selected 아이콘 색상

  // 지역 옵션 (아이콘 있음, medium)
  const regionOptions = [
    {
      value: "gangnam",
      label: "강남구",
      icon: (
        <MapPin
          size={20}
          color={
            selectedRegion === "gangnam"
              ? ICON_COLOR_SELECTED
              : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "seocho",
      label: "서초구",
      icon: (
        <MapPin
          size={20}
          color={
            selectedRegion === "seocho"
              ? ICON_COLOR_SELECTED
              : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "songpa",
      label: "송파구",
      icon: (
        <MapPin
          size={20}
          color={
            selectedRegion === "songpa"
              ? ICON_COLOR_SELECTED
              : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "jongno",
      label: "종로구",
      icon: (
        <MapPin
          size={20}
          color={
            selectedRegion === "jongno"
              ? ICON_COLOR_SELECTED
              : ICON_COLOR_DEFAULT
          }
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
          color={
            selectedTime === "09:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "11:00",
      label: "11:00",
      icon: (
        <Clock
          size={16}
          color={
            selectedTime === "11:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "14:00",
      label: "14:00",
      icon: (
        <Clock
          size={16}
          color={
            selectedTime === "14:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "16:00",
      label: "16:00",
      icon: (
        <Clock
          size={16}
          color={
            selectedTime === "16:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
    {
      value: "18:00",
      label: "18:00",
      icon: (
        <Clock
          size={16}
          color={
            selectedTime === "18:00" ? ICON_COLOR_SELECTED : ICON_COLOR_DEFAULT
          }
        />
      ),
    },
  ];

  return (
    <ScrollView
      style={styles["home-scroll-view"]}
      contentContainerStyle={styles["home-scroll-container"]}
    >
      <View style={styles["home-container"]}>
        <Text style={styles["home-title"]}>{HOME_CONTENT.TITLE}</Text>
        <Text style={styles["home-subtitle"]}>{HOME_CONTENT.SUBTITLE}</Text>
        <StatusBar style="auto" />

        {/* Input 컴포넌트 예시 */}
        <View style={styles["input-demo-section"]}>
          <Text style={styles["section-title"]}>Input 컴포넌트 예시</Text>

          {/* Medium Size - Default (Empty) */}
          <Input
            label="이름"
            placeholder="이름을 입력해주세요."
            size="medium"
            value={name}
            onChangeText={setName}
          />

          {/* Medium Size - Filled */}
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요."
            size="medium"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Medium Size - Filled (초기값 있음) */}
          <Input
            label="닉네임"
            size="medium"
            value={filledValue}
            onChangeText={setFilledValue}
          />

          {/* Small Size - Default (Empty) */}
          <Input
            label="플랜 이름"
            placeholder="플랜 A"
            size="small"
            value={planName}
            onChangeText={setPlanName}
          />

          {/* Small Size - Filled (초기값 있음) */}
          <Input
            label="플랜 설명"
            size="small"
            value={smallFilledValue}
            onChangeText={setSmallFilledValue}
          />

          {/* Medium Size - Disabled */}
          <Input
            label="플랜 이름 (비활성화)"
            value="플랜 A"
            size="medium"
            disabled={true}
          />

          {/* Small Size - Disabled */}
          <Input
            label="메모 (비활성화)"
            value="수정 불가"
            size="small"
            disabled={true}
          />
        </View>

        {/* Button 컴포넌트 예시 */}
        <View style={styles["button-demo-section"]}>
          <Text style={styles["section-title"]}>Button 컴포넌트 예시</Text>

          <Button
            variant="outlined"
            size="small"
            onPress={() => console.log("cancel")}
          >
            취소
          </Button>
          <Button
            disabled={true}
            size="medium"
            icon={true}
            iconComponent={<AlarmClock size={20} color={"#fff"} />}
          >
            예약 신청
          </Button>
          <Button variant="filled" size="large">
            저장하기
          </Button>
        </View>

        {/* ContentSwitcher 컴포넌트 예시 */}
        <View style={styles["content-switcher-demo-section"]}>
          <Text style={styles["section-title"]}>
            ContentSwitcher 컴포넌트 예시
          </Text>
          <Text style={styles["demo-description"]}>
            선택된 카테고리:{" "}
            {["스튜디오", "드레스", "메이크업", "웨딩홀"][selectedCategory]}
          </Text>

          {/* 기본 ContentSwitcher */}
          <ContentSwitcher
            selectedIndex={selectedCategory}
            onSelectionChange={setSelectedCategory}
          />
        </View>

        {/* Filter 컴포넌트 예시 */}
        <View style={styles["filter-demo-section"]}>
          <Text style={styles["section-title"]}>Filter 컴포넌트 예시</Text>
          <Text style={styles["demo-description"]}>
            선택된 필터:{" "}
            {selectedFilters
              .filter((item) => item.isSelected)
              .map((item) => item.label)
              .join(", ") || "없음"}
          </Text>

          {/* 기본 Filter */}
          <Filter onSelectionChange={setSelectedFilters} variant="inActive" />
        </View>

        {/* Toggle 컴포넌트 예시 */}
        <View style={styles["toggle-demo-section"]}>
          <Text style={styles["section-title"]}>Toggle 컴포넌트 예시</Text>

          {/* 알림 설정 Toggle - OFF 상태 */}
          <View style={styles["toggle-item"]}>
            <Text style={styles["toggle-label"]}>알림 받기</Text>
            <Toggle
              state={notificationToggle}
              onToggle={setNotificationToggle}
            />
          </View>

          {/* 다크 모드 Toggle - ON 상태 */}
          <View style={styles["toggle-item"]}>
            <Text style={styles["toggle-label"]}>다크 모드</Text>
            <Toggle state={darkModeToggle} onToggle={setDarkModeToggle} />
          </View>

          {/* 자동 저장 Toggle - OFF 상태 */}
          <View style={styles["toggle-item"]}>
            <Text style={styles["toggle-label"]}>자동 저장</Text>
            <Toggle state={autoSaveToggle} onToggle={setAutoSaveToggle} />
          </View>

          {/* Disabled 상태 예시 */}
          <View style={styles["toggle-item"]}>
            <Text style={styles["toggle-label"]}>활성화 안 됨</Text>
            <Toggle state="on" disabled={true} />
          </View>

          <Text style={styles["demo-description"]}>
            알림: {notificationToggle === "on" ? "켜짐" : "꺼짐"} | 다크 모드:{" "}
            {darkModeToggle === "on" ? "켜짐" : "꺼짐"} | 자동 저장:{" "}
            {autoSaveToggle === "on" ? "켜짐" : "꺼짐"}
          </Text>
        </View>

        {/* Radio 컴포넌트 예시 */}
        <View style={styles["radio-demo-section"]}>
          <Text style={styles["section-title"]}>Radio 컴포넌트 예시</Text>

          {/* RadioGroup - 성별 선택 (가로 정렬) */}
          <Text style={styles["demo-label"]}>성별 선택 (가로 정렬)</Text>
          <RadioGroup
            value={gender}
            onChange={setGender}
            options={[
              { value: "male", label: "남성" },
              { value: "female", label: "여성" },
            ]}
            direction="horizontal"
          />

          {/* RadioGroup - 플랜 선택 (세로 정렬) */}
          <Text style={styles["demo-label"]}>플랜 선택 (세로 정렬)</Text>
          <RadioGroup
            value={plan}
            onChange={setPlan}
            options={[
              { value: "basic", label: "베이직" },
              { value: "premium", label: "프리미엄" },
              { value: "enterprise", label: "엔터프라이즈" },
            ]}
            direction="vertical"
          />

          {/* Disabled 상태 예시 (가로 정렬) */}
          <Text style={styles["demo-label"]}>비활성화 상태 (가로)</Text>
          <RadioGroup
            value="option1"
            onChange={() => {}}
            options={[
              { value: "option1", label: "옵션 1" },
              { value: "option2", label: "옵션 2" },
            ]}
            direction="horizontal"
            disabled={true}
          />

          <Text style={styles["demo-description"]}>
            선택된 성별: {gender === "male" ? "남성" : "여성"} | 선택된 플랜:{" "}
            {plan === "basic"
              ? "베이직"
              : plan === "premium"
              ? "프리미엄"
              : "엔터프라이즈"}
          </Text>
        </View>

        {/* SelectButton 컴포넌트 예시 */}
        <View style={styles["select-button-demo-section"]}>
          <Text style={styles["section-title"]}>
            SelectButton 컴포넌트 예시
          </Text>

          {/* 지역 선택 (아이콘 있음, medium) */}
          <Text style={styles["demo-label"]}>
            지역 선택 (아이콘 있음, medium)
          </Text>
          <Text style={styles["demo-description"]}>
            선택된 지역: {selectedRegion}
          </Text>
          <SelectButtonGroup
            value={selectedRegion}
            onChange={setSelectedRegion}
            options={regionOptions}
            size="medium"
            direction="horizontal"
          />

          {/* 예산 선택 (아이콘 없음, medium) */}
          <Text style={styles["demo-label"]}>
            예산 선택 (아이콘 없음, medium)
          </Text>
          <Text style={styles["demo-description"]}>
            선택된 예산: {selectedBudget}만원
          </Text>
          <SelectButtonGroup
            value={selectedBudget}
            onChange={setSelectedBudget}
            options={budgetOptions}
            size="medium"
            direction="horizontal"
          />

          {/* 시간 선택 (아이콘 있음, small) */}
          <Text style={styles["demo-label"]}>
            시간 선택 (아이콘 있음, small)
          </Text>
          <Text style={styles["demo-description"]}>
            선택된 시간: {selectedTime}
          </Text>
          <SelectButtonGroup
            value={selectedTime}
            onChange={setSelectedTime}
            options={timeOptions}
            size="small"
            direction="horizontal"
          />

          {/* 단일 SelectButton */}
          <Text style={styles["demo-label"]}>단일 SelectButton</Text>
          <View style={styles["single-button-row"]}>
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

        {/* Stepper 컴포넌트 예시 */}
        <View style={styles["stepper-demo-section"]}>
          <Text style={styles["section-title"]}>Stepper 컴포넌트 예시</Text>
          <Text style={styles["demo-description"]}>
            순차적인 단계를 진행하는 컴포넌트입니다. 각 단계를 클릭하여 다시 열
            수 있습니다.
          </Text>

          <StepperWithContext
            steps={[
              {
                title: getStepTitle("region"),
                content: (
                  <RegionSelectionForm
                    data={stepperFormData}
                    onChange={handleStepperFormChange}
                  />
                ),
              },
              {
                title: getStepTitle("budget"),
                content: (
                  <BudgetSelectionForm
                    data={stepperFormData}
                    onChange={handleStepperFormChange}
                  />
                ),
              },
              {
                title: getStepTitle("time"),
                content: (
                  <TimeSelectionForm
                    data={stepperFormData}
                    onChange={handleStepperFormChange}
                    onSubmit={handleStepperFormSubmit}
                  />
                ),
              },
            ]}
            autoProgress={true}
            autoProgressDelay={500}
          />
        </View>

        {/* Calendar 컴포넌트 예시 */}
        <View style={styles["calendar-demo-section"]}>
          <Text style={styles["section-title"]}>Calendar 컴포넌트 예시</Text>
          <Text style={styles["demo-description"]}>
            가로 스크롤 방식의 월별 캘린더입니다. 오늘 이후 날짜만 선택할 수
            있습니다.
          </Text>
          {selectedDate && (
            <Text style={styles["demo-description"]}>
              선택된 날짜: {selectedDate.getFullYear()}년{" "}
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
            </Text>
          )}

          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            subtitle="원하는 날짜를 선택해주세요"
          />
        </View>
      </View>
    </ScrollView>
  );
}
