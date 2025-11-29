# Stepper 컴포넌트

## 개요

피그마 디자인 시스템을 기반으로 한 재사용 가능한 단계별 진행 컴포넌트입니다. 
순차적인 단계 진행을 관리하며, accordion 방식으로 한 번에 하나의 단계만 열립니다.

## 버전 정보

- **버전**: v1.0.0
- **생성일**: 2025-11-29
- **피그마 노드ID**: 4190:2508

## 특징

- ✅ 3가지 상태: `default`, `active`, `completed`
- ✅ Accordion 방식 UI (하나의 스텝만 열림)
- ✅ 완료된 스텝 재진입 가능
- ✅ Controlled/Uncontrolled 모드 지원
- ✅ Context API를 통한 스텝 제어
- ✅ 완전한 접근성 지원
- ✅ TypeScript 타입 지원

## 기본 사용법

### Uncontrolled Stepper (기본)

```tsx
import { Stepper } from "@/commons/components/stepper";

function MyComponent() {
  return (
    <Stepper
      steps={[
        {
          title: "Personal info",
          content: <PersonalInfoForm />,
        },
        {
          title: "Social accounts",
          content: <SocialAccountsForm />,
        },
        {
          title: "Payment info",
          content: <PaymentInfoForm />,
        },
      ]}
    />
  );
}
```

### Controlled Stepper

```tsx
import { Stepper } from "@/commons/components/stepper";
import React from "react";

function MyComponent() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      if (!prev.includes(stepIndex)) {
        return [...prev, stepIndex];
      }
      return prev;
    });
  };

  return (
    <Stepper
      steps={[
        { title: "Personal info", content: <PersonalInfoForm /> },
        { title: "Social accounts", content: <SocialAccountsForm /> },
        { title: "Payment info", content: <PaymentInfoForm /> },
      ]}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepChange={handleStepChange}
      onStepComplete={handleStepComplete}
    />
  );
}
```

### Context API 사용 (권장)

```tsx
import { StepperWithContext, useStepperContext } from "@/commons/components/stepper";

// 폼 컴포넌트 내부에서 스텝 제어
function PersonalInfoForm() {
  const { goToNextStep, goToPreviousStep } = useStepperContext();

  const handleSubmit = () => {
    // 폼 검증 후 다음 스텝으로 이동
    goToNextStep();
  };

  return (
    <View>
      {/* 폼 필드들 */}
      <Button onPress={handleSubmit}>다음</Button>
    </View>
  );
}

function MyComponent() {
  return (
    <StepperWithContext
      steps={[
        { title: "Personal info", content: <PersonalInfoForm /> },
        { title: "Social accounts", content: <SocialAccountsForm /> },
        { title: "Payment info", content: <PaymentInfoForm /> },
      ]}
    />
  );
}
```

## Props

### Stepper Props

| Prop              | Type                                                | Default | Required | Description                  |
| ----------------- | --------------------------------------------------- | ------- | -------- | ---------------------------- |
| `steps`           | `Array<{ title: string, content?: ReactNode }>`    | -       | ✅       | 스텝 목록                    |
| `currentStep`     | `number`                                            | `0`     | ❌       | 현재 활성 스텝 인덱스        |
| `completedSteps`  | `number[]`                                          | `[]`    | ❌       | 완료된 스텝 인덱스 배열      |
| `onStepChange`    | `(stepIndex: number) => void`                       | -       | ❌       | 스텝 변경 시 호출되는 콜백   |
| `onStepComplete`  | `(stepIndex: number) => void`                       | -       | ❌       | 스텝 완료 시 호출되는 콜백   |

### StepItem Props

| Prop       | Type           | Default | Required | Description                    |
| ---------- | -------------- | ------- | -------- | ------------------------------ |
| `index`    | `number`       | -       | ✅       | 스텝 인덱스 (1부터 시작)       |
| `title`    | `string`       | -       | ✅       | 스텝 제목                      |
| `state`    | `StepState`    | -       | ✅       | 스텝 상태                      |
| `isOpen`   | `boolean`      | -       | ✅       | 스텝 열림 여부                 |
| `children` | `ReactNode`    | -       | ❌       | 스텝 컨텐츠 (폼 영역)          |
| `onPress`  | `() => void`   | -       | ❌       | 스텝 클릭 핸들러               |
| `isLast`   | `boolean`      | `false` | ❌       | 마지막 스텝 여부 (연결선 제어) |

### useStepperContext 반환값

| Property           | Type                       | Description           |
| ------------------ | -------------------------- | --------------------- |
| `currentStep`      | `number`                   | 현재 활성 스텝 인덱스 |
| `completedSteps`   | `number[]`                 | 완료된 스텝 배열      |
| `goToNextStep`     | `() => void`               | 다음 스텝으로 이동    |
| `goToPreviousStep` | `() => void`               | 이전 스텝으로 이동    |
| `goToStep`         | `(stepIndex: number) => void` | 특정 스텝으로 이동 |

## 스텝 상태

### default

- 아직 진행하지 않은 단계
- 클릭 불가능
- 회색 숫자 아이콘 표시

### active

- 현재 진행 중인 단계
- 클릭 가능 (현재 스텝 클릭 시 아무 동작 안 함)
- 핑크색 원형 테두리 + 내부 사각형 아이콘

### completed

- 완료된 단계
- 클릭 가능 (재진입 가능)
- 핑크색 체크 아이콘 표시

