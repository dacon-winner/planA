# 기능 명세서: 업체 검색 및 지도 표시

## 기본 정보

| 항목 | 내용 |
|------|------|
| **기능명** | Vendor Search & Map View |
| **담당 영역** | Frontend |
| **우선순위** | 🔴 높음 |
| **작성일** | 2025-12-01 |
| **예상 개발 기간** | 3일 |
| **상태** | ✅ 완료 |

---

## 기능 개요

### 목적
사용자가 웨딩 관련 업체(웨딩홀, 스튜디오, 드레스, 메이크업)를 지도에서 검색하고, 상세 정보를 확인할 수 있는 기능을 제공합니다.

### 배경
- **현재 문제점**: 업체 정보를 리스트로만 제공하여 위치 파악이 어려움
- **사용자 요구사항**: 지도에서 직관적으로 업체 위치 및 가격 확인 필요
- **비즈니스 목표**: 사용자가 쉽게 업체를 찾고 플랜에 추가할 수 있도록 지원

### 범위
**포함되는 것:**
- 카카오맵 연동 및 표시
- 카테고리별 업체 필터링
- 지도 영역 기반 업체 검색
- 마커 클릭 시 업체 상세 정보 표시 (Bottom Sheet)
- 비슷한 업체 추천
- 초기 로딩 스피너

**포함되지 않는 것:**
- 업체 예약 기능
- 리뷰 작성/조회
- 업체 즐겨찾기

---

## 사용자 스토리

### As a 예비 부부
- I want to 지도에서 웨딩 업체를 검색하고
- I want to 각 업체의 위치, 가격, 정보를 확인하며
- So that 우리 결혼식 장소에 가까운 적절한 업체를 선택할 수 있다

### 수용 기준 (Acceptance Criteria)
- [x] 지도가 로드되고 현재 위치 주변 업체가 표시된다
- [x] 카테고리 버튼으로 업체 타입을 필터링할 수 있다
- [x] 지도를 이동하면 해당 영역의 업체가 자동으로 로드된다
- [x] 마커를 클릭하면 업체 상세 정보가 하단에 표시된다
- [x] 업체 상세 정보에서 비슷한 업체 3개를 추천받는다
- [x] 초기 로딩 시 스피너가 표시된다

---

## 화면 설계

### 화면 흐름도
```
[검색 탭 진입]
    ↓
[로딩 스피너] → [지도 + 마커 표시]
    ↓
[마커 클릭]
    ↓
[업체 상세 Bottom Sheet]
    ↓
[비슷한 업체 추천 확인]
```

### 화면 상세

