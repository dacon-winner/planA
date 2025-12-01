# @kakao-map

카카오맵 WebView 기반 지도 컴포넌트 라이브러리

## 버전 정보

### 호환성
- **React Native**: 0.81.5 ✅
- **Expo**: ~54.0.23 ✅
- **React**: 19.1.0 ✅
- **TypeScript**: ~5.9.2 ✅

### 필수 의존성

#### react-native-webview (필수 설치 필요)
```bash
# Expo 환경에서 설치
npx expo install react-native-webview
```

**권장 버전**: `^13.12.4` (Expo 54 호환)
- Expo SDK 54와 완벽히 호환
- React Native 0.81.5 지원
- 최신 보안 업데이트 포함

## 설치 방법

### 1. react-native-webview 설치
```bash
cd /Users/kimdongeun/planA/FE
npx expo install react-native-webview
```

### 2. 카카오맵 API Key 발급
1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 애플리케이션 추가
3. JavaScript 키 발급
4. 플랫폼 설정 (iOS, Android)

### 3. 환경 변수 설정
`.env` 파일 생성 (프로젝트 루트)
```env
EXPO_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
```

## 사용 가능한 컴포넌트

### KakaoMapView
기본 지도 컴포넌트

```typescript
import { KakaoMapView } from '@/commons/components/@kakao-map';

<KakaoMapView
  latitude={37.5665}
  longitude={126.9780}
  level={3}
  style={{ flex: 1 }}
/>
```

### KakaoMapMarker
마커 표시 컴포넌트

```typescript
<KakaoMapView
  latitude={37.5665}
  longitude={126.9780}
  markers={[
    { 
      lat: 37.5665, 
      lng: 126.9780, 
      title: '서울시청',
      content: '서울특별시청 위치'
    }
  ]}
/>
```

## 주요 기능

- ✅ 지도 표시 (Pan, Zoom)
- ✅ 마커 추가/제거
- ✅ 위치 검색
- ✅ 현재 위치 표시
- ✅ 지도 타입 변경 (일반/위성/하이브리드)
- ✅ 터치 이벤트 처리
- ✅ TypeScript 지원

## 기술적 접근

### 왜 WebView를 사용하는가?

1. **공식 SDK 부재**: 카카오에서 React Native 공식 SDK를 제공하지 않음
2. **Expo 호환성**: Expo 관리형 워크플로우에서 네이티브 모듈 사용 제한
3. **빠른 업데이트**: 카카오맵 웹 API의 최신 기능을 즉시 사용 가능
4. **유지보수**: 네이티브 브릿지 없이 웹 표준만으로 구현 가능

### 성능 고려사항

- 웹뷰는 네이티브보다 약간 느릴 수 있음
- 복잡한 상호작용은 postMessage를 통해 처리
- 큰 데이터셋은 클러스터링 권장

## 폴더 구조

```
@kakao-map/
├── README.md                    # 이 파일
├── index.ts                     # Export 모듈
├── types/
│   ├── index.ts                # TypeScript 타입 정의
│   ├── map.types.ts            # 지도 관련 타입
│   └── marker.types.ts         # 마커 관련 타입
├── components/
│   ├── KakaoMapView/
│   │   ├── index.tsx           # 메인 지도 컴포넌트
│   │   ├── styles.ts           # 스타일 정의
│   │   └── KakaoMapView.types.ts
│   └── KakaoMapMarker/
│       ├── index.tsx
│       └── styles.ts
├── hooks/
│   ├── useKakaoMap.ts          # 지도 상태 관리
│   └── useMapLocation.ts       # 위치 관련 훅
├── utils/
│   ├── mapHelpers.ts           # 지도 헬퍼 함수
│   └── coordinateUtils.ts      # 좌표 변환 유틸
├── templates/
│   └── map-webview.html        # WebView에서 로드할 HTML
└── constants/
    └── mapConstants.ts         # 지도 관련 상수
```

## 버전 히스토리

### v1.0.0 (2025-12-01)
- 초기 버전 생성
- 기본 지도 표시 기능
- 마커 추가/제거 기능
- TypeScript 지원

## 라이선스

Private - Plan A 프로젝트 내부용

## 참고 자료

- [Kakao Map API 문서](https://apis.map.kakao.com/web/documentation/)
- [react-native-webview 문서](https://github.com/react-native-webview/react-native-webview)
- [Expo WebView 가이드](https://docs.expo.dev/versions/latest/sdk/webview/)

## 작성자

김동은 (rlaehddhs12@gmail.com)
작성일: 2025.12.01

