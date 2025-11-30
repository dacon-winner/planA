# PlanA 문서 인덱스

> **작성일**: 2025.11.29
> **문서 버전**: 1.0.1

---

## 📚 문서 개요

PlanA 프로젝트의 모든 문서는 **관심사별로 분리**되어 있습니다. 각 문서는 독립적으로 읽을 수 있으며, 필요시 상호 참조합니다.

---

## 🗂️ 문서 구조

### 1. 데이터베이스 (Database)

📂 `docs/database/`

| 문서                                                    | 설명                                   | 대상 독자          |
| ------------------------------------------------------- | -------------------------------------- | ------------------ |
| **[DATABASE.md](database/DATABASE.md)**                 | DB 설계, ERD, 테이블 명세, 인덱스 전략 | 백엔드 개발자, DBA |
| [DATABASE_V.1.0.0.dbml](database/DATABASE_V.1.0.0.dbml) | DBML 형식 스키마 (참조용)              | 개발자             |
| [Plan_A.sql](database/Plan_A.sql)                       | PostgreSQL 스키마 SQL                  | DBA                |

**주요 내용:**

- 15개 테이블 상세 명세
- ERD 다이어그램
- 설계 원칙 및 의도
- 인덱스 전략
- 마이그레이션 가이드

---

### 2. 아키텍처 (Architecture)

📂 `docs/architecture/`

| 문서                                                | 설명                                | 대상 독자   |
| --------------------------------------------------- | ----------------------------------- | ----------- |
| **[ARCHITECTURE.md](architecture/ARCHITECTURE.md)** | 기술 스택, 아키텍처 패턴, 모듈 구조 | 모든 개발자 |

**주요 내용:**

- NestJS 계층형 아키텍처
- TypeScript + TypeORM 활용
- 모듈 구조 및 의존성 주입
- 응답 형식 표준화
- 기술적 의사결정 배경

---

### 3. 비즈니스 로직 (Business Logic)

📂 `docs/business/`

| 문서                                                | 설명                                  | 대상 독자         |
| --------------------------------------------------- | ------------------------------------- | ----------------- |
| **[BUSINESS_LOGIC.md](business/BUSINESS_LOGIC.md)** | RAG AI 추천, 플랜 관리, 예약 프로세스 | 백엔드 개발자, PM |

**주요 내용:**

- **RAG 기반 AI 추천 시스템** (핵심) - 2단계 필터링, 비용 99% 절감
- 플랜 생성 및 관리 로직
- 예약 프로세스 및 상태 관리
- 리뷰 시스템
- 정책 정보 큐레이션

---

### 4. API 설계 (API Design)

📂 `docs/api/`

| 문서                                   | 설명                                    | 대상 독자                |
| -------------------------------------- | --------------------------------------- | ------------------------ |
| **[API_DESIGN.md](api/API_DESIGN.md)** | API 엔드포인트, 응답 형식, 페이지네이션 | 프론트엔드/백엔드 개발자 |

**주요 내용:**

- RESTful API 설계 원칙
- 엔드포인트 명세 (인증, 업체, AI 추천, 플랜, 예약 등)
- 요청/응답 형식
- 에러 코드 체계
- 페이지네이션 및 정렬

---

### 5. 프로젝트 루트

📂 `BE/`

| 문서                                      | 설명                              | 대상 독자 |
| ----------------------------------------- | --------------------------------- | --------- |
| **[README.md](../README.md)**             | 프로젝트 개요 및 빠른 시작 가이드 | 모든 사람 |
| [SETUP_COMPLETE.md](../SETUP_COMPLETE.md) | 초기 세팅 완료 문서               | 개발자    |

---

## 🎯 역할별 추천 문서

### 새로 합류한 개발자

1. [README.md](../README.md) - 프로젝트 개요 파악
2. [ARCHITECTURE.md](architecture/ARCHITECTURE.md) - 기술 스택 이해
3. [DATABASE.md](database/DATABASE.md) - DB 구조 파악
4. [BUSINESS_LOGIC.md](business/BUSINESS_LOGIC.md) - 핵심 로직 이해

