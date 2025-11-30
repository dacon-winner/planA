# 아키텍처 문서

> **작성일**: 2025.11.26  
> **작성자**: 김동언  
> **버전**: 1.0.0

---

## 📋 목차

1. [기술 스택](#1-기술-스택)
2. [아키텍처 패턴](#2-아키텍처-패턴)
3. [모듈 구조](#3-모듈-구조)
4. [응답 형식 표준화](#4-응답-형식-표준화)
5. [기술적 의사결정 배경](#5-기술적-의사결정-배경)

---

## 1. 기술 스택

### 1.1 Backend Framework

#### **NestJS v11.0.1**
- TypeScript 기반 프로그레시브 Node.js 프레임워크
- 모듈화된 아키텍처로 확장성과 유지보수성 향상
- Dependency Injection을 통한 느슨한 결합
- 강력한 타입 안정성

### 1.2 Language & Runtime

#### **TypeScript v5.7**
- 정적 타입 시스템으로 개발 생산성 및 코드 품질 향상
- 컴파일 타임 에러 검출
- IDE 자동완성 및 리팩토링 지원

#### **Node.js**
- 고성능 비동기 I/O
- 단일 언어 스택 (프론트엔드-백엔드)
- 풍부한 npm 생태계

### 1.3 Database

#### **PostgreSQL 14+**
- 강력한 관계형 데이터베이스
- **JSONB 타입**: 유연한 메타데이터 저장
- **UUID 지원**: 분산 시스템 대응
- **pgvector 확장 계획**: 향후 벡터 검색 지원

### 1.4 ORM

#### **TypeORM v0.3.27**
- TypeScript/JavaScript ORM
- Entity 기반 데이터 모델링
- 마이그레이션 관리
- Query Builder를 통한 복잡한 쿼리 작성
- Active Record / Data Mapper 패턴 지원

### 1.5 Validation & Transformation

#### **class-validator**
- 데코레이터 기반 검증
- 커스텀 검증 규칙 작성 가능
- 자동 에러 메시지 생성

#### **class-transformer**
- 객체 변환 및 직렬화
- DTO 자동 변환
- 타입 안정성 보장

### 1.6 API Documentation

#### **Swagger (OpenAPI)**
- 자동 API 문서 생성
- 데코레이터 기반 문서화
- 인터랙티브 API 테스트 UI

### 1.7 Testing

#### **Playwright**
- E2E 테스트 프레임워크
- 크로스 브라우저 테스트
- 데이터베이스 연결 테스트
- API 엔드포인트 테스트

### 1.8 Code Quality

#### **ESLint**
- 코드 품질 및 스타일 검사
- TypeScript 규칙 적용
- 커스텀 규칙 설정

#### **Prettier**
- 자동 코드 포매팅
- 팀 전체 일관된 코드 스타일

---

## 2. 아키텍처 패턴

### 2.1 계층형 아키텍처 (Layered Architecture)

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│                                         │
│  - Controllers: HTTP 요청/응답 처리      │
│  - DTOs: 데이터 전송 객체                │
│  - Decorators: 메타데이터 정의           │
│  - Swagger: API 문서화                  │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│                                         │
│  - Services: 비즈니스 로직 구현          │
│  - Guards: 인증/인가 처리               │
│  - Interceptors: 요청/응답 변환         │
│  - Pipes: 데이터 검증 및 변환           │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│         Data Access Layer               │
│                                         │
│  - Repositories: 데이터 접근 추상화      │
│  - Entities: 데이터 모델                │
│  - TypeORM: ORM 계층                    │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│            Database Layer               │
│                                         │
│  - PostgreSQL: 데이터 저장소            │
│  - Indexes: 성능 최적화                 │
│  - Constraints: 데이터 무결성           │
└─────────────────────────────────────────┘
```

### 2.2 의존성 주입 (Dependency Injection)

```typescript
// 예시: Service 의존성 주입
@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
    @InjectRepository(PlanItem)
    private planItemRepository: Repository<PlanItem>,
    private aiService: AiService,
    private vendorService: VendorService,
  ) {}

  async createAiPlan(userId: string): Promise<Plan> {
    // 비즈니스 로직
  }
}
```

**장점:**
- 느슨한 결합 (Loose Coupling)
- 테스트 용이성 (Mock 객체 주입)
- 코드 재사용성 향상

### 2.3 모듈 기반 구조

```
AppModule (Root)
  ├── ConfigModule (전역)
  ├── TypeOrmModule (전역)
  ├── HealthModule
  ├── AuthModule (예정)
  ├── UsersModule (예정)
  ├── VendorsModule (예정)
  ├── PlansModule (예정)
  ├── ReservationsModule (예정)
  └── AiModule (예정)
```

**모듈의 역할:**
- 기능별 캡슐화
- 독립적인 개발 및 테스트
- 지연 로딩 가능

---

## 3. 모듈 구조

### 3.1 프로젝트 디렉토리 구조

```
src/
├── common/                    # 공통 모듈 (전역 사용)
│   ├── decorators/           # 커스텀 데코레이터
│   │   ├── @CurrentUser()    # 현재 사용자 정보 추출
│   │   ├── @Public()         # 인증 제외 엔드포인트 표시
│   │   └── @ApiCommonResponse() # Swagger 공통 응답 문서화
│   │
│   ├── dto/                  # 공통 DTO
│   │   └── PaginationDto     # 페이지네이션 파라미터
│   │
│   ├── filters/              # 예외 필터
│   │   └── HttpExceptionFilter # 전역 에러 핸들링
│   │
│   ├── guards/               # 인증/인가 가드
│   │   ├── JwtAuthGuard      # JWT 인증
│   │   └── RolesGuard        # 역할 기반 접근 제어
│   │
│   ├── interceptors/         # 인터셉터
│   │   └── TransformInterceptor # 응답 형식 통일
│   │
│   ├── interfaces/           # 공통 인터페이스
│   │   └── ApiResponse       # API 응답 타입 정의
│   │
│   └── types/                # 공통 타입 정의
│
├── entities/                 # 데이터베이스 엔티티 (14개)
│   ├── user.entity.ts
│   ├── vendor.entity.ts
│   ├── plan.entity.ts
│   ├── ai-resource.entity.ts
│   └── ... (총 14개 엔티티)
│
├── migrations/               # TypeORM 마이그레이션
│   └── 1732600000000-InitialSchema.ts
│
├── modules/                  # 기능 모듈
│   ├── health/              # Health Check
│   │   ├── health.controller.ts
│   │   ├── health.service.ts
│   │   ├── health.module.ts
│   │   └── index.ts
│   │
│   ├── auth/ (예정)         # 인증
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/      # Passport 전략
│   │   ├── dto/
│   │   └── auth.module.ts
│   │
│   ├── users/ (예정)        # 사용자 관리
│   ├── vendors/ (예정)      # 업체 관리
│   ├── plans/ (예정)        # 플랜 관리
│   ├── reservations/ (예정) # 예약 관리
│   └── ai/ (예정)           # AI 추천
│
├── app.module.ts            # 루트 모듈
├── app.controller.ts
├── app.service.ts
├── main.ts                  # 애플리케이션 진입점
└── data-source.ts           # TypeORM 데이터 소스 설정
```

### 3.2 모듈 구조 예시

```typescript
// modules/vendors/vendors.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vendor,
      VendorVenueDetail,
      VendorImage,
      ServiceItem,
    ]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService], // 다른 모듈에서 사용 가능
})
export class VendorsModule {}
```

### 3.3 공통 모듈 구성 요소

#### 3.3.1 커스텀 데코레이터

```typescript
// @CurrentUser() - 현재 사용자 정보 추출
@Get('profile')
async getProfile(@CurrentUser() user: User) {
  return user;
}

