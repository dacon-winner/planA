# API 설계 문서

> **작성일**: 2025.11.26  
> **작성자**: 김동언  
> **버전**: 1.0.0

---

## 📋 목차

1. [API 설계 원칙](#1-api-설계-원칙)
2. [응답 형식](#2-응답-형식)
3. [엔드포인트 명세](#3-엔드포인트-명세)
4. [인증 및 인가](#4-인증-및-인가)
5. [에러 처리](#5-에러-처리)
6. [페이지네이션](#6-페이지네이션)

---

## 1. API 설계 원칙

### 1.1 RESTful 원칙

- **리소스 중심 설계**: 명사형 URL 사용
- **HTTP 메서드 적절히 활용**: GET, POST, PATCH, DELETE
- **상태 코드 명확히 사용**: 2xx, 4xx, 5xx
- **무상태성**: 각 요청은 독립적

### 1.2 URL 명명 규칙

```
[기본 형식]
/api/v1/{리소스}/{id}/{하위리소스}

[예시]
GET    /api/v1/plans              # 플랜 목록
POST   /api/v1/plans              # 플랜 생성
GET    /api/v1/plans/:id          # 플랜 상세
PATCH  /api/v1/plans/:id          # 플랜 수정
DELETE /api/v1/plans/:id          # 플랜 삭제
GET    /api/v1/plans/:id/items    # 플랜 항목 목록
```

**규칙:**
- 복수형 명사 사용 (`users`, `vendors`, `plans`)
- 소문자 및 하이픈 사용 (`kebab-case`)
- 계층 구조 반영 (최대 3단계)
- 동사 사용 지양 (특수 액션 제외)

### 1.3 버전 관리

- **URL 버전**: `/api/v1/...`, `/api/v2/...`
- **하위 호환성**: 기존 API 유지하며 새 버전 추가
- **Deprecation**: 사전 공지 후 구버전 폐기

---

## 2. 응답 형식

### 2.1 성공 응답

```json
{
  "success": true,
  "data": {
    // 실제 데이터
  },
  "timestamp": "2025-11-26T12:00:00.000Z"
}
```

**예시 - 단일 리소스:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "강남 웨딩홀",
    "category": "VENUE",
    "region": "강남구",
    "total_score": 4.5
  },
  "timestamp": "2025-11-26T12:00:00.000Z"
}
```

### 2.2 에러 응답

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적인 에러 메시지",
    "details": {
      // 추가 정보 (선택)
    }
  },
  "timestamp": "2025-11-26T12:00:00.000Z",
  "path": "/api/v1/endpoint"
}
```

**예시:**
```json
{
  "success": false,
  "error": {
    "code": "VENDOR_NOT_FOUND",
    "message": "요청하신 업체를 찾을 수 없습니다.",
    "details": {
      "vendorId": "invalid-uuid-here"
    }
  },
  "timestamp": "2025-11-26T12:00:00.000Z",
  "path": "/api/v1/vendors/invalid-uuid-here"
}
```

### 2.3 페이지네이션 응답

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

---

## 3. 엔드포인트 명세

### 3.1 인증 (Authentication)

#### **POST** `/api/v1/auth/register`
회원가입

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123!",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "wedding_date": "2026-05-15",
  "preferred_region": "강남구",
  "budget_limit": 10000000
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "name": "홍길동"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "..."
}
```

---

#### **POST** `/api/v1/auth/login`
로그인

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "access_token": "...",
    "user": { ... }
  },
  "timestamp": "..."
}
```

---

#### **GET** `/api/v1/auth/me`
현재 사용자 정보 조회 (인증 필요)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "홍길동",
    "wedding_date": "2026-05-15"
  },
  "timestamp": "..."
}
```

---

### 3.2 업체 (Vendors)

#### **GET** `/api/v1/vendors`
업체 목록 조회 (페이지네이션, 필터링)

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지 크기 (기본값: 20, 최대: 100)
- `category`: 카테고리 필터 (VENUE, STUDIO, DRESS, MAKEUP)
- `region`: 지역 필터
- `sort`: 정렬 기준 (score, rating, recent)

**Example:**
```
GET /api/v1/vendors?page=1&limit=20&category=STUDIO&region=강남구&sort=score
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "...",
        "name": "A 스튜디오",
        "category": "STUDIO",
        "region": "강남구",
        "total_score": 4.8,
        "thumbnail_url": "...",
        "badges": ["인기업체", "가성비"]
      }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  },
  "timestamp": "..."
}
```

---

#### **GET** `/api/v1/vendors/:id`
업체 상세 조회

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "A 스튜디오",
    "category": "STUDIO",
    "region": "강남구",
    "address": "서울시 강남구 ...",
    "phone": "02-1234-5678",
    "introduction": "...",
    "operating_hours": "평일 10:00-18:00",
    "naver_rating": 4.5,
    "total_score": 4.7,
    "review_count": 123,
    "images": [
      {
        "id": "...",
        "image_url": "...",
        "role": "THUMBNAIL"
      }
    ],
    "service_items": [
      {
        "id": "...",
        "name": "베이직 패키지",
        "price": 800000
      }
    ]
  },
  "timestamp": "..."
}
```

---

### 3.3 AI 추천 (AI Recommendations)

#### **POST** `/api/v1/ai/recommend`
AI 맞춤 추천 (인증 필요)

**Request Body:**
```json
{
  "category": "STUDIO",
  "preferences": ["모던", "자연광", "가성비"],
  "count": 4
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "vendor_id": "...",
        "name": "A 스튜디오",
        "reason": "모던한 인테리어와 자연광 촬영에 최적화된 공간입니다.",
        "score": 0.95
      }
    ]
  },
  "timestamp": "..."
}
```

