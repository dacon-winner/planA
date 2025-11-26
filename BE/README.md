# PlanA Backend API

NestJS 기반의 PlanA 백엔드 API 서버입니다.


## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [환경 변수](#환경-변수)
- [API 문서](#api-문서)
- [개발 가이드](#개발-가이드)

## 🛠 기술 스택
- **Framework**: NestJS v11
- **Language**: TypeScript v5.7
- **Runtime**: Node.js
- **API Documentation**: Swagger
- **Validation**: class-validator, class-transformer
- **Testing**: Jest
- **Linting**: ESLint, Prettier
## 📁 프로젝트 구조

```
BE/
├── src/
│   ├── common/              # 공통 모듈
│   │   ├── decorators/      # 커스텀 데코레이터
│   │   ├── dto/             # 공통 DTO
│   │   ├── filters/         # Exception 필터
│   │   ├── guards/          # 인증/인가 가드
│   │   ├── interceptors/    # 응답 변환 인터셉터
│   │   ├── interfaces/      # 공통 인터페이스
│   │   └── types/           # 공통 타입
│   ├── modules/             # 기능 모듈
│   │   └── health/          # Health Check 모듈
│   ├── app.module.ts        # 루트 모듈
│   └── main.ts              # 애플리케이션 진입점
├── test/                    # 테스트 파일
├── .env                     # 환경 변수 (git ignored)
├── .env.example             # 환경 변수 예시
└── package.json
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정합니다:

```bash
cp .env.example .env
```

### 3. 개발 서버 실행

```bash
# 개발 모드 (watch mode)
npm run start:dev

# 일반 모드
npm run start

# 디버그 모드
npm run start:debug
```

### 4. 프로덕션 빌드 및 실행

```bash
# 빌드
npm run build

# 프로덕션 실행
npm run start:prod
```

## 🔐 환경 변수

`.env` 파일에 다음 환경 변수를 설정하세요:

```env
# Application
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGIN=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=plana

# JWT
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=1d

# API
API_PREFIX=api
API_VERSION=v1
```

## 🗄️ 데이터베이스 설정

### PostgreSQL 설치 및 실행
```bash
# macOS (Homebrew)
brew install postgresql@14
brew services start postgresql@14

# 데이터베이스 생성
psql postgres
CREATE DATABASE plana;
\q
```

### 마이그레이션 실행
```bash
# 마이그레이션 실행 (데이터베이스 스키마 생성)
npm run migration:run

# 마이그레이션 되돌리기
npm run migration:revert
```

자세한 내용은 [MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md)를 참조하세요.

## 📚 API 문서

서버 실행 후 Swagger 문서는 다음 URL에서 확인할 수 있습니다:

```
http://localhost:3000/api-docs
```

### 주요 엔드포인트

- `GET /health` - 서버 상태 확인
- `GET /health/info` - 서버 정보 확인

## 💻 개발 가이드

### 코드 포맷팅

```bash
# 코드 포맷팅
npm run format

# Linting
npm run lint
```

### 테스트

```bash
# 단위 테스트
npm run test

# e2e 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov

# Watch 모드
npm run test:watch
```

### 새 모듈 생성

```bash
# 모듈, 컨트롤러, 서비스를 한 번에 생성
nest g resource modules/[module-name]

# 개별 생성
nest g module modules/[module-name]
nest g controller modules/[module-name]
nest g service modules/[module-name]
```

## 🏗 주요 기능

### 전역 설정

- **Validation Pipe**: 요청 데이터 자동 검증 및 변환
- **Exception Filter**: 일관된 에러 응답 형식
- **Transform Interceptor**: 일관된 성공 응답 형식
- **CORS**: Cross-Origin Resource Sharing 설정

### 공통 응답 형식

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

### 커스텀 데코레이터

- `@Public()`: 인증 없이 접근 가능한 엔드포인트 표시
- `@CurrentUser()`: 현재 로그인한 사용자 정보 가져오기
- `@ApiCommonResponse()`: Swagger 공통 응답 문서화

## 📝 개발 규칙

1. **타입 안정성**: 모든 함수와 변수에 명시적 타입 지정
2. **에러 처리**: 적절한 HttpException 사용
3. **문서화**: 모든 엔드포인트에 Swagger 문서화
4. **테스트**: 주요 기능에 대한 단위 테스트 작성
5. **코드 포맷**: Prettier와 ESLint 규칙 준수

## 🔗 관련 링크

- [NestJS 공식 문서](https://docs.nestjs.com)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs)
- [Swagger 문서](https://swagger.io/docs)

## 📄 라이센스

UNLICENSED


## 작성자
김동언(rlaehddhs12@gmail.com)

## 작성일
2025.11.14

## 팀원

김동언,
이윤재

## 버전
1.0.0