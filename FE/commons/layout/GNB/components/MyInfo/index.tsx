/**
 * MyInfo Component
 * 버전: 1.0.0
 * 생성 시각: 2025-11-14
 * 규칙 준수: 03-ui.mdc
 * - [x] tailwind.config.js 수정 안 함
 * - [x] 색상값 직접 입력 0건
 * - [x] 인라인 스타일 0건
 * - [x] NativeWind 토큰 참조만 사용
 * - [x] 시맨틱 구조 유지
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ToastLib from 'react-native-toast-message';
import { styles } from './styles';
import { MY_INFO_CONTENT } from '@/commons/enums/gnb';
import { Badge, BadgePolicy } from '@/commons/components/badge';
import { toastConfig, Toast } from '@/commons/components/toast-message';
import { Dropdown } from '@/commons/components/dropdown';
import { useModal } from '@/commons/providers/modal/modal.provider';
import {
  PlanAddModal,
  ErrorModal,
  NewPlanModal,
  EditModal
} from '@/commons/components/modal';

export default function MyInfo() {
  // Dropdown 컴포넌트 예시를 위한 상태
  const [selectedOption, setSelectedOption] = useState('');

  // Modal 관련 상태
  const [planName, setPlanName] = useState('');
  const [selectedPlanType, setSelectedPlanType] = useState('');

  const { openModal } = useModal();

  const dropdownOptions = [
    { value: 'option1', label: '플랜 A' },
    { value: 'option2', label: '플랜 B' },
    { value: 'option3', label: '플랜 C' },
    { value: 'option4', label: '커스텀 플랜' },
  ];

  return (
    <View style={styles['myinfo-container']}>
      <View style={styles['myinfo-header']}>
        <Text style={styles['myinfo-header-title']}>{MY_INFO_CONTENT.HEADER_TITLE}</Text>
      </View>
      <ScrollView style={styles['myinfo-content']}>
        <View style={styles['myinfo-section']}>
          <Text style={styles['myinfo-section-title']}>{MY_INFO_CONTENT.SECTION_TITLE}</Text>
          <Text style={styles['myinfo-placeholder']}>{MY_INFO_CONTENT.PLACEHOLDER}</Text>
        </View>

        {/* Badge 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>Badge 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <Badge variant="summary" />
              <Text style={styles['badge-demo-label']}>요약</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <Badge variant="ai" />
              <Text style={styles['badge-demo-label']}>AI</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <Badge variant="plan" />
              <Text style={styles['badge-demo-label']}>대표 플랜</Text>
            </View>
          </View>
        </View>

        {/* BadgePolicy 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>BadgePolicy 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="loan" />
              <Text style={styles['badge-demo-label']}>대출</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="always" />
              <Text style={styles['badge-demo-label']}>상시</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="period" />
              <Text style={styles['badge-demo-label']}>기간제</Text>
            </View>
            <View style={styles['badge-demo-item']}>
              <BadgePolicy variant="subsidy" />
              <Text style={styles['badge-demo-label']}>보조금</Text>
            </View>
          </View>
        </View>

        {/* Dropdown 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>Dropdown 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['dropdown-demo-item']}>
              <Text style={styles['dropdown-demo-label']}>드롭다운</Text>
              <Dropdown
                value={selectedOption}
                options={dropdownOptions}
                onChange={setSelectedOption}
                placeholder="플랜을 선택하세요"
              />
            </View>
          </View>

          {/* 선택된 값 표시 */}
          <View style={styles['dropdown-result-section']}>
            <Text style={styles['dropdown-result-text']}>
              선택된 값: {selectedOption || '없음'}
            </Text>
          </View>
        </View>

        {/* ToastMessage 컴포넌트 예시 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>ToastMessage 컴포넌트 예시</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  Toast.success('저장이 완료되었습니다.');
                }}
              >
                <Text style={styles['toast-demo-button-text']}>성공 토스트</Text>
              </TouchableOpacity>
            </View>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  Toast.error('이미 존재하는 플랜 이름입니다.');
                }}
              >
                <Text style={styles['toast-demo-button-text']}>오류 토스트</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Modal 컴포넌트 예시 - 피그마 노드ID별 */}
        <View style={styles['badge-demo-section']}>
          <Text style={styles['section-title']}>Modal 컴포넌트 예시 (피그마 노드ID별)</Text>
          <View style={styles['badge-demo-row']}>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  openModal(
                    <PlanAddModal
                      serviceName="엘레강스 포토"
                      planOptions={[
                        { value: 'planA', label: '플랜 A' },
                        { value: 'planB', label: '플랜 B' },
                        { value: 'planC', label: '플랜 C' },
                      ]}
                      selectedPlan={selectedOption}
                      onPlanChange={setSelectedOption}
                      onConfirm={() => {
                        Toast.success('플랜에 추가되었습니다!');
                      }}
                      onCancel={() => {}}
                      scheduleInfo={{
                        date: '2026년 3월 28일 토요일',
                        location: '서울특별시 강남구',
                        budget: '5,000만원',
                      }}
                    />
                  );
                }}
              >
                <Text style={styles['toast-demo-button-text']}>4188:8189</Text>
                <Text style={styles['modal-node-label']}>플랜 추가</Text>
              </TouchableOpacity>
            </View>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  openModal(
                    <ErrorModal
                      message="플랜 A에 스튜디오가 존재합니다. 에이비 스튜디오로 변경하시겠습니까?"
                      onConfirm={() => {
                        Toast.success('스튜디오가 변경되었습니다.');
                      }}
                      onCancel={() => {}}
                    />
                  );
                }}
              >
                <Text style={styles['toast-demo-button-text']}>4188:8190</Text>
                <Text style={styles['modal-node-label']}>에러 모달</Text>
              </TouchableOpacity>
            </View>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  openModal(
                    <NewPlanModal
                      initialPlanName={planName}
                      onManualAdd={() => {
                        Toast.success('직접 업체 추가 모드로 이동합니다.');
                        setPlanName('');
                        setSelectedPlanType('');
                      }}
                      onAIGenerate={(name) => {
                        Toast.success(`플랜 "${name}"을 AI로 생성합니다!`);
                        setPlanName('');
                        setSelectedPlanType('');
                      }}
                    />
                  );
                }}
              >
                <Text style={styles['toast-demo-button-text']}>4188:8191</Text>
                <Text style={styles['modal-node-label']}>새 플랜</Text>
              </TouchableOpacity>
            </View>
            <View style={styles['badge-demo-item']}>
              <TouchableOpacity
                style={styles['toast-demo-button']}
                onPress={() => {
                  openModal(
                    <EditModal
                      onKeep={() => {
                        Toast.success('정보가 유지되었습니다.');
                      }}
                      onEdit={() => {
                        Toast.success('정보가 수정되었습니다.');
                      }}
                    />
                  );
                }}
              >
                <Text style={styles['toast-demo-button-text']}>4188:8192</Text>
                <Text style={styles['modal-node-label']}>정보 수정</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <ToastLib config={toastConfig} position="bottom" />
      <StatusBar style="auto" />
    </View>
  );
}