---

#### **POST** `/api/v1/ai/plan/generate`
AI 플랜 자동 생성 (인증 필요)

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "plan_id": "...",
    "title": "홍길동님의 AI 추천 플랜",
    "total_budget": 10000000,
    "is_ai_generated": true,
    "items": [
      {
        "category": "VENUE",
        "vendor_name": "...",
        "selection_reason": "..."
      }
    ]
  },
  "timestamp": "..."
}
```

---

### 3.4 플랜 (Plans)

#### **GET** `/api/v1/plans`
내 플랜 목록 (인증 필요)

**Response:** `200 OK`

---

#### **POST** `/api/v1/plans`
플랜 생성 (인증 필요)

**Request Body:**
```json
{
  "title": "나의 웨딩 플랜",
  "total_budget": 10000000
}
```

**Response:** `201 Created`

---

#### **GET** `/api/v1/plans/:id`
플랜 상세 조회 (인증 필요)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "나의 웨딩 플랜",
    "total_budget": 10000000,
    "is_ai_generated": false,
    "items": [
      {
        "id": "...",
        "vendor": {
          "id": "...",
          "name": "...",
          "category": "VENUE"
        },
        "service_item": null,
        "source": "USER_SELECT",
        "is_confirmed": true,
        "order_index": 0
      }
    ],
    "created_at": "..."
  },
  "timestamp": "..."
}
```

---

#### **POST** `/api/v1/plans/:id/items`
플랜 항목 추가 (인증 필요)

**Request Body:**
```json
{
  "vendor_id": "...",
  "service_item_id": "...", // 선택
  "source": "USER_SELECT"
}
```

**Response:** `201 Created`

---

### 3.5 예약 (Reservations)

#### **POST** `/api/v1/reservations`
예약 생성 (인증 필요)

**Request Body:**
```json
{
  "vendor_id": "...",
  "plan_id": "...", // 선택
  "reservation_date": "2025-12-01",
  "reservation_time": "14:00",
  "visitor_name": "홍길동",
  "visitor_phone": "010-1234-5678",
  "visitor_count": 2,
  "memo": "자연광 촬영 희망"
}
```

**Response:** `201 Created`

---

#### **PATCH** `/api/v1/reservations/:id/status`
예약 상태 변경 (인증 필요)

**Request Body:**
```json
{
  "status": "CONFIRMED",
  "deposit_amount": 500000 // CONFIRMED로 변경 시 필수
}
```

**Response:** `200 OK`

---

### 3.6 리뷰 (Reviews)

#### **POST** `/api/v1/reviews`
리뷰 작성 (인증 필요)

**Request Body:**
```json
{
  "vendor_id": "...",
  "rating": 5,
  "content": "정말 만족스러웠습니다!",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

**Response:** `201 Created`

---

## 4. 인증 및 인가

### 4.1 JWT 인증

**헤더:**
```
Authorization: Bearer {access_token}
```

**토큰 구조:**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "iat": 1732600000,
  "exp": 1732686400
}
```

### 4.2 Public 엔드포인트

인증 불필요한 엔드포인트:
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/vendors`
- `GET /api/v1/vendors/:id`
- `GET /api/v1/policies`

---

## 5. 에러 처리

### 5.1 HTTP 상태 코드

| 코드 | 설명 | 예시 |
|------|------|------|
| 200 | OK | 조회 성공 |
| 201 | Created | 생성 성공 |
| 204 | No Content | 삭제 성공 |
| 400 | Bad Request | 잘못된 요청 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스 없음 |
| 409 | Conflict | 중복/충돌 |
| 500 | Internal Server Error | 서버 에러 |

### 5.2 에러 코드 체계

| 범위 | 용도 | 예시 |
|------|------|------|
| 1000-1999 | 인증/인가 | `AUTH_INVALID_TOKEN`, `AUTH_EXPIRED` |
| 2000-2999 | 사용자 | `USER_NOT_FOUND`, `USER_EMAIL_DUPLICATE` |
| 3000-3999 | 업체 | `VENDOR_NOT_FOUND`, `VENDOR_INACTIVE` |
| 4000-4999 | 플랜 | `PLAN_NOT_FOUND`, `PLAN_ITEM_INVALID` |
| 5000-5999 | 예약 | `RESERVATION_CONFLICT`, `RESERVATION_CANCELLED` |
| 6000-6999 | 리뷰 | `REVIEW_NOT_ALLOWED`, `REVIEW_DUPLICATE` |
| 9000-9999 | 시스템 | `INTERNAL_ERROR`, `DATABASE_ERROR` |

---

## 6. 페이지네이션

### 6.1 커서 기반 페이지네이션

**Request:**
```
GET /api/v1/vendors?page=2&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "meta": {
      "page": 2,
      "limit": 20,
      "total": 150,
      "totalPages": 8,
      "hasPrev": true,
      "hasNext": true
    }
  },
  "timestamp": "..."
}
```

### 6.2 정렬

**Query Parameter:**
```
?sort=field:order
```

**예시:**
```
GET /api/v1/vendors?sort=total_score:desc
GET /api/v1/vendors?sort=created_at:asc
```

---

## 7. 참고 문서

- **비즈니스 로직**: [../business/BUSINESS_LOGIC.md](../business/BUSINESS_LOGIC.md)
- **데이터베이스**: [../database/DATABASE.md](../database/DATABASE.md)
- **아키텍처**: [../architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md)
- **Swagger 문서**: http://localhost:3000/api-docs

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025.11.26

