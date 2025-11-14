# API 명세서 템플릿

> 이 문서는 API 엔드포인트를 정의할 때 사용하는 표준 템플릿입니다.

## API 명세: [API Name]

### 기본 정보

| 항목 | 내용 |
|------|------|
| **API명** | [API Name] |
| **버전** | v1.0.0 |
| **Base URL** | `https://api.plana.com/v1` |
| **인증 방식** | JWT Bearer Token |
| **작성일** | YYYY-MM-DD |
| **상태** | 📋 설계 / 🚧 개발 / ✅ 완료 |

---

## 목차

1. [인증](#인증)
2. [공통 사항](#공통-사항)
3. [엔드포인트 목록](#엔드포인트-목록)
4. [에러 코드](#에러-코드)

---

## 인증

### JWT Token
모든 보호된 API는 Authorization 헤더에 JWT 토큰이 필요합니다.

```
Authorization: Bearer <token>
```

### Token 획득
```typescript
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

---

## 공통 사항

### 요청 헤더
```
Content-Type: application/json
Authorization: Bearer <token>
Accept: application/json
```

### 응답 형식

#### 성공 응답
```typescript
{
  "success": true,
  "data": {
    // 실제 데이터
  },
  "message": "Success message",
  "timestamp": "2025-11-14T12:00:00Z"
}
```

#### 에러 응답
```typescript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      // 추가 에러 정보
    }
  },
  "timestamp": "2025-11-14T12:00:00Z"
}
```

### 페이지네이션
```typescript
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 엔드포인트 목록

### 1. [카테고리명]

#### 1.1 [엔드포인트명]

**Endpoint**: `GET /api/endpoint`

**설명**: 이 API가 하는 일에 대한 설명

**인증**: 필요 / 불필요

**요청**

- **Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|----------|------|------|------|------|
| `param1` | `string` | ✅ | 파라미터 설명 | `"value"` |
| `param2` | `number` | ❌ | 파라미터 설명 | `10` |

- **Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 | 예시 |
|----------|------|------|------|------|
| `id` | `string` | ✅ | 리소스 ID | `"123"` |

- **Request Body**

```typescript
{
  "field1": "string",
  "field2": number,
  "field3": {
    "nestedField": "string"
  }
}
```

**응답**

- **200 OK**

```typescript
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example",
    "createdAt": "2025-11-14T12:00:00Z"
  }
}
```

- **400 Bad Request**

```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid parameter value"
  }
}
```

- **401 Unauthorized**

```typescript
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

- **404 Not Found**

```typescript
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

**예시**

```bash
# Request
curl -X GET \
  'https://api.plana.com/v1/endpoint?param1=value' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json'

# Response
{
  "success": true,
  "data": {
    ...
  }
}
```

---

#### 1.2 [엔드포인트명]

**Endpoint**: `POST /api/endpoint`

**설명**: 이 API가 하는 일에 대한 설명

**인증**: 필요

**요청**

- **Request Body**

```typescript
{
  "field1": "string",
  "field2": number
}
```

**필드 설명**

| 필드 | 타입 | 필수 | 설명 | 제약사항 |
|------|------|------|------|----------|
| `field1` | `string` | ✅ | 필드 설명 | 최대 100자 |
| `field2` | `number` | ✅ | 필드 설명 | 0 이상 |

**응답**

- **201 Created**

```typescript
{
  "success": true,
  "data": {
    "id": "new-id-123",
    "message": "Resource created successfully"
  }
}
```

- **400 Bad Request**
- **401 Unauthorized**
- **422 Unprocessable Entity**

```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "field1": ["Field is required"],
      "field2": ["Must be a positive number"]
    }
  }
}
```

**예시**

```bash
# Request
curl -X POST \
  'https://api.plana.com/v1/endpoint' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "field1": "value",
    "field2": 42
  }'

# Response
{
  "success": true,
  "data": {
    "id": "new-id-123"
  }
}
```

---

#### 1.3 [엔드포인트명]

**Endpoint**: `PUT /api/endpoint/:id`

**설명**: 리소스 업데이트

**인증**: 필요

**요청**

- **Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `id` | `string` | ✅ | 리소스 ID |

- **Request Body**

```typescript
{
  "field1": "string",
  "field2": number
}
```

**응답**

- **200 OK**
- **400 Bad Request**
- **401 Unauthorized**
- **404 Not Found**

---

#### 1.4 [엔드포인트명]

**Endpoint**: `DELETE /api/endpoint/:id`

**설명**: 리소스 삭제

**인증**: 필요

**요청**

- **Path Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `id` | `string` | ✅ | 리소스 ID |

**응답**

- **204 No Content**
- **401 Unauthorized**
- **404 Not Found**

---

## 에러 코드

### 인증 관련 (4xx)

| 코드 | HTTP Status | 설명 | 해결 방법 |
|------|-------------|------|-----------|
| `UNAUTHORIZED` | 401 | 인증되지 않은 요청 | 로그인 후 토큰 발급 |
| `TOKEN_EXPIRED` | 401 | 토큰 만료 | Refresh 토큰으로 재발급 |
| `FORBIDDEN` | 403 | 권한 없음 | 적절한 권한 획득 |

### 요청 관련 (4xx)

| 코드 | HTTP Status | 설명 | 해결 방법 |
|------|-------------|------|-----------|
| `INVALID_PARAMETER` | 400 | 잘못된 파라미터 | 파라미터 확인 |
| `VALIDATION_ERROR` | 422 | 유효성 검증 실패 | 입력값 확인 |
| `NOT_FOUND` | 404 | 리소스를 찾을 수 없음 | ID 확인 |
| `DUPLICATE` | 409 | 중복된 리소스 | 고유값 확인 |

### 서버 관련 (5xx)

| 코드 | HTTP Status | 설명 | 해결 방법 |
|------|-------------|------|-----------|
| `INTERNAL_ERROR` | 500 | 서버 내부 오류 | 관리자 문의 |
| `SERVICE_UNAVAILABLE` | 503 | 서비스 이용 불가 | 잠시 후 재시도 |

---

## Rate Limiting

### 제한 사항
- 인증된 사용자: 분당 60회
- 비인증 사용자: 분당 20회

### 응답 헤더
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1699876543
```

### 초과 시 응답
```typescript
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

---

## 버전 관리

### 버전 정책
- URL 경로에 버전 포함: `/v1/endpoint`
- 하위 호환성 유지
- Deprecated API는 6개월 전 공지

### 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v1.0.0 | 2025-11-14 | 초기 버전 |

---

## 테스트

### Postman Collection
[Postman Collection 링크]()

### 테스트 환경
- Development: `https://dev-api.plana.com/v1` 예정
- Staging: `https://staging-api.plana.com/v1` 예정
- Production: `https://api.plana.com/v1` 예정

---

## 참고 자료

- [Swagger/OpenAPI 문서]()
- [API 가이드]()
- [SDK 문서]()