#### 검색 화면 (Search Screen)
**Figma 링크**: [https://www.figma.com/design/WNF12P5o1xBoahohIGQcdw/Untitled?node-id=0-154](https://www.figma.com/design/WNF12P5o1xBoahohIGQcdw/Untitled?node-id=0-154)

**주요 UI 요소:**
1. **상단 (Absolute Position)**
   - 검색바: "업체명 또는 서비스로 검색"
   - 카테고리 필터: 전체, 웨딩홀, 스튜디오, 드레스, 메이크업

2. **지도 영역 (배경)**
   - 카카오맵 표시
   - 업체 위치 마커
   - 가격 정보 표시 (선택된 마커)

3. **하단 우측**
   - 현재 위치 버튼 (Crosshair 아이콘)

4. **Bottom Sheet (마커 클릭 시)**
   - 헤더: 위치 정보 + 저장하기 버튼
   - 카테고리 배지 + 설명
   - 업체명
   - 이미지 갤러리 (가로 스크롤)
   - 상세 정보: 주소, 전화번호, 운영시간, 서비스
   - 가격표
   - CTA 버튼: "플랜에 장착작으로 변경합니다"
   - 비슷한 업체 추천 (3개, 가로 스크롤)

**인터랙션:**
- 지도 드래그/줌 → 영역 변경 → 1초 디바운싱 후 API 호출
- 카테고리 버튼 클릭 → 즉시 필터링 및 API 재호출
- 마커 클릭 → Bottom Sheet 60% 열림
- Bottom Sheet 위로 드래그 → 90% 확장 (비슷한 업체 표시)
- Bottom Sheet 아래로 드래그 → 닫기

---

## 데이터 구조

### 모델 정의

```typescript
interface Vendor {
  id: string;
  name: string;
  category: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP' | 'ALL';
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  images?: VendorImage[];
  service_items?: ServiceItem[];
  operating_hours?: OperatingHour[];
}

interface VendorImage {
  url: string;
  order: number;
}

interface ServiceItem {
  name: string;
  price: number;
}

interface OperatingHour {
  open_time: string;  // "09:00"
  close_time: string; // "20:00"
}
```

### 상태 관리

```typescript
interface SearchState {
  // 카테고리 필터
  selectedCategory: Category;
  
  // 검색 쿼리
  searchQuery: string;
  
  // 지도 영역
  mapBounds: {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  };
  
  // 디바운싱된 지도 영역
  debouncedMapBounds: MapBounds;
  
  // 지도 준비 상태
  isMapReady: boolean;
  
  // 초기 로딩 완료
  initialLoadComplete: boolean;
  hasInitialData: boolean;
  
  // 선택된 업체
  selectedVendor: Vendor | null;
}
```

---

## API 명세

### Endpoint: GET /api/vendors

**Request:**
```typescript
{
  query: {
    category?: 'VENUE' | 'STUDIO' | 'DRESS' | 'MAKEUP' | 'ALL';
    swLat: number;   // 남서쪽 위도
    swLng: number;   // 남서쪽 경도
    neLat: number;   // 북동쪽 위도
    neLng: number;   // 북동쪽 경도
  }
}
```

**Response:**
```typescript
{
  status: 200,
  data: {
    total: number;
    vendors: Vendor[];
  }
}
```

**Error Responses:**
- 400: Bad Request (잘못된 좌표값)
- 500: Internal Server Error

---

## 비즈니스 로직

### 주요 로직 플로우

1. **초기화**
   ```
   사용자 진입 
   → 로딩 스피너 표시
   → 지도 로드 (WebView)
   → 카카오맵 SDK 초기화
   → 지도 준비 완료
   → API 호출 (초기 영역)
   → 마커 생성
   → 500ms 대기
   → 로딩 스피너 숨김
   ```

2. **지도 이동**
   ```
   사용자가 지도 드래그/줌
   → bounds_changed 이벤트
   → mapBounds 상태 업데이트
   → 디바운싱 (1초)
   → debouncedMapBounds 업데이트
   → API 호출
   → 마커 업데이트
   ```

3. **카테고리 필터링**
   ```
   카테고리 버튼 클릭
   → selectedCategory 업데이트
   → 즉시 API 호출 (디바운싱 무시)
   → 마커 업데이트
   ```

4. **마커 클릭**
   ```
   사용자가 마커 클릭
   → markerId 수신
   → vendors 배열에서 해당 업체 찾기
   → selectedVendor 설정
   → Bottom Sheet 60% 열기
   → 비슷한 업체 계산 (같은 카테고리, 거리순)
   ```

5. **비슷한 업체 추천**
   ```
   선택된 업체 기준
   → 같은 카테고리 필터링
   → 거리 계산 (유클리드 거리)
   → 거리순 정렬
   → 상위 3개 선택
   ```

### 비즈니스 규칙

1. **지도 영역 API 호출**
   - 조건: 지도 준비 완료 AND 1초간 지도 이동 없음
   - 동작: 현재 보이는 영역의 업체만 조회
   - 예외: 초기 로딩 중에는 호출하지 않음

2. **마커 표시**
   - 조건: API 응답 수신 AND vendors 데이터 존재
   - 동작: 모든 마커 제거 후 새로 생성
   - 예외: 좌표값이 없는 업체는 스킵

3. **비슷한 업체 추천**
   - 조건: 선택된 업체와 동일 카테고리
   - 동작: 거리가 가까운 순서로 3개 표시
   - 예외: 3개 미만인 경우 있는 만큼만 표시

---

## 기술 스택

### Frontend
- React Native 0.81.5
- TypeScript ~5.9.2
- 상태 관리: React Hooks (useState, useEffect, useMemo)
- UI 컴포넌트:
  - KakaoMap (커스텀)
  - BottomSheet (@gorhom/bottom-sheet)
  - lucide-react-native (아이콘)
- API 통신: @tanstack/react-query + axios

---

## 구현 완료 내역

### Phase 1: 기반 작업
- [x] KakaoMap 컴포넌트 마커 기능 추가
- [x] useVendors 훅 구현
- [x] API 연동

### Phase 2: 핵심 기능
- [x] 지도 UI 구현
- [x] 카테고리 필터 구현
- [x] 마커 클릭 이벤트 처리
- [x] Bottom Sheet 업체 상세 정보

### Phase 3: 개선
- [x] 디바운싱 적용 (지도 이동)
- [x] 초기 로딩 스피너
- [x] 비슷한 업체 추천
- [x] 에러 처리

---

## 성능 최적화

### 구현된 최적화
1. **디바운싱**: 지도 이동 시 1초 대기 후 API 호출
2. **useMemo**: 마커 데이터 변환, 비슷한 업체 계산
3. **useCallback**: 이벤트 핸들러 메모이제이션
4. **초기 로딩 제어**: 모든 데이터 준비 후 화면 표시

### 측정 지표
- 초기 로딩 시간: ~2초 (지도 + 데이터)
- API 응답 시간: ~300ms
- 마커 업데이트: ~100ms (13개 기준)

---

## 접근성

### 구현 사항
- [x] 버튼에 적절한 아이콘 사용
- [x] 텍스트 대비 충분 (WCAG AA 기준)
- [ ] 스크린 리더 라벨 (추후 개선 필요)

---

## 에러 처리

### 에러 타입

#### 1. 네트워크 에러
- **발생 조건**: API 호출 실패
- **사용자 메시지**: 콘솔 로그
- **복구 방법**: 지도 이동 시 자동 재시도

#### 2. 지도 로드 실패
- **발생 조건**: 카카오맵 SDK 로드 오류
- **사용자 메시지**: 로딩 상태 유지
- **복구 방법**: 앱 재시작 필요

#### 3. 마커 클릭 오류
- **발생 조건**: 해당 ID의 업체 없음
- **사용자 메시지**: 없음 (무시)
- **복구 방법**: 다른 마커 클릭

---

## 파일 구조

```
FE/
├── commons/
│   ├── components/
│   │   └── kakao-map/
│   │       ├── index.tsx          # KakaoMap 컴포넌트
│   │       └── styles.ts          # 스타일
│   │
│   ├── hooks/
│   │   └── useVendors.ts          # 업체 조회 훅
│   │
│   └── layout/
│       └── GNB/
│           └── components/
│               └── Search/
│                   ├── index.tsx   # Search 화면
│                   └── styles.ts   # 스타일
│
└── doc/
    └── v.1.0.0/
        ├── components/
        │   └── kakao-map.md       # KakaoMap 문서
        └── features/
            └── vendor-search-map.md # 본 문서
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-12-01 | 초기 명세 및 구현 완료 | - |

---

## 참고 자료

- [Figma 디자인](https://www.figma.com/design/WNF12P5o1xBoahohIGQcdw/Untitled?node-id=0-154)
- [카카오맵 API 문서](https://apis.map.kakao.com/web/)
- [Bottom Sheet 라이브러리](https://gorhom.github.io/react-native-bottom-sheet/)

