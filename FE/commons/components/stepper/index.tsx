/**
 * Stepper Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 4190:2508
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 구조와 로직만 구현 (스타일은 styles.ts에 분리)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] variant 시스템 완전 구현 (default, active, completed)
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Check } from "lucide-react-native";
import { styles } from "./styles";

/**
 * Step 상태 타입
 */
export type StepState = "default" | "active" | "completed";

/**
 * StepItem Props 타입 정의
 */
export interface StepItemProps {
  /** 스텝 인덱스 (1부터 시작) */
  index: number;
  /** 스텝 제목 */
  title: string;
  /** 스텝 상태 */
  state: StepState;
  /** 스텝이 열려있는지 여부 */
  isOpen: boolean;
  /** 스텝 컨텐츠 (폼 영역) */
  children?: React.ReactNode;
  /** 스텝 클릭 핸들러 */
  onPress?: () => void;
  /** 마지막 스텝 여부 (연결선 표시 제어) */
  isLast?: boolean;
}

/**
 * StepItem 컴포넌트
 * 각 단계를 나타내는 컴포넌트 (제목 + 폼)
 */
export const StepItem: React.FC<StepItemProps> = ({
  index,
  title,
  state,
  isOpen,
  children,
  onPress,
  isLast = false,
}) => {
  /**
   * 아이콘 렌더링
   */
  const renderIcon = () => {
    if (state === "completed") {
      // Completed 상태: 체크 아이콘
      return (
        <View style={styles.stepSuccessIcon}>
          <Check color="#ffffff" size={12} strokeWidth={3} />
        </View>
      );
    } else if (state === "active") {
      // Active 상태: 원형 테두리 + 내부 사각형
      return (
        <View style={styles.stepShapeIcon}>
          <View style={styles.stepShapeInner} />
        </View>
      );
    } else {
      // Default 상태: 숫자 아이콘
      return (
        <View style={styles.stepNumberIcon}>
          <Text style={styles.stepNumberText}>{index}</Text>
        </View>
      );
    }
  };

  /**
   * 텍스트 스타일 결정
   */
  const getTextStyle = () => {
    if (state === "completed") {
      return styles.stepTextCompleted;
    } else if (state === "active") {
      return styles.stepTextActive;
    } else {
      return styles.stepTextDefault;
    }
  };

  return (
    <View style={styles.stepItem}>
      {/* Step Wrapper */}
      <View style={styles.stepWrapper}>
        {/* Step Header (클릭 가능) */}
        <Pressable
          onPress={onPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${title} 단계`}
          accessibilityState={{
            expanded: isOpen,
            disabled: state === "default",
          }}
        >
          <View style={styles.stepHeader}>
            <View style={styles.stepHeaderContent}>
              {/* Icon */}
              {renderIcon()}

              {/* Title Text */}
              <Text style={getTextStyle()}>{title}</Text>
            </View>
          </View>
        </Pressable>

        {/* Step Content (폼 영역) */}
        {isOpen && children && (
          <View
            style={[
              styles.stepContent,
              isOpen ? styles.stepContentExpanded : styles.stepContentCollapsed,
            ]}
          >
            {children}
          </View>
        )}
      </View>

      {/* Connector Line (마지막 스텝 제외, 폼이 닫혀있을 때만 표시) */}
      {!isLast && !isOpen && <View style={styles.connectorLine} />}
    </View>
  );
};

/**
 * Stepper Props 타입 정의
 */
export interface StepperProps {
  /** 스텝 목록 */
  steps: Array<{
    /** 스텝 제목 */
    title: string;
    /** 스텝 컨텐츠 (폼 영역) */
    content?: React.ReactNode;
  }>;
  /** 현재 활성 스텝 인덱스 (0부터 시작) */
  currentStep?: number;
  /** 완료된 스텝 인덱스 배열 (0부터 시작) */
  completedSteps?: number[];
  /** 스텝 변경 핸들러 */
  onStepChange?: (stepIndex: number) => void;
  /** 스텝 완료 핸들러 */
  onStepComplete?: (stepIndex: number) => void;
}

/**
 * Stepper 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 스텝퍼 컴포넌트
 * 순차적인 단계 진행을 관리하며, accordion 방식으로 동작
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep: controlledCurrentStep,
  completedSteps: controlledCompletedSteps,
  onStepChange,
  onStepComplete,
}) => {
  // 내부 상태 관리
  const [internalCurrentStep, setInternalCurrentStep] = useState(0);
  const [internalCompletedSteps, setInternalCompletedSteps] = useState<number[]>([]);

  // Controlled vs Uncontrolled 결정
  const currentStep = controlledCurrentStep !== undefined ? controlledCurrentStep : internalCurrentStep;
  const completedSteps = controlledCompletedSteps !== undefined ? controlledCompletedSteps : internalCompletedSteps;

  /**
   * 스텝 상태 결정
   */
  const getStepState = (stepIndex: number): StepState => {
    if (completedSteps.includes(stepIndex)) {
      return "completed";
    } else if (currentStep === stepIndex) {
      return "active";
    } else {
      return "default";
    }
  };

  /**
   * 스텝 클릭 핸들러
   * - default 상태인 스텝은 클릭 불가
   * - completed 또는 active 상태인 스텝은 클릭 시 열림
   */
  const handleStepPress = (stepIndex: number) => {
    const stepState = getStepState(stepIndex);

    // default 상태인 스텝은 클릭 불가
    if (stepState === "default") {
      return;
    }

    // 현재 열린 스텝을 다시 클릭하면 아무 동작 안 함
    if (currentStep === stepIndex) {
      return;
    }

    // 다른 스텝 클릭 시 해당 스텝으로 이동
    if (controlledCurrentStep === undefined) {
      setInternalCurrentStep(stepIndex);
    }

    if (onStepChange) {
      onStepChange(stepIndex);
    }
  };

  /**
   * 다음 스텝으로 이동
   * 현재 스텝을 완료 상태로 만들고 다음 스텝을 활성화
   */
  const goToNextStep = () => {
    const nextStepIndex = currentStep + 1;

    // 마지막 스텝이 아닌 경우에만 다음 스텝으로 이동
    if (nextStepIndex < steps.length) {
      // 현재 스텝을 완료 상태로 추가
      if (controlledCompletedSteps === undefined) {
        setInternalCompletedSteps((prev) => {
          if (!prev.includes(currentStep)) {
            return [...prev, currentStep];
          }
          return prev;
        });
      }

      if (onStepComplete) {
        onStepComplete(currentStep);
      }

      // 다음 스텝으로 이동
      if (controlledCurrentStep === undefined) {
        setInternalCurrentStep(nextStepIndex);
      }

      if (onStepChange) {
        onStepChange(nextStepIndex);
      }
    }
  };

  /**
   * 이전 스텝으로 이동
   */
  const goToPreviousStep = () => {
    const previousStepIndex = currentStep - 1;

    // 첫 번째 스텝이 아닌 경우에만 이전 스텝으로 이동
    if (previousStepIndex >= 0) {
      if (controlledCurrentStep === undefined) {
        setInternalCurrentStep(previousStepIndex);
      }

      if (onStepChange) {
        onStepChange(previousStepIndex);
      }
    }
  };

  return (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => (
        <StepItem
          key={index}
          index={index + 1}
          title={step.title}
          state={getStepState(index)}
          isOpen={currentStep === index}
          onPress={() => handleStepPress(index)}
          isLast={index === steps.length - 1}
        >
          {step.content}
        </StepItem>
      ))}
    </View>
  );
};

/**
 * Stepper Context를 사용하는 경우를 위한 Hook
 * 스텝 내부에서 다음/이전 스텝으로 이동할 수 있도록 함
 */
export interface StepperContextValue {
  currentStep: number;
  completedSteps: number[];
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (stepIndex: number) => void;
}

export const StepperContext = React.createContext<StepperContextValue | null>(null);

export const useStepperContext = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within a Stepper component");
  }
  return context;
};

/**
 * Context를 제공하는 Enhanced Stepper 컴포넌트
 */
export const StepperWithContext: React.FC<StepperProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(props.currentStep || 0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(props.completedSteps || []);

  const goToNextStep = () => {
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < props.steps.length) {
      setCompletedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });
      setCurrentStep(nextStepIndex);
      if (props.onStepChange) {
        props.onStepChange(nextStepIndex);
      }
      if (props.onStepComplete) {
        props.onStepComplete(currentStep);
      }
    }
  };

  const goToPreviousStep = () => {
    const previousStepIndex = currentStep - 1;
    if (previousStepIndex >= 0) {
      setCurrentStep(previousStepIndex);
      if (props.onStepChange) {
        props.onStepChange(previousStepIndex);
      }
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < props.steps.length) {
      setCurrentStep(stepIndex);
      if (props.onStepChange) {
        props.onStepChange(stepIndex);
      }
    }
  };

  const contextValue: StepperContextValue = {
    currentStep,
    completedSteps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  };

  return (
    <StepperContext.Provider value={contextValue}>
      <Stepper
        {...props}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepChange={props.onStepChange}
        onStepComplete={props.onStepComplete}
      />
    </StepperContext.Provider>
  );
};

export default Stepper;

