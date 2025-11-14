# Plan A
웨딩 플래닝 모바일 애플리케이션

## 기술 스택

- **React Native**: 0.81.5
- **Expo**: ~54.0.23
- **Expo Router**: ~6.0.14
- **React**: 19.1.0
- **TypeScript**: ~5.9.2
- **NativeWind**: ^4.2.1
- **Tailwind CSS**: ^3.3.2

## 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Expo CLI
- iOS 개발: Xcode (macOS)
- Android 개발: Android Studio

## 설치 순서

### 1. 의존성 설치

```bash
npm install
```

### 2. 캐시 초기화 (선택사항)

프로젝트를 처음 설치하거나 문제가 발생한 경우:

```bash
rm -rf .expo node_modules/.cache
watchman watch-del-all  # watchman이 설치된 경우
```

## 실행 명령어

### 개발 서버 시작

```bash
npm start
# 또는
npx expo start
```

### 캐시 초기화하며 시작

```bash
npx expo start -c
# 또는
npx expo start --clear
```

### 플랫폼별 실행

```bash
# iOS 시뮬레이터
npm run ios
# 또는
npx expo start --ios

# Android 에뮬레이터
npm run android
# 또는
npx expo start --android

# 웹 브라우저
npm run web
# 또는
npx expo start --web
```

## 프로젝트 구조

```
planA/
├── app/                    # Expo Router 앱 라우팅
│   ├── (tabs)/            # 탭 네비게이션 라우트
│   │   ├── index.tsx      # 홈 화면
│   │   ├── search.tsx     # 검색 화면
│   │   ├── schedule.tsx   # 일정 화면
│   │   ├── myinfo.tsx     # 내정보 화면
│   │   └── _layout.tsx    # 탭 레이아웃
│   ├── _layout.tsx        # 루트 레이아웃
│   └── index.tsx          # 앱 진입점
├── commons/               # 공통 컴포넌트 및 유틸리티
│   ├── layout/
│   │   └── GNB/          # Global Navigation Bar
│   │       └── components/
│   │           ├── Home/
│   │           ├── Search/
│   │           ├── Schedule/
│   │           ├── MyInfo/
│   │           └── TabLayout/
│   └── enums/            # 상수 정의
│       ├── gnb.ts
│       └── index.ts
├── assets/               # 이미지, 폰트 등 정적 자원
├── global.css           # Tailwind CSS 글로벌 스타일
├── tailwind.config.js   # Tailwind 설정 (디자인 토큰)
├── metro.config.js      # Metro 번들러 설정
├── babel.config.js      # Babel 설정
├── app.json            # Expo 설정
└── tsconfig.json       # TypeScript 설정
```

## 개발 규칙

### UI 개발 규칙 (03-ui.mdc)

1. **Tailwind 토큰 사용**: `tailwind.config.js`에 정의된 토큰만 사용
2. **색상값 직접 입력 금지**: 하드코딩된 hex 코드 사용 금지
3. **StyleSheet 전용**: React Native StyleSheet.create 사용
4. **인라인 스타일 금지**: 모든 스타일은 styles.ts 파일로 분리
5. **NativeWind**: className 대신 style prop 사용
6. **상수 관리**: 텍스트 상수는 `commons/enums`에서 관리

## 디자인 시스템
디자인 토큰은 `tailwind.config.js`에 정의되어 있습니다:
- **Colors**: Primary, Secondary, Tertiary 팔레트
- **Typography**: Mobile/Desktop 폰트 크기, 행간, 자간
- **Spacing**: 4px 기반 간격 시스템
- **Border**: 모서리 반경, 테두리 색상

## 라이센스
Private

## 버전
1.0.0

## 작성자
김동언 (2025.11.14)
rlaehddhs12@gmail.com

## 팀원
김동언,
김은경,
이윤재,
최지호