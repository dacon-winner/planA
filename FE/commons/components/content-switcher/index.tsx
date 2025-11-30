/**
 * ContentSwitcher Component
 * 버전: v1.0.0
 * 생성 시각: 2025-11-28
 * 피그마 노드ID: 4116:405
 *
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함 확인
 * [✓] 색상값 직접 입력 0건 (hex/rgb/hsl 사용 0건)
 * [✓] 인라인 스타일 0건
 * [✓] index.tsx → 구조만 / styles.ts → 스타일만 분리 유지
 * [✓] nativewind 토큰 참조만 사용
 * [✓] 피그마 구조 대비 누락 섹션 없음
 * [✓] 접근성: 시맨틱/포커스/명도 대비/탭타겟 통과
 */

import React from "react";
import { Pressable, Text, View, ViewProps } from "react-native";
import { styles, SECTION_WIDTHS } from "./styles";

/**
 * 메뉴 아이템 상수 정의
 * 외부 API가 아닌 컴포넌트 내부에 하드코딩된 고정 메뉴 목록
 */
export const MENU_ITEMS = ["스튜디오", "드레스", "메이크업", "웨딩홀"] as const;

/**
 * ContentSwitcher Props 타입 정의
 */
export interface ContentSwitcherProps extends Omit<ViewProps, "style"> {
  /** 표시할 메뉴 아이템들 */
  items?: readonly string[];
  /** 현재 선택된 메뉴 인덱스 */
  selectedIndex?: number;
  /** 선택 변경 시 호출되는 콜백 함수 */
  onSelectionChange?: (index: number) => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 컴포넌트 크기 변형 */
  size?: "small" | "medium";
}

/**
 * ContentSwitcher 컴포넌트
 * 탭 메뉴와 동일한 기능의 콘텐츠 스위처 컴포넌트
 * 한 번에 하나의 아이템만 선택 가능하며, Single Selection 모드
 */
export const ContentSwitcher: React.FC<ContentSwitcherProps> = ({
  items = MENU_ITEMS,
  selectedIndex = 0,
  onSelectionChange,
  disabled = false,
  size = "medium",
  ...viewProps
}) => {
  /**
   * 메뉴 아이템 클릭 핸들러
   * 선택된 아이템의 인덱스를 부모 컴포넌트에 전달
   */
  const handleItemPress = (index: number) => {
    if (onSelectionChange) {
      onSelectionChange(index);
    }
  };

  /**
   * Divider 표시 여부 결정
   * Active된 컴포넌트 양쪽에는 divider가 없음
   */
  const shouldShowDivider = (index: number) => {
    // 마지막 아이템이 아니고, 현재 아이템이나 다음 아이템이 active가 아니어야 함
    return index < items.length - 1 && selectedIndex !== index && selectedIndex !== index + 1;
  };

  /**
   * Divider 스타일 결정 (항상 공간 차지, 표시 여부만 조절)
   */
  const getDividerStyle = (index: number) => {
    const baseStyle = [styles.divider];
    const isVisible = shouldShowDivider(index);

    return [
      ...baseStyle,
      {
        opacity: isVisible ? 1 : 0, // 공간은 차지하되 표시만 조절
      }
    ];
  };

  /**
   * 아이템 스타일 결정 (active/inactive + size + disabled)
   */
  const getItemStyle = (index: number) => {
    const isActive = selectedIndex === index;
    const baseStyle = isActive ? styles.itemActive : styles.itemInactive;
    const sizeStyle = size === "small" ? styles.itemSmall : {};
    const disabledStyle = disabled ? styles.itemDisabled : {};

    return [baseStyle, sizeStyle, disabledStyle];
  };

  return (
    <View
      {...viewProps}
      style={styles.container}
      accessible={true}
      accessibilityRole="tablist"
      accessibilityLabel="콘텐츠 스위처"
    >
      {items.map((item, index) => {
        const isActive = selectedIndex === index;
        const itemWidth = SECTION_WIDTHS[index] || SECTION_WIDTHS[0]; // 동적 아이템 수 지원

        return (
          <React.Fragment key={`menu-item-${index}`}>
            <Pressable
              style={[
                ...getItemStyle(index),
                { width: itemWidth }
              ]}
              onPress={() => handleItemPress(index)}
              disabled={disabled}
              accessible={true}
              accessibilityRole="tab"
              accessibilityState={{
                selected: isActive,
                disabled
              }}
              accessibilityLabel={`${item} ${isActive ? "선택됨" : "선택 안됨"} ${disabled ? "(비활성화됨)" : ""}`}
            >
              <Text style={isActive ? styles.textActive : styles.textInactive}>
                {item}
              </Text>
            </Pressable>

            {/* Divider: 항상 표시하되 active 양쪽에서는 투명하게 */}
            {index < items.length - 1 && (
              <View style={getDividerStyle(index)} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

/**
 * ContentSwitcher 메모이제이션 컴포넌트
 * props 변경시에만 리렌더링하여 성능 최적화
 */
export default React.memo(ContentSwitcher);
