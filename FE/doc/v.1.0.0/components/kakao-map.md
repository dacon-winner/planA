# 컴포넌트 명세서: KakaoMap

## 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | KakaoMap |
| **위치** | `commons/components/kakao-map/` |
| **작성일** | 2025-12-01 |
| **버전** | 2.1.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
카카오맵 API를 React Native WebView로 래핑하여 지도 표시 및 마커 관리 기능을 제공하는 컴포넌트입니다.

### 사용 예시
```typescript
import KakaoMap, { MapMarker } from '@/commons/components/kakao-map';

function MapScreen() {
  const [markers, setMarkers] = useState<MapMarker[]>([
    {
      id: '1',
      latitude: 37.5665,
      longitude: 126.9780,
      title: '서울시청',
      content: '서울특별시 중구 태평로1가',
      category: 'VENUE',
      price: 1000000,
    }
  ]);

  return (
    <KakaoMap
      latitude={37.5665}
      longitude={126.9780}
      level={3}
      markers={markers}
      onMapReady={() => console.log('지도 준비 완료')}
      onRegionChange={(bounds) => console.log('지역 변경:', bounds)}
      onMarkerClick={(id) => console.log('마커 클릭:', id)}
    />
  );
}
```

---

## Props 명세

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `latitude` | `number` | `37.5665` | 지도 중심 위도 | `37.5240` |
| `longitude` | `number` | `126.9780` | 지도 중심 경도 | `127.0430` |
| `level` | `number` | `3` | 지도 확대 레벨 (1-14) | `5` |
| `markers` | `MapMarker[]` | `[]` | 표시할 마커 배열 | 아래 참조 |
| `onMapReady` | `() => void` | `undefined` | 지도 로드 완료 콜백 | `() => {}` |
| `onRegionChange` | `(bounds: MapBounds) => void` | `undefined` | 지도 영역 변경 콜백 | 아래 참조 |
| `onMarkerClick` | `(markerId: string) => void` | `undefined` | 마커 클릭 콜백 | `(id) => {}` |

### Type Definitions

```typescript
interface MapMarker {
  id: string;                 // 마커 고유 ID
  latitude: number;           // 위도
  longitude: number;          // 경도
  title: string;              // 마커 제목
  content?: string;           // 마커 설명
  category?: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP'; // 카테고리
  price?: number;             // 가격 정보
  vendorName?: string;        // 업체명
}

interface MapBounds {
  swLat: number;  // 남서쪽 위도
  swLng: number;  // 남서쪽 경도
  neLat: number;  // 북동쪽 위도
  neLng: number;  // 북동쪽 경도
}

interface KakaoMapProps {
  latitude?: number;
  longitude?: number;
  level?: number;
  markers?: MapMarker[];
  onMapReady?: () => void;
  onRegionChange?: (bounds: MapBounds) => void;
  onMarkerClick?: (markerId: string) => void;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Layout
```typescript
styles['kakao-map-wrapper']   // 전체 컨테이너
styles['kakao-map-webview']   // WebView 영역
styles['kakao-map-loading']   // 로딩 오버레이
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  'kakao-map-wrapper': {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
```

---

## 상태 관리

### 내부 상태
```typescript
const [isLoading, setIsLoading] = useState(true);
```

### 상태 설명
- `isLoading`: 지도 로딩 상태 (로딩 스피너 표시 여부)

---

## 동작 명세

### 초기화 플로우

1. **WebView 생성**
   - HTML 문자열 생성 (카카오맵 SDK 포함)
   - WebView 렌더링 시작

2. **카카오맵 SDK 로드**
   - 동적으로 스크립트 태그 생성
   - SDK 로드 완료 후 지도 초기화

3. **지도 생성**
   - 설정된 위도/경도로 중심점 설정
   - 지도 레벨 설정
   - `MAP_READY` 메시지 전송

4. **마커 표시**
   - `markers` prop 변경 감지
   - WebView로 `UPDATE_MARKERS` 메시지 전송
   - 기존 마커 제거 후 새 마커 생성

### 사용자 인터랙션

1. **지도 이동/확대**
   - 트리거: 사용자가 지도를 드래그하거나 줌
   - 동작: `bounds_changed` 이벤트 발생
   - 결과: `onRegionChange` 콜백 호출

2. **마커 클릭**
   - 트리거: 사용자가 마커 클릭
   - 동작: 마커 ID를 포함한 메시지 전송
   - 결과: `onMarkerClick` 콜백 호출

### 생명주기

```typescript
// 마커 업데이트
useEffect(() => {
  if (webViewRef.current && markers.length > 0) {
    const message = JSON.stringify({ type: 'UPDATE_MARKERS', markers });
    webViewRef.current.postMessage(message);
  }
}, [markers]);
```

---

## WebView 통신

### React Native → WebView

| 메시지 타입 | 데이터 | 설명 |
|------------|--------|------|
| `UPDATE_MARKERS` | `{ markers: MapMarker[] }` | 마커 업데이트 요청 |

### WebView → React Native

| 메시지 타입 | 데이터 | 설명 |
|------------|--------|------|
| `MAP_READY` | `{}` | 지도 로드 완료 |
| `REGION_CHANGE` | `MapBounds` | 지도 영역 변경 |
| `MARKER_CLICK` | `{ id: string }` | 마커 클릭 |
| `LOG` | `string` | 디버그 로그 |
| `ERROR` | `string` | 에러 메시지 |

---

## 에러 처리

### 예상 에러 케이스

1. **SDK 로드 실패**
   - 발생 조건: 네트워크 오류, 잘못된 API 키
   - 처리 방법: `ERROR` 메시지 전송, 콘솔 로그
   - 사용자 피드백: 로딩 상태 유지

2. **마커 생성 실패**
   - 발생 조건: 잘못된 좌표값, 지도 미초기화
   - 처리 방법: try-catch로 예외 처리, 에러 로그
   - 사용자 피드백: 해당 마커만 스킵

---

## 성능 고려사항

### 최적화 포인트
- **마커 업데이트**: `useEffect`로 변경 감지, 불필요한 업데이트 방지
- **메시지 전송**: JSON 직렬화 최소화
- **WebView 재사용**: 마커 변경 시 WebView 재생성하지 않음

### 주의사항
- 마커가 많을 경우(100개 이상) 성능 저하 가능
- 지도 이동 시 `onRegionChange` 빈번히 호출됨 → 디바운싱 필요

---

## 의존성

### 필수 라이브러리
```json
{
  "react-native-webview": "13.15.0",
  "expo-constants": "~18.0.10"
}
```

### 내부 의존성
- `@/commons/config` (env 설정)

### 환경 변수
```typescript
env.kakaoMapApiKey  // 카카오맵 JavaScript API 키
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2.0.0 | 2025-12-01 | 기본 지도 표시 기능 | - |
| 2.1.0 | 2025-12-01 | 마커 표시 및 클릭 이벤트 추가 | - |

---

## 참고 자료
- [카카오맵 JavaScript API](https://apis.map.kakao.com/web/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Figma 디자인](https://www.figma.com/design/WNF12P5o1xBoahohIGQcdw/Untitled?node-id=0-154)

