# PlanA Backend API

> **AI 기반 웨딩 플래닝 서비스**  
> NestJS + TypeScript + PostgreSQL

---

## 📋 프로젝트 개요

**PlanA**는 예비 신혼부부를 위한 **AI 기반 웨딩 플래닝 서비스**입니다.

### 주요 기능

- **🤖 AI 맞춤 추천**: RAG 기술 기반 업체 추천 
- **📋 플랜 관리**: 나만의 웨딩 플랜 생성 및 관리
- **📅 예약 시스템**: 업체별 상담/예약 일정 통합 관리
- **🗓️ 일정 관리**: 웨딩 준비 일정 추적
- **🏛️ 정책 정보**: 신혼부부 지원 정책 큐레이션
- **⭐ 리뷰 시스템**: 실사용자 기반 리뷰 및 평점

---

## 🛠 기술 스택

- **Backend**: NestJS v11.0.1 (TypeScript v5.7)
- **Database**: PostgreSQL 14+ (TypeORM v0.3.27)
- **Testing**: Playwright
- **Documentation**: Swagger (OpenAPI)
- **Code Quality**: ESLint, Prettier

---

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열어 데이터베이스 정보 등을 설정하세요.

### 3. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
psql postgres
CREATE DATABASE plana;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
\q

# 마이그레이션 실행
npm run migration:run
```

### 4. 개발 서버 실행

```bash
npm run start:dev
```

서버가 http://localhost:3000 에서 실행됩니다.

### 5. API 문서 확인

http://localhost:3000/api-docs 에서 Swagger 문서를 확인할 수 있습니다.

---

## 📚 문서 구조

프로젝트 문서는 관심사별로 분리되어 있습니다:

### 📂 Database (데이터베이스)
- **[DATABASE.md](docs/database/DATABASE.md)**: DB 설계, ERD, 테이블 명세, 인덱스 전략
- **[DATABASE_V.1.0.0.dbml](docs/database/DATABASE_V.1.0.0.dbml)**: DBML 형식 스키마
- **[Plan_A.sql](docs/database/Plan_A.sql)**: SQL 스크립트

### 🏗️ Architecture (아키텍처)
- **[ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)**: 기술 스택, 아키텍처 패턴, 모듈 구조

### 🔌 API (API 설계)
- **[API_DESIGN.md](docs/api/API_DESIGN.md)**: API 엔드포인트, 응답 형식, 페이지네이션

### 💼 Business (비즈니스 로직)
- **[BUSINESS_LOGIC.md](docs/business/BUSINESS_LOGIC.md)**: RAG AI 추천, 플랜 관리, 예약 프로세스

### 📖 Guides (가이드)
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)**: 초기 세팅 완료 문서

---

## 📁 프로젝트 구조

```
BE/
├── docs/                     # 📚 문서
│   ├── database/            # DB 설계 및 스키마
│   ├── architecture/        # 아키텍처 문서
│   ├── api/                 # API 설계
│   └── business/            # 비즈니스 로직
│
├── src/
│   ├── common/              # 공통 모듈
│   │   ├── decorators/     # 커스텀 데코레이터
│   │   ├── dto/            # 공통 DTO
│   │   ├── filters/        # Exception 필터
│   │   ├── guards/         # 인증/인가 가드
│   │   ├── interceptors/   # 인터셉터
│   │   └── interfaces/     # 공통 인터페이스
│   │
│   ├── entities/            # 데이터베이스 엔티티 (14개)
│   ├── migrations/          # TypeORM 마이그레이션
│   ├── modules/             # 기능 모듈
│   │   ├── health/         # Health Check
│   │   ├── auth/           # 인증 (예정)
│   │   ├── users/          # 사용자 관리 (예정)
│   │   ├── vendors/        # 업체 관리 (예정)
│   │   ├── plans/          # 플랜 관리 (예정)
│   │   ├── reservations/   # 예약 관리 (예정)
│   │   └── ai/             # AI 추천 (예정)
│   │
│   ├── app.module.ts
│   ├── main.ts
│   └── data-source.ts
│
├── e2e/                     # E2E 테스트
├── .env.example
├── package.json
└── README.md
```

---

## 🎯 핵심 설계 철학

### 1. RAG 기반 AI 추천 시스템

```
2,000개 → [1차 DB 필터링] → 20개 → [2차 LLM 추천] → 4개
```

- **1차 필터링**: SQL WHERE 절로 지역/예산/카테고리 필터링
- **2차 추천**: 20개의 컨텍스트만 LLM에 전달

자세한 내용: [BUSINESS_LOGIC.md](docs/business/BUSINESS_LOGIC.md#1-rag-기반-ai-추천-시스템)

### 2. 모듈화 아키텍처

- **관심사 분리**: 기능별 독립 모듈
- **Dependency Injection**: 느슨한 결합, 테스트 용이
- **계층형 구조**: Presentation → Business Logic → Data Access

자세한 내용: [ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)

### 3. PostgreSQL + JSONB
- **JSONB 타입**: 유연한 메타데이터 저장 (NoSQL 장점)
- **GIN 인덱스**: JSON 내부 필드 검색 최적화
- **pgvector 확장 계획**: 향후 벡터 검색 지원

자세한 내용: [DATABASE.md](docs/database/DATABASE.md)

---

## 🧪 테스트

```bash
# E2E 테스트 실행
npm test

