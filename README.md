# Plan A 프로젝트

웨딩 플래닝을 위한 풀스택 애플리케이션 (모바일 앱 + 백엔드 API)

## 팀원
- 김동언(PM, FE + BE)
- 이윤재 (FE + BE)
- 김은경 (FE)
- 최지호 (FE)

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [팀 정보](#팀-정보)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [개발 가이드](#개발-가이드)
- [라이센스](#라이센스)

## 📱 프로젝트 개요

Plan A는 웨딩 플래닝을 위한 종합 모바일 애플리케이션입니다.
- **Frontend**: React Native + Expo 기반 크로스 플랫폼 모바일 앱
- **Backend**: NestJS 기반 RESTful API 서버

### 주요 기능
- 홈 대시보드
- 웨딩 정보 검색
- 일정 관리
- 사용자 정보 관리

## 👥 팀 정보

**버전**: 1.0.0  
**작성일**: 2025.11.14  
**작성자**: 김동언 (rlaehddhs12@gmail.com)

**팀원**:
- 김동언
- 김은경
- 이윤재
- 최지호

## 📁 프로젝트 구조

```
planA/
├── BE/                     # 백엔드 (NestJS)
│   ├── src/
│   │   ├── common/        # 공통 모듈 (decorators, filters, guards, etc.)
│   │   ├── modules/       # 기능 모듈
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   └── package.json
│
├── FE/                     # 프론트엔드 (React Native + Expo)
│   ├── app/               # Expo Router 라우팅
│   │   ├── (tabs)/       # 탭 네비게이션
│   │   │   ├── index.tsx      # 홈
│   │   │   ├── search.tsx     # 검색
│   │   │   ├── schedule.tsx   # 일정
│   │   │   └── myinfo.tsx     # 내정보
│   │   └── _layout.tsx
│   ├── commons/          # 공통 컴포넌트 및 유틸리티
│   │   ├── layout/
│   │   │   └── GNB/     # Global Navigation Bar
│   │   ├── components/  # 공통 컴포넌트
│   │   └── enums/       # 상수 정의
│   ├── assets/          # 정적 자원
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md            # 이 파일
```

## 🛠 기술 스택

### Frontend (FE)
- **React Native**: 0.81.5
- **Expo**: ~54.0.23
- **Expo Router**: ~6.0.14
- **React**: 19.1.0
- **TypeScript**: ~5.9.2
- **NativeWind**: ^4.2.1
- **Tailwind CSS**: ^3.3.2
- **React Hook Form**: 폼 관리
- **Zod**: 검증
- **TanStack Query**: API 상태 관리

### Backend (BE)
- **NestJS**: v11
- **TypeScript**: v5.7
- **Node.js**: Runtime
- **Swagger**: API 문서화
- **class-validator**: 검증
- **Jest**: 테스트
- **ESLint + Prettier**: 코드 품질 관리

## 🚀 시작하기

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn
- Expo CLI (프론트엔드)
- iOS 개발: Xcode (macOS)
- Android 개발: Android Studio

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd planA
```

### 2. 백엔드 설정 및 실행

```bash
cd BE

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 값 설정

# 개발 서버 실행
npm run start:dev

# 프로덕션 빌드 및 실행
npm run build
npm run start:prod
```

**백엔드 실행 확인**:
- 서버: http://localhost:3000
- API 문서: http://localhost:3000/api-docs
- Health Check: http://localhost:3000/health

### 3. 프론트엔드 설정 및 실행

```bash
cd FE

# 의존성 설치
npm install

# 개발 서버 시작
npm start
# 또는
npx expo start

# 플랫폼별 실행
npm run ios      # iOS 시뮬레이터
npm run android  # Android 에뮬레이터
npm run web      # 웹 브라우저
```

## 💻 개발 가이드

### 백엔드 개발 규칙

1. **타입 안정성**: 모든 함수와 변수에 명시적 타입 지정
2. **에러 처리**: 적절한 HttpException 사용
3. **문서화**: 모든 엔드포인트에 Swagger 문서화
4. **테스트**: 주요 기능에 대한 단위 테스트 작성
5. **코드 포맷**: Prettier와 ESLint 규칙 준수

**백엔드 주요 명령어**:
```bash
# 코드 포맷팅
npm run format

# Linting
npm run lint

# 테스트
npm run test
npm run test:e2e
npm run test:cov

# 새 모듈 생성
nest g resource modules/[module-name]
```

### 프론트엔드 개발 규칙

1. **Tailwind 토큰 사용**: `tailwind.config.js`에 정의된 토큰만 사용
2. **색상값 직접 입력 금지**: 하드코딩된 hex 코드 사용 금지
3. **StyleSheet 전용**: React Native StyleSheet.create 사용
4. **인라인 스타일 금지**: 모든 스타일은 `styles.ts` 파일로 분리
5. **NativeWind**: className 대신 style prop 사용
6. **상수 관리**: 텍스트 상수는 `commons/enums`에서 관리
7. **독립적 구현**: 추후 수정이 쉽도록 독립적인 부품들의 조립 형태로 구현

**프론트엔드 주요 명령어**:
```bash
# 캐시 초기화하며 시작
npx expo start -c

# 특정 플랫폼 실행
npm run ios
npm run android
npm run web
```

### API 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": null
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## 📚 추가 문서

### 백엔드 문서
- [BE/README.md](./BE/README.md) - 상세한 백엔드 가이드
- API 문서: http://localhost:3000/api-docs (서버 실행 후)

### 프론트엔드 문서
- [FE/README.md](./FE/README.md) - 상세한 프론트엔드 가이드
- [FE/doc/v.1.0.0/](./FE/doc/v.1.0.0/) - 컴포넌트, API, 기능 템플릿

## 🔗 관련 링크

### 백엔드
- [NestJS 공식 문서](https://docs.nestjs.com)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [Swagger 문서](https://swagger.io/docs)

### 프론트엔드
- [React Native 문서](https://reactnative.dev/docs/getting-started)
- [Expo 문서](https://docs.expo.dev)
- [NativeWind 문서](https://www.nativewind.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

## 🐛 트러블슈팅

### 프론트엔드 캐시 문제
```bash
cd FE
rm -rf .expo node_modules/.cache
watchman watch-del-all  # watchman이 설치된 경우
npx expo start -c
```

### 의존성 문제
```bash
# 백엔드
cd BE
rm -rf node_modules package-lock.json
npm install

# 프론트엔드
cd FE
rm -rf node_modules package-lock.json
npm install
```

## 📄 라이센스

Private / UNLICENSED

---

© 2025 Plan A Team. All rights reserved.