### 프론트엔드 개발자

1. [API_DESIGN.md](api/API_DESIGN.md) - API 명세 확인
2. [BUSINESS_LOGIC.md](business/BUSINESS_LOGIC.md) - 비즈니스 플로우 이해

### 백엔드 개발자

1. [ARCHITECTURE.md](architecture/ARCHITECTURE.md) - 아키텍처 구조
2. [DATABASE.md](database/DATABASE.md) - DB 설계
3. [BUSINESS_LOGIC.md](business/BUSINESS_LOGIC.md) - 구현 로직
4. [API_DESIGN.md](api/API_DESIGN.md) - API 설계

### PM / 기획자

1. [README.md](../README.md) - 프로젝트 개요
2. [BUSINESS_LOGIC.md](business/BUSINESS_LOGIC.md) - 비즈니스 로직
3. [DATABASE.md](database/DATABASE.md) - 데이터 구조

### DBA

1. [DATABASE.md](database/DATABASE.md) - 전체 DB 설계
2. [Plan_A.sql](database/Plan_A.sql) - SQL 스크립트

---

## 🔍 주제별 문서 찾기

### AI 추천 시스템

- [BUSINESS_LOGIC.md - RAG 기반 AI 추천](business/BUSINESS_LOGIC.md#1-rag-기반-ai-추천-시스템)
- [DATABASE.md - ai_resource 테이블](database/DATABASE.md#ai_resource---ai-추천용-리소스)
- [API_DESIGN.md - AI 추천 API](api/API_DESIGN.md#33-ai-추천-ai-recommendations)

### 플랜 관리

- [BUSINESS_LOGIC.md - 플랜 생성 및 관리](business/BUSINESS_LOGIC.md#2-플랜-생성-및-관리)
- [DATABASE.md - plan 테이블](database/DATABASE.md#plan---웨딩-플랜)
- [API_DESIGN.md - 플랜 API](api/API_DESIGN.md#34-플랜-plans)

### 예약 시스템

- [BUSINESS_LOGIC.md - 예약 프로세스](business/BUSINESS_LOGIC.md#3-예약-프로세스)
- [DATABASE.md - reservation 테이블](database/DATABASE.md#reservation---예약-정보)
- [API_DESIGN.md - 예약 API](api/API_DESIGN.md#35-예약-reservations)

### 인증 시스템

- [ARCHITECTURE.md - 보안 전략](architecture/ARCHITECTURE.md#7-보안-전략)
- [API_DESIGN.md - 인증 API](api/API_DESIGN.md#31-인증-authentication)

---

## 📝 문서 작성 규칙

### 1. 중복 최소화

- 각 주제는 하나의 문서에만 상세히 작성
- 다른 문서에서는 링크로 참조

### 2. 관심사 분리

- Database: 데이터 구조만
- Architecture: 기술 스택과 구조만
- Business Logic: 비즈니스 로직만
- API Design: API 명세만

### 3. 독립성

- 각 문서는 독립적으로 읽을 수 있어야 함
- 필요한 컨텍스트는 문서 내에 포함

### 4. 최신성 유지

- 코드 변경 시 관련 문서도 함께 업데이트
- 문서 버전 명시

---

## 🔄 문서 업데이트 프로세스

### 스키마 변경 시

1. `src/entities/*.entity.ts` 수정
2. `npm run migration:generate` 실행
3. `docs/database/DATABASE.md` 업데이트
4. `docs/database/Plan_A.sql` 동기화 (필요 시)

### API 변경 시

1. Controller 구현
2. `docs/api/API_DESIGN.md` 업데이트
3. Swagger 문서 확인

### 비즈니스 로직 변경 시

1. Service 구현
2. `docs/business/BUSINESS_LOGIC.md` 업데이트

---

## 📞 문의

문서 관련 문의사항이나 개선 제안은 아래로 연락주세요:

**작성자**: 김동언
**이메일**: rlaehddhs12@gmail.com
**수정자**: 이윤재
**이메일**: leeyunje96@gmail.com

---

**문서 버전**: 1.0.1
**최종 수정일**: 2025.11.29
