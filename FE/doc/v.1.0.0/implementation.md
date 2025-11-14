# Plan A v1.0.0 개발 문서

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [현재 구현 상태](#현재-구현-상태)
3. [기술 스택](#기술-스택)
4. [아키텍처](#아키텍처)
5. [디자인 시스템](#디자인-시스템)
6. [컴포넌트 명세](#컴포넌트-명세)
7. [개발 규칙](#개발-규칙)
8. [향후 개발 계획](#향후-개발-계획)

---

## 프로젝트 개요

### 프로젝트명
Plan A - 웨딩 플래닝 모바일 애플리케이션

### 목적
예비 신랑·신부들에게 웨딩 준비의 모든 과정을 체계적으로 관리할 수 있는 올인원 플래닝 도구 제공

### 버전
1.0.0

### 개발 기간
2025.11.14 - 진행 중

---

## 현재 구현 상태

### ✅ 완료된 기능

#### 1. 프로젝트 초기 설정
- [x] Expo 프로젝트 생성
- [x] TypeScript 설정
- [x] Tailwind CSS (NativeWind v4) 통합
- [x] Expo Router 설정
- [x] 절대 경로 import 설정 (@/ alias)

#### 2. 디자인 시스템 구축
- [x] Tailwind 디자인 토큰 정의
  - Colors: Primary, Secondary, Tertiary 팔레트
  - Typography: Mobile/Desktop 폰트 크기 체계
  - Spacing: 4px 기반 간격 시스템
  - Border: 모서리 반경, 테두리 색상
- [x] Pretendard 폰트 시스템

#### 3. GNB (Global Navigation Bar) 구현
- [x] 탭 네비게이션 레이아웃
  - 홈 (Home)
  - 검색 (Search)
  - 일정 (Schedule)
  - 내정보 (MyInfo)
- [x] Figma 디자인 반영
  - 활성 탭: Primary 600 (#ff5c8d)
  - 비활성 탭: rgba(82, 74, 78, 0.5)
  - 탭 바 높이: 56px
- [x] 아이콘 시스템 (Ionicons)

#### 4. 페이지 구조
- [x] 홈 화면 기본 레이아웃
- [x] 검색 화면 기본 레이아웃
- [x] 일정 화면 기본 레이아웃
- [x] 내정보 화면 기본 레이아웃

#### 5. 개발 규칙 수립
- [x] 03-ui.mdc 규칙 문서화
  - Tailwind 토큰 사용 강제
  - 색상값 하드코딩 금지
  - StyleSheet 전용 스타일링
  - 인라인 스타일 금지
- [x] 상수 관리 체계 (commons/enums)
- [x] 파일 구조 규칙

### 🚧 진행 중

- [ ] 각 페이지의 상세 UI 구현
- [ ] 컴포넌트 라이브러리 구축

### 📝 대기 중

- [ ] 백엔드 API 연동
- [ ] 상태 관리 설정
- [ ] 인증/인가 시스템
- [ ] 데이터베이스 스키마

---

## 기술 스택

### Core
```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo": "~54.0.23",
  "typescript": "~5.9.2"
}
```

### Navigation & Routing
```json
{
  "expo-router": "~6.0.14",
  "@react-navigation/native": "^7.1.8",
  "@react-navigation/bottom-tabs": "^7.4.0"
}
```

### Styling
```json
{
  "nativewind": "^4.2.1",
  "tailwindcss": "^3.3.2"
}
```

### UI Components
```json
{
  "@expo/vector-icons": "^15.0.3"
}
```

---

## 아키텍처

### 디렉토리 구조

```
planA/
├── app/                          # Expo Router 라우팅
│   ├── (tabs)/                  # 탭 네비게이션 그룹
│   │   ├── _layout.tsx          # 탭 레이아웃 (TabLayout 컴포넌트 import)
│   │   ├── index.tsx            # 홈 탭
│   │   ├── search.tsx           # 검색 탭
│   │   ├── schedule.tsx         # 일정 탭
│   │   └── myinfo.tsx           # 내정보 탭
│   ├── _layout.tsx              # 루트 레이아웃
│   └── index.tsx                # 앱 진입점
│
├── commons/                      # 공통 모듈
│   ├── components/              # 재사용 컴포넌트
│   │   ├── button/
│   │   └── input/
│   ├── enums/                   # 상수 정의
│   │   ├── gnb.ts              # GNB 관련 상수
│   │   └── index.ts            # 상수 re-export
│   └── layout/                  # 레이아웃 컴포넌트
│       └── GNB/
│           ├── components/
│           │   ├── Home/
│           │   │   ├── index.tsx
│           │   │   └── styles.ts
│           │   ├── Search/
│           │   │   ├── index.tsx
│           │   │   └── styles.ts
│           │   ├── Schedule/
│           │   │   ├── index.tsx
│           │   │   └── styles.ts
│           │   ├── MyInfo/
│           │   │   ├── index.tsx
│           │   │   └── styles.ts
│           │   └── TabLayout/
│           │       ├── index.tsx
│           │       └── styles.ts
│           └── hooks/
│
├── assets/                       # 정적 자원
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
│
├── doc/                         # 프로젝트 문서
│   └── v.1.0.0/
│       └── implementation.md    # 본 문서
│
├── global.css                   # Tailwind 글로벌 스타일
├── tailwind.config.js          # Tailwind 설정 (디자인 토큰)
├── metro.config.js             # Metro 번들러 설정
├── babel.config.js             # Babel 설정
├── app.json                    # Expo 설정
├── tsconfig.json               # TypeScript 설정
├── package.json                # 의존성 관리
└── README.md                   # 프로젝트 README
```

### 설계 원칙

#### 1. 관심사의 분리 (Separation of Concerns)
- **라우팅**: `app/` 디렉토리 - Expo Router 파일 기반 라우팅
- **UI 컴포넌트**: `commons/` 디렉토리 - 재사용 가능한 컴포넌트
- **스타일**: `styles.ts` 파일 - 컴포넌트별 스타일 분리
- **상수**: `commons/enums/` - 텍스트, 설정값 중앙 관리

#### 2. 단일 진실 공급원 (Single Source of Truth)
- **디자인 토큰**: `tailwind.config.js`에서 모든 스타일 값 정의
- **상수**: `commons/enums/`에서 모든 텍스트 상수 관리
- **타입**: TypeScript를 통한 타입 안정성 보장

#### 3. 컴포넌트 원자성
- 각 컴포넌트는 독립적으로 동작
- 명확한 인터페이스 (props) 정의
- 재사용 가능한 구조

---

## 디자인 시스템

### Colors

#### Primary (핑크/레드)
```javascript
primary: {
  50: '#fff1f5',
  100: '#ffe4ec',
  200: '#ffcada',
  300: '#ff9cb7',
  400: '#ff5c8d',
  500: '#ff2d6f',
  600: '#ff0854',
  700: '#df003f',
  800: '#b80039',
  900: '#9a0034',
  950: '#5e0019',
}
```

#### Secondary (그레이)
```javascript
secondary: {
  50: '#f8f7f7',
  100: '#f0eeee',
  200: '#e4e0e0',
  300: '#d0caca',
  400: '#b6adad',
  500: '#9f9494',
  600: '#524a4e',
  700: '#746a6e',
  800: '#625a5d',
  900: '#534d4f',
  950: '#2d2829',
}
```

#### Tertiary (보라)
```javascript
tertiary: {
  50: '#faf7fd',
  100: '#f4edfa',
  200: '#eadcf6',
  300: '#dabfee',
  400: '#c396e3',
  500: '#aa6dd4',
  600: '#8f4dba',
  700: '#783c9b',
  800: '#65347f',
  900: '#542d69',
  950: '#361547',
}
```

### Typography

#### Mobile
```javascript
'mobile-xs': ['12px', { lineHeight: '16px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-s': ['13px', { lineHeight: '18px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-m': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-l': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-xl': ['18px', { lineHeight: '26px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-2xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '400' }],
'mobile-3xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '400' }],

// Bold variants
'mobile-xs-bold': ['12px', { lineHeight: '16px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-s-bold': ['13px', { lineHeight: '18px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-m-bold': ['14px', { lineHeight: '20px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-l-bold': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-xl-bold': ['18px', { lineHeight: '26px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-2xl-bold': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '600' }],
'mobile-3xl-bold': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
```

### Spacing (4px 기반)

```javascript
spacing: {
  'xxs': '4px',
  'xs': '8px',
  'sm': '12px',
  'md': '16px',
  'lg': '20px',
  'xl': '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
}
```

### Border Radius

```javascript
borderRadius: {
  'xs': '4px',
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '20px',
  '2xl': '24px',
  'full': '9999px',
}
```

---

## 컴포넌트 명세

### GNB (Global Navigation Bar)

#### TabLayout
**위치**: `commons/layout/GNB/components/TabLayout/`

**역할**: 하단 탭 네비게이션 레이아웃

**Props**: 없음 (Expo Router Tabs 사용)

**스타일 특징**:
- 활성 탭 색상: `colors.primary[600]`
- 비활성 탭 색상: `rgba(82, 74, 78, 0.5)`
- 높이: 56px
- 배경색: `colors.secondary[50]`

**파일**:
```typescript
// index.tsx
export default function TabLayout() {
  return (
    <Tabs screenOptions={tabLayoutStyles.screenOptions}>
      <Tabs.Screen name="index" options={{...}} />
      <Tabs.Screen name="search" options={{...}} />
      <Tabs.Screen name="schedule" options={{...}} />
      <Tabs.Screen name="myinfo" options={{...}} />
    </Tabs>
  );
}

// styles.ts
export const tabLayoutStyles = {
  screenOptions: {
    tabBarActiveTintColor: colors.primary[600],
    tabBarInactiveTintColor: 'rgba(82, 74, 78, 0.5)',
    // ... 기타 스타일
  },
};
```

#### Home
**위치**: `commons/layout/GNB/components/Home/`

**역할**: 홈 화면

**주요 요소**:
- 앱 타이틀: "Plan A"
- 서브 타이틀: "웨딩 플래닝의 모든 것"

**상수**: `HOME_CONTENT` (commons/enums/gnb.ts)

#### Search
**위치**: `commons/layout/GNB/components/Search/`

**역할**: 업체 검색 화면

**주요 요소**:
- 헤더: "검색"
- 섹션 타이틀: "업체 검색"
- 플레이스홀더: "원하는 업체를 검색해보세요"

**상수**: `SEARCH_CONTENT` (commons/enums/gnb.ts)

#### Schedule
**위치**: `commons/layout/GNB/components/Schedule/`

**역할**: 웨딩 일정 관리 화면

**주요 요소**:
- 헤더: "일정"
- 섹션 타이틀: "웨딩 일정"
- 플레이스홀더: "웨딩 일정이 여기에 표시됩니다"

**상수**: `SCHEDULE_CONTENT` (commons/enums/gnb.ts)

#### MyInfo
**위치**: `commons/layout/GNB/components/MyInfo/`

**역할**: 사용자 정보 화면

**주요 요소**:
- 헤더: "내정보"
- 섹션 타이틀: "내 정보"
- 플레이스홀더: "내 정보가 여기에 표시됩니다"

**상수**: `MY_INFO_CONTENT` (commons/enums/gnb.ts)

---

## 개발 규칙

### 03-ui.mdc 규칙

#### 1. Tailwind 토큰 사용 강제
✅ **올바른 예시**:
```typescript
const colors = tailwindConfig.theme.extend.colors;
backgroundColor: colors.primary[600]
```

❌ **잘못된 예시**:
```typescript
backgroundColor: '#ff5c8d'  // 하드코딩 금지
```

#### 2. StyleSheet 전용 스타일링
✅ **올바른 예시**:
```typescript
// styles.ts
export const styles = StyleSheet.create({
  'container': {
    flex: 1,
  },
});

// index.tsx
<View style={styles['container']} />
```

❌ **잘못된 예시**:
```typescript
<View style={{ flex: 1 }} />  // 인라인 스타일 금지
```

#### 3. 상수 관리
✅ **올바른 예시**:
```typescript
// commons/enums/gnb.ts
export const HOME_CONTENT = {
  TITLE: 'Plan A',
  SUBTITLE: '웨딩 플래닝의 모든 것',
} as const;

// 컴포넌트에서
import { HOME_CONTENT } from '@/commons/enums';
<Text>{HOME_CONTENT.TITLE}</Text>
```

❌ **잘못된 예시**:
```typescript
<Text>Plan A</Text>  // 하드코딩 금지
```

#### 4. 파일 구조
각 컴포넌트는 다음 구조를 따릅니다:

```
ComponentName/
├── index.tsx    # 컴포넌트 로직
└── styles.ts    # 스타일 정의
```

#### 5. Import 순서
```typescript
// 1. React 관련
import { View, Text } from 'react-native';

// 2. 써드파티 라이브러리
import { StatusBar } from 'expo-status-bar';

// 3. 로컬 imports
import { styles } from './styles';
import { CONSTANTS } from '@/commons/enums';
```

#### 6. 타이포그래피 사용법
```typescript
const fontSize = tailwindConfig.theme.extend.fontSize;

// fontSize 토큰에서 모든 속성 추출
'title': {
  fontSize: parseInt(fontSize['mobile-3xl-bold'][0]),
  lineHeight: parseInt(fontSize['mobile-3xl-bold'][1].lineHeight),
  letterSpacing: parseFloat(fontSize['mobile-3xl-bold'][1].letterSpacing) * parseInt(fontSize['mobile-3xl-bold'][0]),
  fontWeight: fontSize['mobile-3xl-bold'][1].fontWeight,
  fontFamily: 'Pretendard',
}
```

---

## 향후 개발 계획

### Phase 1: 기본 기능 구현 (진행 중) 담당자가 수정할것.
- [ ] 홈 화면 상세 UI
  - [ ] 웨딩 D-Day 카운터
  - [ ] 주요 할 일 목록 (Quick Actions)
  - [ ] 진행 상황 대시보드
- [ ] 검색 화면 상세 UI
  - [ ] 검색 바 구현
  - [ ] 카테고리 필터 (스튜디오, 드레스, 메이크업 등)
  - [ ] 업체 리스트 카드
  - [ ] 상세 페이지 연결
- [ ] 일정 화면 상세 UI
  - [ ] 캘린더 뷰
  - [ ] 일정 추가/수정/삭제
  - [ ] 일정 알림 설정
- [ ] 내정보 화면 상세 UI
  - [ ] 프로필 정보
  - [ ] 예식 정보
  - [ ] 설정 메뉴

### Phase 2: 공통 컴포넌트 라이브러리 화의후 담당자가 설치할것.
- [ ] Button 컴포넌트
  - [ ] Primary, Secondary, Tertiary variants
  - [ ] Size variants (sm, md, lg)
  - [ ] Loading state
  - [ ] Disabled state
- [ ] Input 컴포넌트
  - [ ] Text input
  - [ ] Number input
  - [ ] Date picker
  - [ ] Dropdown
- [ ] Card 컴포넌트
- [ ] Modal 컴포넌트
- [ ] Toast/Snackbar 컴포넌트

### Phase 3: 상태 관리 & 데이터
- [ ] 상태 관리 라이브러리 선택 (Zustand/Redux)
- [ ] API 클라이언트 설정
- [ ] 데이터 모델 정의
- [ ] Mock 데이터 생성

### Phase 4: 인증 & 보안
- [ ] 로그인/회원가입 UI
- [ ] OAuth 연동 (카카오, 네이버, 구글)
- [ ] JWT 토큰 관리
- [ ] 보안 스토리지

### Phase 5: 고급 기능
- [ ] 오프라인 지원
- [ ] 푸시 알림
- [ ] 이미지 최적화
- [ ] 성능 최적화

### Phase 6: 배포 준비
- [ ] 앱 아이콘 & 스플래시 스크린 디자인
- [ ] 앱스토어 스크린샷
- [ ] 개인정보 처리방침
- [ ] 이용약관
- [ ] 배포 자동화

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|----------|
| 1.0.0 | 2025-11-14 | - | 초기 문서 작성 |

---

## 참고 자료

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind v4 Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