// @Public() - 인증 없이 접근 가능
@Public()
@Get('vendors')
async getVendors() {
  return this.vendorsService.findAll();
}

// @ApiCommonResponse() - Swagger 문서화
@ApiCommonResponse(VendorDto)
@Get(':id')
async getVendor(@Param('id') id: string) {
  return this.vendorsService.findOne(id);
}
```

#### 3.3.2 Exception Filter

```typescript
// 전역 에러 핸들링
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 일관된 에러 응답 형식 반환
    return {
      success: false,
      error: {
        code: 'ERROR_CODE',
        message: 'Error message',
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };
  }
}
```

#### 3.3.3 Transform Interceptor

```typescript
// 일관된 성공 응답 형식
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

---

## 4. 응답 형식 표준화

### 4.1 성공 응답

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "강남 웨딩홀",
    "category": "VENUE",
    "region": "강남구"
  },
  "timestamp": "2025-11-26T12:00:00.000Z"
}
```

### 4.2 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "VENDOR_NOT_FOUND",
    "message": "업체를 찾을 수 없습니다.",
    "details": {
      "vendorId": "invalid-uuid"
    }
  },
  "timestamp": "2025-11-26T12:00:00.000Z",
  "path": "/api/v1/vendors/invalid-uuid"
}
```

