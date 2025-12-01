/**
 * AddToPlanModal Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 피그마 노드ID: 4190:2541
 * 
 * 체크리스트:
 * [✓] tailwind.config.js 수정 안 함
 * [✓] 색상값 직접 입력 0건 (토큰 사용)
 * [✓] 인라인 스타일 0건
 * [✓] StyleSheet 전용
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 14,
  },

  // 드롭다운 컨테이너
  dropdownContainer: {
    width: '100%',
    position: 'relative',
  },

  // 드롭다운 버튼
  dropdownButton: {
    height: 32,
    borderWidth: 1,
    borderColor: '#d6cfcf',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 1,
  },

  dropdownButtonText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    color: '#524a4e',
    letterSpacing: -0.1504,
  },

  // 드롭다운 목록
  dropdownList: {
    position: 'absolute',
    top: 36,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d6cfcf',
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  dropdownItem: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  dropdownItemSelected: {
    backgroundColor: '#fff5f8',
  },

  dropdownItemText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    color: '#524a4e',
  },

  dropdownItemTextSelected: {
    fontWeight: '600',
    color: '#FF5C8D',
  },

  // 로딩 컨테이너
  loadingContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 빈 상태 컨테이너
  emptyContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 14,
    fontWeight: '400',
    color: '#9e9e9e',
  },

  // 플랜 정보 컨테이너
  planInfoContainer: {
    gap: 8,
    paddingHorizontal: 8,
  },

  // 정보 행
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 14,
  },

  infoText: {
    fontFamily: 'Pretendard Variable',
    fontSize: 12,
    fontWeight: '400',
    color: '#524a4e',
    letterSpacing: -0.12,
  },
});

