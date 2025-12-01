/**
 * AddToPlanModal Component
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4190:2541
 * 
 * 플랜에 업체 추가하기 모달
 * 
 * @description
 * - 플랜 목록 조회 및 선택
 * - 선택된 플랜 정보 표시 (날짜, 위치, 예산)
 * - 확인/취소 버튼
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar, MapPin, Wallet, ChevronDown } from 'lucide-react-native';
import { Modal } from '../Modal';
import { usePlans } from '@/commons/hooks';
import { styles } from './styles';

export interface AddToPlanModalProps {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 추가할 업체명 */
  vendorName: string;
  /** 확인 버튼 핸들러 */
  onConfirm: (planId: string) => void;
  /** 취소 버튼 핸들러 */
  onCancel: () => void;
}

/**
 * 날짜 포맷팅 함수
 * @param dateString ISO 날짜 문자열
 * @returns 포맷된 날짜 (예: "2026년 3월 28일 토요일")
 */
const formatDate = (dateString: string | null): string => {
  if (!dateString) return '날짜 미정';
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekday = weekdays[date.getDay()];
  
  return `${year}년 ${month}월 ${day}일 ${weekday}`;
};

/**
 * 예산 포맷팅 함수
 * @param budget 예산 (숫자)
 * @returns 포맷된 예산 (예: "5,000만원")
 */
const formatBudget = (budget: number | null): string => {
  if (!budget) return '예산 미정';
  
  const manwon = Math.floor(budget / 10000);
  return `${manwon.toLocaleString()}만원`;
};

/**
 * AddToPlanModal 컴포넌트
 */
export const AddToPlanModal: React.FC<AddToPlanModalProps> = ({
  visible,
  vendorName,
  onConfirm,
  onCancel,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 플랜 목록 조회
  const { data: plansData, isLoading } = usePlans();

  // 선택된 플랜 정보
  const selectedPlan = plansData?.items.find(
    (item) => item.plan?.id === selectedPlanId
  );

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    if (selectedPlanId) {
      onConfirm(selectedPlanId);
      setSelectedPlanId(null);
      setIsDropdownOpen(false);
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    onCancel();
    setSelectedPlanId(null);
    setIsDropdownOpen(false);
  };

  // 플랜 선택 핸들러
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setIsDropdownOpen(false);
  };

  if (!visible) return null;

  return (
    <Modal
      title="내 플랜에 추가하기"
      description={`${vendorName}을(를)\n저장할 플랜을 선택해주세요`}
      buttons={{
        left: {
          label: '취소',
          onPress: handleCancel,
        },
        right: {
          label: '확인',
          onPress: handleConfirm,
          disabled: !selectedPlanId || isLoading,
        },
      }}
    >
      <View style={styles.container}>
        {/* 플랜 선택 드롭다운 */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isLoading}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedPlan?.plan?.title || '플랜 선택'}
            </Text>
            <ChevronDown size={16} color="#524a4e" />
          </TouchableOpacity>

          {/* 드롭다운 목록 */}
          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FF5C8D" />
                </View>
              ) : plansData?.items && plansData.items.length > 0 ? (
                plansData.items.map((item) => {
                  if (!item.plan) return null;
                  return (
                    <TouchableOpacity
                      key={item.plan.id}
                      style={[
                        styles.dropdownItem,
                        selectedPlanId === item.plan.id && styles.dropdownItemSelected,
                      ]}
                      onPress={() => handleSelectPlan(item.plan!.id)}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedPlanId === item.plan.id && styles.dropdownItemTextSelected,
                        ]}
                      >
                        {item.plan.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>플랜이 없습니다</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* 선택된 플랜 정보 */}
        {selectedPlan && (
          <View style={styles.planInfoContainer}>
            {/* 날짜 */}
            <View style={styles.infoRow}>
              <Calendar size={14} color="#524a4e" />
              <Text style={styles.infoText}>
                {formatDate(selectedPlan.users_info.wedding_date)}
              </Text>
            </View>

            {/* 위치 */}
            <View style={styles.infoRow}>
              <MapPin size={14} color="#524a4e" />
              <Text style={styles.infoText}>
                {selectedPlan.users_info.preferred_region || '지역 미정'}
              </Text>
            </View>

            {/* 예산 */}
            <View style={styles.infoRow}>
              <Wallet size={14} color="#524a4e" />
              <Text style={styles.infoText}>
                {formatBudget(selectedPlan.users_info.budget_limit)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