### 4.3 페이지네이션 응답

```json
{
  "success": true,
  "data": {
    "items": [
      { "id": "...", "name": "..." },
      { "id": "...", "name": "..." }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  },
  "timestamp": "2025-11-26T12:00:00.000Z"
}
```

### 4.4 에러 코드 체계

| 범위 | 용도 | 예시 |
|------|------|------|
| 1000-1999 | 인증/인가 | AUTH_INVALID_TOKEN, AUTH_EXPIRED |
| 2000-2999 | 사용자 | USER_NOT_FOUND, USER_EMAIL_DUPLICATE |
| 3000-3999 | 업체 | VENDOR_NOT_FOUND, VENDOR_INACTIVE |
| 4000-4999 | 플랜 | PLAN_NOT_FOUND, PLAN_ITEM_INVALID |
| 5000-5999 | 예약 | RESERVATION_CONFLICT, RESERVATION_CANCELLED |
| 9000-9999 | 시스템 | INTERNAL_ERROR, DATABASE_ERROR |

---

## 5. 기술적 의사결정 배경

### 5.1 왜 NestJS인가?

#### 1. TypeScript 네이티브 지원
- **타입 안정성**: 런타임 에러를 컴파일 타임에 방지
- **개발 생산성**: IDE 자동완성, 리팩토링 지원
- **코드 품질**: 명시적인 타입으로 가독성 향상

#### 2. 모듈화 아키텍처
- **관심사 분리**: 기능별 모듈로 명확히 분리
- **재사용성**: 모듈 단위로 재사용 가능
- **팀 협업**: 모듈별로 독립적 개발 가능

#### 3. Dependency Injection
- **테스트 용이성**: Mock 객체 주입으로 단위 테스트 간편
- **느슨한 결합**: 인터페이스 기반 의존성
- **확장성**: 새로운 구현체 추가 용이

#### 4. 풍부한 생태계
- **공식 패키지**: TypeORM, Passport, Swagger 등
- **활발한 커뮤니티**: 빠른 문제 해결
- **검증된 아키텍처**: 대규모 프로젝트 적용 사례 많음

### 5.2 왜 PostgreSQL인가?

#### 1. JSONB 타입 지원
- **유연성**: NoSQL의 장점을 RDB에서 활용
- **성능**: 바이너리 형태로 저장되어 빠른 검색
- **인덱싱**: GIN 인덱스로 JSON 내부 필드 검색 최적화

```sql
-- JSONB 활용 예시 (ai_resource 테이블)
SELECT * FROM ai_resource
WHERE metadata->>'region' = '강남구'
AND (metadata->>'price_min')::int <= 1000000;
```

#### 2. pgvector 확장 가능
- **향후 계획**: 벡터 검색 도입 시 DB 변경 불필요
- **임베딩 저장**: AI 모델의 임베딩 벡터 직접 저장
- **시맨틱 검색**: 의미 기반 검색으로 추천 정확도 향상

```sql
-- pgvector 사용 예시 (향후)
CREATE EXTENSION vector;

ALTER TABLE ai_resource ADD COLUMN embedding vector(1536);

-- 코사인 유사도 검색
SELECT * FROM ai_resource
ORDER BY embedding <=> '[0.1, 0.2, ...]'
LIMIT 10;
```

