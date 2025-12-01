# 업체 재생성 API 테스트 가이드

## API 엔드포인트
```
POST /api/v1/plans/regenerate-vendor
```

## 요청 파라미터

### Query Parameters
- `planId` (필수): 플랜 ID (UUID)
- `vendorId` (필수): 교체할 업체 ID (UUID)

### Headers
- `Authorization`: Bearer {JWT_TOKEN}

## 테스트 시나리오

### 사전 준비
1. 로그인하여 JWT 토큰 획득
2. 플랜이 있는지 확인 (없으면 생성)
3. 플랜에 업체가 포함되어 있는지 확인

### 1. Swagger를 통한 테스트
1. 브라우저에서 `http://localhost:3001/api-docs` 접속
2. **Plans** 섹션 찾기
3. **POST /plans/regenerate-vendor** 엔드포인트 클릭
4. "Try it out" 버튼 클릭
5. 파라미터 입력:
   - `planId`: 플랜 ID 입력
   - `vendorId`: 교체할 업체 ID 입력
6. "Authorize" 버튼으로 JWT 토큰 입력
7. "Execute" 버튼 클릭

### 2. cURL을 통한 테스트

```bash
# 1. 로그인
curl -X POST http://localhost:3001/api/v1/users/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# 응답에서 access_token 복사

# 2. 플랜 목록 조회
curl -X GET http://localhost:3001/api/v1/plans \
  -H "Authorization: Bearer {YOUR_JWT_TOKEN}"

# 응답에서 plan_id 확인

# 3. 플랜 상세 조회 (업체 목록 확인)
curl -X GET http://localhost:3001/api/v1/plans/{PLAN_ID} \
  -H "Authorization: Bearer {YOUR_JWT_TOKEN}"

# 응답에서 vendor_id 확인

# 4. 업체 재생성 API 호출
curl -X POST "http://localhost:3001/api/v1/plans/regenerate-vendor?planId={PLAN_ID}&vendorId={VENDOR_ID}" \
  -H "Authorization: Bearer {YOUR_JWT_TOKEN}" \
  -H "Content-Type: application/json"
```

## 예상 응답

### 성공 (200)
```json
{
  "message": "업체가 성공적으로 교체되었습니다.",
  "data": {
    "plan_item_id": "550e8400-e29b-41d4-a716-446655440003",
    "old_vendor": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "기존 스튜디오",
      "category": "스튜디오"
    },
    "new_vendor": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "새로운 스튜디오",
      "category": "스튜디오",
      "selection_reason": "예산 범위 내에서 가장 합리적인 가격대의 업체로, 선호하시는 강남 지역에 위치하여 접근성이 좋습니다..."
    }
  }
}
```

### 에러 응답

#### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

#### 404 Not Found (플랜을 찾을 수 없음)
```json
{
  "statusCode": 404,
  "message": "플랜을 찾을 수 없습니다. (planId: xxx)"
}
```

#### 404 Not Found (업체를 찾을 수 없음)
```json
{
  "statusCode": 404,
  "message": "업체를 찾을 수 없습니다. (vendorId: xxx)"
}
```

#### 400 Bad Request (업체가 플랜에 포함되어 있지 않음)
```json
{
  "statusCode": 400,
  "message": "해당 업체는 플랜에 포함되어 있지 않습니다."
}
```

#### 400 Bad Request (예약이 있는 업체)
```json
{
  "statusCode": 400,
  "message": "예약이 있는 업체는 변경할 수 없습니다. 먼저 예약을 취소해주세요."
}
```

#### 400 Bad Request (추천 불가능)
```json
{
  "statusCode": 400,
  "message": "예산 내에서 추천 가능한 업체가 없습니다."
}
```

## 동작 원리

1. **검증 단계**
   - 플랜 존재 및 소유권 확인
   - 업체 존재 확인
   - 업체가 플랜에 포함되어 있는지 확인
   - 예약 여부 확인

2. **데이터 수집**
   - users_info에서 결혼 데이터 조회 (wedding_date, preferred_region, budget_limit)
   - 현재 플랜의 모든 업체 조회
   - 현재 총 예산 계산 (교체 대상 제외)

3. **AI 추천**
   - 해당 카테고리의 후보 업체 조회 (ai_resource)
   - 이미 플랜에 포함된 업체 제외
   - 예산 범위 내의 업체만 선택
   - OpenAI API로 최적 업체 선택

4. **업데이트**
   - plan_item의 vendor_id 교체
   - selection_reason 업데이트
   - service_item_id null로 리셋

## 주의사항

- OpenAI API 키가 설정되어 있어야 합니다 (.env 파일)
- ai_resource 테이블에 충분한 데이터가 있어야 합니다
- 예산 범위 내의 업체가 없으면 추천이 불가능합니다
- 예약이 있는 업체는 교체할 수 없습니다