## 동작 방식

### Accordion 동작

- 한 번에 하나의 스텝만 열림
- 스텝 제목 클릭 시 해당 스텝이 열리고 다른 스텝은 자동으로 닫힘
- Default 상태 스텝은 클릭 불가 (순차 진행 강제)

### 스텝 진행

1. 초기 상태: 첫 번째 스텝이 `active` 상태로 열림
2. 폼 작성 완료 후 다음 스텝으로 이동 시:
   - 현재 스텝 → `completed` 상태로 변경
   - 다음 스텝 → `active` 상태로 변경 및 열림
3. 완료된 스텝 클릭 시:
   - 해당 스텝이 다시 열림
   - 현재 열린 스텝은 자동으로 닫힘

## 사용 예시

### 회원가입 스텝

```tsx
import { StepperWithContext, useStepperContext } from "@/commons/components/stepper";
import { View, TextInput, Button } from "react-native";

function Step1PersonalInfo() {
  const { goToNextStep } = useStepperContext();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleNext = () => {
    // 폼 검증
    if (name && email) {
      goToNextStep();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="다음" onPress={handleNext} />
    </View>
  );
}

function Step2SocialAccounts() {
  const { goToNextStep, goToPreviousStep } = useStepperContext();
  const [twitter, setTwitter] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");

  return (
    <View>
      <TextInput
        placeholder="Twitter"
        value={twitter}
        onChangeText={setTwitter}
      />
      <TextInput
        placeholder="LinkedIn"
        value={linkedin}
        onChangeText={setLinkedin}
      />
      <Button title="이전" onPress={goToPreviousStep} />
      <Button title="다음" onPress={goToNextStep} />
    </View>
  );
}

function Step3PaymentInfo() {
  const { goToPreviousStep } = useStepperContext();
  const [cardNumber, setCardNumber] = React.useState("");

  const handleSubmit = () => {
    // 최종 제출 로직
    console.log("Submitted!");
  };

  return (
    <View>
      <TextInput
        placeholder="카드 번호"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <Button title="이전" onPress={goToPreviousStep} />
      <Button title="완료" onPress={handleSubmit} />
    </View>
  );
}

function SignupPage() {
  return (
    <StepperWithContext
      steps={[
        { title: "Personal info", content: <Step1PersonalInfo /> },
        { title: "Social accounts", content: <Step2SocialAccounts /> },
        { title: "Payment info", content: <Step3PaymentInfo /> },
      ]}
    />
  );
}
```

### 컨텐츠 없는 스텝 (제목만)

```tsx
<Stepper
  steps={[
    { title: "Step 1" },
    { title: "Step 2" },
    { title: "Step 3" },
  ]}
/>
```

## 디자인 토큰

### 색상

- **Default 상태**
  - Icon Background: `rgba(173, 162, 162, 0.2)` (#ada2a2 20% opacity)
  - Icon Text: `#495aff`
  - Text: `#998d8d`

- **Active 상태**
  - Icon Border: `#e64485`
  - Icon Inner: `#e64485`
  - Text: `#e64485`

- **Completed 상태**
  - Icon Background: `#e64485`
  - Icon Check: `#ffffff`
  - Text: `#0d0b26`

- **Connector Line**
  - Color: `rgba(173, 162, 162, 0.2)` (#ada2a2 20% opacity)
  - Width: `2px`
  - Height: `40px`

### 크기

- **Container**: 300px width
- **Step Header**: 300px × 52px
- **Icon**: 20px × 20px, borderRadius 10px
- **Inner Rectangle**: 10px × 10px, borderRadius 5px
- **Check Icon**: 12px × 12px

### 타이포그래피

- **Font Size**: 14px
- **Font Weight**: 500 (Medium)
- **Line Height**: 20px
- **Letter Spacing**: 0em

### 간격

- **Vertical Padding**: 16px
- **Horizontal Padding**: 24px
- **Icon-Text Gap**: 12px

## 접근성

- `accessibilityRole="button"` 설정 (스텝 헤더)
- `accessibilityState`로 열림/비활성화 상태 전달
- `accessibilityLabel`로 스텝 이름 제공
- 키보드 내비게이션 지원

## 파일 구조

```
stepper/
├── index.tsx          # 컴포넌트 구현
├── styles.ts          # 스타일 정의
├── prompts/           # 구현 프롬프트
│   └── prompt.101.ui.txt
└── README.md          # 사용 가이드 (본 문서)
```

## 주의사항

1. `StepperWithContext` 사용 시 `useStepperContext`는 반드시 하위 컴포넌트에서만 호출해야 합니다
2. `currentStep`과 `completedSteps`를 함께 제어하는 경우 상태 동기화에 주의하세요
3. Default 상태 스텝은 클릭할 수 없습니다 (순차 진행 강제)
4. 스텝 컨텐츠는 열려있을 때만 렌더링됩니다
5. 연결선은 마지막 스텝 제외하고 모두 표시됩니다

## 변경 이력

- **v1.0.0** (2025-11-29): 초기 릴리즈
  - 기본 Stepper 컴포넌트
  - StepItem 컴포넌트
  - 3가지 상태 지원 (default, active, completed)
  - Controlled/Uncontrolled 모드 지원
  - Context API 지원 (StepperWithContext, useStepperContext)
  - Accordion 방식 UI
  - 완료된 스텝 재진입 가능