#### 3. 강력한 트랜잭션 지원
- **ACID 보장**: 데이터 무결성 확보
- **격리 수준**: Read Committed, Repeatable Read, Serializable
- **MVCC**: 동시성 제어로 높은 처리량

#### 4. 성능 및 안정성
- **대용량 데이터**: 수백만 행 이상 처리 가능
- **검증된 DBMS**: 30년 이상의 역사
- **엔터프라이즈급**: 금융, 통신 등 주요 산업에서 사용

### 5.3 왜 TypeORM인가?

#### 1. TypeScript 완벽 지원
- 엔티티 정의가 TypeScript 클래스
- 타입 안정성 보장
- 데코레이터 기반 메타데이터

#### 2. Active Record vs Data Mapper
- 두 가지 패턴 모두 지원
- 프로젝트 특성에 맞게 선택 가능

#### 3. 마이그레이션 관리
- 자동 마이그레이션 생성
- 버전 관리
- 롤백 지원

#### 4. Query Builder
- 복잡한 쿼리를 타입 안전하게 작성
- SQL Injection 방지
- 가독성 높은 코드

```typescript
// Query Builder 예시
const vendors = await this.vendorRepository
  .createQueryBuilder('vendor')
  .leftJoinAndSelect('vendor.images', 'images')
  .leftJoinAndSelect('vendor.venue_detail', 'detail')
  .where('vendor.category = :category', { category: 'VENUE' })
  .andWhere('vendor.region = :region', { region: '강남구' })
  .orderBy('vendor.total_score', 'DESC')
  .limit(20)
  .getMany();
```

---

## 6. 성능 최적화 전략

### 6.1 데이터베이스 최적화

1. **인덱스 전략**
   - 자주 조회되는 컬럼에 인덱스 생성
   - 복합 인덱스로 다중 조건 쿼리 최적화
   - JSONB GIN 인덱스

2. **쿼리 최적화**
   - N+1 문제 방지 (Eager Loading, Join)
   - 필요한 컬럼만 SELECT
   - Pagination으로 대량 데이터 부하 방지

3. **연결 풀링**
   - TypeORM connection pooling
   - 최대 연결 수 제한

### 6.2 캐싱 전략 (향후)

- **Redis 도입 계획**
  - 업체 정보 (TTL: 1시간)
  - AI 추천 결과 (TTL: 10분)
  - 정책 정보 (TTL: 1일)

### 6.3 API 응답 최적화

- 응답 데이터 압축 (gzip)
- 불필요한 데이터 제거
- 조건부 요청 (ETag, Last-Modified)

---

## 7. 보안 전략

### 7.1 인증 (Authentication)

- **JWT 기반 인증**
  - Access Token (유효기간: 1일)
  - Refresh Token (유효기간: 30일, 추후 구현)

### 7.2 인가 (Authorization)

- **역할 기반 접근 제어 (RBAC)**
  - USER, VENDOR, ADMIN 역할
  - @Roles() 데코레이터로 엔드포인트별 제어

### 7.3 데이터 보안

- **SQL Injection 방지**: TypeORM Parameterized Query
- **XSS 방지**: 입력 데이터 검증 및 이스케이핑
- **비밀번호 해싱**: bcrypt (salt rounds: 10)

### 7.4 API 보안

- **CORS 설정**: 허용된 도메인만 접근
- **Rate Limiting**: DDoS 방어
- **Helmet**: HTTP 헤더 보안 강화

---

## 8. 참고 문서

- **데이터베이스 설계**: [../database/DATABASE.md](../database/DATABASE.md)
- **비즈니스 로직**: [../business/BUSINESS_LOGIC.md](../business/BUSINESS_LOGIC.md)
- **API 설계**: [../api/API_DESIGN.md](../api/API_DESIGN.md)
- **NestJS 공식 문서**: https://docs.nestjs.com
- **TypeORM 공식 문서**: https://typeorm.io

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025.11.26