# UI 모드로 테스트
npm run test:ui

# 테스트 리포트 확인
npm run test:report
```

---

## 🔧 개발 명령어

```bash
# 개발 서버 (watch mode)
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start:prod

# 코드 포매팅
npm run format

# Linting
npm run lint

# 마이그레이션 생성
npm run migration:generate src/migrations/MigrationName

# 마이그레이션 실행
npm run migration:run

# 마이그레이션 되돌리기
npm run migration:revert
```

---

## 📊 API 응답 형식

### 성공 응답

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-11-26T00:00:00.000Z"
}
```

### 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  },
  "timestamp": "2025-11-26T00:00:00.000Z",
  "path": "/api/v1/endpoint"
}
```

자세한 내용: [API_DESIGN.md](docs/api/API_DESIGN.md)

---

## 🗄️ 데이터베이스 ERD

총 **14개 테이블**로 구성:

- **사용자**: users
- **업체**: vendor, vendor_venue_detail, vendor_image, service_item
- **플랜**: plan, plan_item
- **예약**: reservation
- **일정**: personal_schedule
- **정책**: policy_info, user_policy_scrap
- **리뷰**: review
- **AI**: ai_resource, ai_log

자세한 내용: [DATABASE.md](docs/database/DATABASE.md#2-erd-entity-relationship-diagram)

---

## 🛣️ 개발 로드맵

### Phase 1 - MVP (현재)

- [x] 데이터베이스 스키마 설계
- [x] 엔티티 및 마이그레이션 구현
- [x] 프로젝트 기본 구조 설정
- [ ] 인증 시스템 구현
- [ ] 업체 조회 API
- [ ] AI 추천 시스템 (기본)
- [ ] 플랜 CRUD API
- [ ] 예약 CRUD API

### Phase 2 - 핵심 기능 강화

- [ ] pgvector 도입 (시맨틱 검색)
- [ ] AI 추천 정확도 개선
- [ ] 리뷰 시스템 구현
- [ ] 개인 일정 관리 API
- [ ] 정책 정보 큐레이션
- [ ] 푸시 알림 시스템

### Phase 3 - 고도화

- [ ] 실시간 채팅 (업체-사용자)
- [ ] 이미지 업로드 및 최적화
- [ ] 관리자 대시보드
- [ ] 업체 회원 시스템

---

## 👥 팀

**프로젝트 관리자**: 김동언  
**이메일**: rlaehddhs12@gmail.com  
**팀원**: 김동언, 이윤재

---

## 📝 라이센스

UNLICENSED

---

## 🔗 관련 링크

- **NestJS 공식 문서**: https://docs.nestjs.com
- **TypeORM 공식 문서**: https://typeorm.io
- **PostgreSQL 공식 문서**: https://www.postgresql.org/docs/

---

**버전**: 1.0.0  
**최종 수정일**: 2025.11.26
