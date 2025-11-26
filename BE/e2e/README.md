# Playwright E2E Testing for PlanA Backend

## 📚 개요

이 디렉토리는 Playwright를 사용한 E2E (End-to-End) 테스트를 포함합니다.

## 🗂️ 테스트 구조

```
e2e/
├── health.spec.ts       # Health Check API 테스트
├── database.spec.ts     # 데이터베이스 통합 테스트
└── README.md           # 이 파일
```

## 🚀 테스트 실행

### 기본 테스트 실행
```bash
npm test
```

### UI 모드로 테스트 (디버깅에 유용)
```bash
npm run test:ui
```

### 브라우저를 띄워서 테스트
```bash
npm run test:headed
```

### 디버그 모드
```bash
npm run test:debug
```

### 테스트 리포트 보기
```bash
npm run test:report
```

## 📝 테스트 작성 가이드

### 기본 구조
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ request }) => {
    const response = await request.get('/endpoint');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('success', true);
  });
});
```

### API 테스트 예제
```typescript
// GET 요청
const response = await request.get('/users');

// POST 요청
const response = await request.post('/users', {
  data: {
    email: 'test@example.com',
    name: 'Test User',
  },
});

// PUT 요청
const response = await request.put('/users/123', {
  data: {
    name: 'Updated Name',
  },
});

// DELETE 요청
const response = await request.delete('/users/123');
```

### 헤더 추가
```typescript
const response = await request.get('/protected', {
  headers: {
    'Authorization': 'Bearer token123',
  },
});
```

### 쿼리 파라미터
```typescript
const response = await request.get('/users', {
  params: {
    page: 1,
    limit: 10,
  },
});
```

## 🔧 설정

테스트 설정은 `playwright.config.ts`에서 관리됩니다.

### 주요 설정
- **Base URL**: `http://localhost:3000`
- **Timeout**: 30초
- **Retry**: CI 환경에서 2회 재시도
- **Web Server**: 테스트 실행 전 자동으로 서버 시작

## 📊 테스트 리포트

테스트 실행 후 다음 위치에 리포트가 생성됩니다:
- HTML 리포트: `playwright-report/`
- JSON 결과: `playwright-report/results.json`
- 스크린샷/비디오: `playwright-artifacts/`

## ✅ 테스트 작성 체크리스트

- [ ] 테스트 이름이 명확하고 설명적인가?
- [ ] 응답 상태 코드를 확인하는가?
- [ ] 응답 형식이 예상과 일치하는가?
- [ ] 에러 케이스를 테스트하는가?
- [ ] 데이터 검증이 충분한가?

## 🎯 모범 사례

1. **독립적인 테스트**: 각 테스트는 다른 테스트에 의존하지 않아야 합니다.
2. **명확한 이름**: 테스트 이름으로 무엇을 테스트하는지 알 수 있어야 합니다.
3. **AAA 패턴**: Arrange (준비), Act (실행), Assert (검증)
4. **데이터 정리**: 테스트 후 생성된 데이터는 정리합니다.
5. **재사용 가능한 헬퍼**: 공통 로직은 헬퍼 함수로 추출합니다.

## 🐛 디버깅 팁

### 실패한 테스트 디버깅
```bash
# 마지막 실패 테스트만 실행
npm run test:debug -- --last-failed

# 특정 테스트만 실행
npm test -- health.spec.ts

# 특정 테스트 케이스만 실행
npm test -- -g "should return OK status"
```

### 로그 확인
테스트 실행 중 서버 로그는 자동으로 수집됩니다.
실패 시 `playwright-report`에서 확인할 수 있습니다.

## 📚 참고 자료

- [Playwright 공식 문서](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

