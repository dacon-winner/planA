/**
 * KakaoMap Styles
 * 버전: 2.1.0
 * 최종 수정: 2025-12-01
 * 규칙 준수: 03-ui.mdc
 * 
 * 스타일 구성:
 * - kakao-map-wrapper: 전체 컨테이너
 * - kakao-map-webview: WebView 영역
 * - kakao-map-loading: 로딩 오버레이
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  'kakao-map-wrapper': {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  'kakao-map-webview': {
    flex: 1,
  },
  
  'kakao-map-loading': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

