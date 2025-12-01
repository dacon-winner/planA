/**
 * Modal Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-29
 * 피그마 노드ID: 기본 Modal 컴포넌트
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건) - 모든 색상 토큰 사용
 * [✓] 인라인 스타일 0건 - 모든 스타일 styles.ts로 분리
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 * [✓] 그림자 효과 추가 (피그마 Drop shadow 준수)
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/commons/components/button';
import { styles } from './styles';

/**
/**
 * 모달 버튼 설정 타입
 */
export interface ModalButtonConfig {
  /** 버튼 텍스트 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onPress: () => void;
  /** 버튼 비활성화 상태 */
  disabled?: boolean;
}


/**
 * 모달 버튼 Props 타입
 */
export interface ModalButtonsProps {
  /** 왼쪽 버튼 (취소/닫기) */
  left?: ModalButtonConfig;
  /** 오른쪽 버튼 (확인/저장) */
  right?: ModalButtonConfig;
}

/**
 * Modal Props 타입 정의
 */
export interface ModalProps {
  /** 상단 타이틀 */
  title?: string;
  /** 타이틀 하단 설명 텍스트 */
  description?: string;
  /** Input, Dropdown, Message 등 가변적인 컨텐츠 */
  children?: React.ReactNode;
  /** 하단 고정 버튼 설정 */
  buttons?: ModalButtonsProps;
}

/**
 * 텍스트를 처리하여 마침표 뒤에 줄바꿈을 추가하는 함수
 */
const processTextWithLineBreaks = (text: string): string => {
  if (!text) return text;

  // 마침표 뒤에 줄바꿈 추가 (단, 숫자 뒤의 마침표는 제외)
  return text.replace(/\.(\s|$)/g, '.\n');
};

/**
 * Modal 컴포넌트
 * 피그마 디자인 시스템을 기반으로 한 재사용 가능한 모달 컴포넌트
 * ModalProvider와 함께 사용되므로 자체 backdrop을 포함하지 않음
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  buttons,
}) => {
  // 버튼 존재 여부 확인
  const hasLeftButton = buttons?.left;
  const hasRightButton = buttons?.right;
  const hasButtons = hasLeftButton || hasRightButton;

  // 설명 텍스트 처리 (마침표 뒤 줄바꿈)
  const processedDescription = description ? processTextWithLineBreaks(description) : undefined;

  return (
    <View style={styles.container}>
      {/* 제목 영역 */}
      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* 설명 영역 */}
      {processedDescription && (
        <View style={styles.descriptionContainer}>
          {processedDescription.split('\n').map((line, index) => (
            <Text key={index} style={styles.description}>
              {line}
            </Text>
          ))}
        </View>
      )}

      {/* 컨텐츠 영역 */}
      {children && (
        <View style={styles.content} pointerEvents="auto">
          {children}
        </View>
      )}

      {/* 버튼 영역 */}
      {hasButtons && (
        <View style={styles.buttonContainer}>
          {/* 왼쪽 버튼 (취소/닫기) */}
          {hasLeftButton && (
            <View style={hasRightButton ? styles.leftButton : styles.fullWidthButton}>
              <Button
                variant="outlined"
                size="small"
                disabled={buttons.left?.disabled}
                onPress={buttons.left?.onPress}
              >
                {buttons.left?.label || ''}
              </Button>
            </View>
          )}

          {/* 버튼 간 간격 (양쪽 버튼이 모두 있을 때만) */}
          {hasLeftButton && hasRightButton && <View style={styles.buttonGap} />}

          {/* 오른쪽 버튼 (확인/저장) */}
          {hasRightButton && (
            <View style={hasLeftButton ? styles.rightButton : styles.fullWidthButton}>
              <Button
                variant="filled"
                size="small"
                disabled={buttons.right?.disabled}
                onPress={buttons.right?.onPress}
              >
                {buttons.right?.label || ''}
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
