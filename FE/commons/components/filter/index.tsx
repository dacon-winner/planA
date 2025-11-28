import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export type FilterVariant = 'active' | 'inActive';

export interface FilterItem {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface FilterProps {
  /** 필터 아이템들의 초기 상태 */
  initialItems?: FilterItem[];
  /** 필터 선택 상태가 변경될 때 호출되는 콜백 */
  onSelectionChange?: (selectedItems: FilterItem[]) => void;
  /** 컴포넌트의 variant 상태 */
  variant?: FilterVariant;
}

const FILTER_ITEMS = ['전체', '스튜디오', '드레스', '메이크업', '웨딩홀'];

export const Filter: React.FC<FilterProps> = ({
  initialItems,
  onSelectionChange,
  variant = 'inActive',
}) => {
  // 초기 상태 설정
  const [filterItems, setFilterItems] = useState<FilterItem[]>(() => {
    if (initialItems) {
      return initialItems;
    }
    return FILTER_ITEMS.map((item, index) => ({
      id: `filter-${index}`,
      label: item,
      isSelected: false,
    }));
  });

  const handleFilterPress = useCallback((pressedIndex: number) => {
    setFilterItems(prevItems => {
      const newItems = [...prevItems];
      const pressedItem = newItems[pressedIndex];

      if (pressedIndex === 0) {
        // "전체" 버튼 클릭
        const isCurrentlySelected = pressedItem.isSelected;
        const newSelectedState = !isCurrentlySelected;

        // 모든 아이템을 새로운 상태로 설정
        newItems.forEach(item => {
          item.isSelected = newSelectedState;
        });
      } else {
        // 개별 아이템 클릭
        pressedItem.isSelected = !pressedItem.isSelected;

        // 개별 아이템들의 상태를 확인하여 "전체" 버튼 상태 결정
        const individualItems = newItems.slice(1); // "전체"를 제외한 나머지
        const allIndividualSelected = individualItems.every(item => item.isSelected);
        const anyIndividualSelected = individualItems.some(item => item.isSelected);

        // "전체" 버튼 상태 설정
        newItems[0].isSelected = allIndividualSelected;
      }

      // 콜백 호출
      onSelectionChange?.(newItems);

      return newItems;
    });
  }, [onSelectionChange]);

  return (
    <View style={styles.container}>
      {filterItems.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.filterButton,
            item.isSelected ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleFilterPress(index)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              item.isSelected ? styles.activeText : styles.inactiveText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Filter;
