/**
 * KakaoMap Styles
 * 버전: 1.0.0
 * 생성 시각: 2025-12-01
 * 규칙 준수: 03-ui.mdc
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  'kakao-map-wrapper': {
    flex: 1,
    position: 'relative',
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
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
});

