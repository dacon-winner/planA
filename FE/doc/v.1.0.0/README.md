# Plan A v1.0.0 문서

이 디렉토리는 Plan A 프로젝트 v1.0.0의 모든 개발 문서를 포함하고 있습니다.

## 📚 문서 목록

### 📖 주요 문서

1. **[implementation.md](./implementation.md)** - 전체 구현 현황
   - 프로젝트 개요
   - 현재 구현 상태
   - 기술 스택 및 아키텍처
   - 디자인 시스템
   - 컴포넌트 명세
   - 향후 개발 계획

### 📋 템플릿 문서

2. **[component-template.md](./component-template.md)** - 컴포넌트 작성 템플릿
   - 새로운 컴포넌트를 만들 때 사용
   - Props, 스타일, 테스트 등 표준 양식

3. **[feature-template.md](./feature-template.md)** - 기능 개발 템플릿
   - 새로운 기능을 기획/개발할 때 사용
   - 사용자 스토리, 화면 설계, API 명세 등

4. **[api-template.md](./api-template.md)** - API 명세 템플릿
   - API 엔드포인트를 정의할 때 사용
   - 요청/응답 형식, 에러 코드 등

## 🎯 문서 사용 가이드

### 새로운 컴포넌트 개발 시
1. `component-template.md`를 복사
2. 파일명을 `[ComponentName].md`로 변경
3. 템플릿의 모든 섹션을 채우기
4. 구현 중 업데이트

### 새로운 기능 개발 시
1. `feature-template.md`를 복사
2. 파일명을 `[feature-name].md`로 변경
3. 기획부터 배포까지 전체 과정 문서화
4. 진행 상황에 따라 체크리스트 업데이트

### API 개발 시
1. `api-template.md`를 복사하거나 직접 참고
2. 모든 엔드포인트 상세 명세
3. 에러 케이스 정의
4. 예시 코드 포함

## 📝 문서 작성 규칙

### 파일 네이밍
- 영문 소문자 사용
- 단어 구분은 하이픈(-) 사용
- 의미 있는 이름 사용

예시:
```
✅ user-authentication.md
✅ button-component.md
✅ search-feature.md

❌ UserAuthentication.md
❌ button_component.md
❌ doc1.md
```

### 문서 구조
1. **제목**: 명확하고 간결하게
2. **목차**: 긴 문서는 목차 포함
3. **섹션**: 논리적 순서로 구성
4. **코드 블록**: 언어 명시 (```typescript)
5. **표**: 데이터 비교 시 활용
6. **체크리스트**: 진행 상황 추적

### 업데이트 규칙
- 변경 사항 발생 시 즉시 문서 업데이트
- 변경 이력(Change Log) 섹션에 기록
- 날짜와 변경 내용 명시

## 📂 문서 구조

```
doc/
└── v.1.0.0/
    ├── README.md                    # 본 파일
    ├── implementation.md            # 전체 구현 현황
    ├── component-template.md        # 컴포넌트 템플릿
    ├── feature-template.md          # 기능 개발 템플릿
    ├── api-template.md              # API 명세 템플릿
    │
    ├── components/                  # 컴포넌트별 상세 문서
    │   ├── button.md
    │   ├── input.md
    │   └── ...
    │
    ├── features/                    # 기능별 상세 문서
    │   ├── user-auth.md
    │   ├── vendor-search.md
    │   └── ...
    │
    └── api/                         # API 상세 명세
        ├── auth-api.md
        ├── vendor-api.md
        └── ...
```

## 🔄 버전 관리

### 문서 버전
- 앱 버전과 동일하게 관리
- Major 버전 변경 시 새 디렉토리 생성
- 예: `v.1.0.0/`, `v.2.0.0/`

### 변경 이력 기록
모든 문서의 하단에 변경 이력 테이블 포함:

```markdown
## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-14 | 초기 작성 | - |
| 1.0.1 | 2025-11-15 | API 엔드포인트 추가 | - |
```

## 🤝 기여 가이드

### 문서 작성 시
1. 템플릿을 최대한 활용
2. 명확하고 간결한 표현 사용
3. 코드 예시 포함
4. 스크린샷이나 다이어그램 활용 (필요 시)

### 리뷰 요청 시
1. 문서 완성도 확인
2. 오타 및 문법 검사
3. 코드 예시 동작 확인
4. 링크 유효성 확인

## 📌 참고 자료

### 내부 문서
- [프로젝트 README](../../README.md)
- [개발 규칙](./../.cursor/rules/03-ui.mdc)

### 외부 문서
- [Markdown Guide](https://www.markdownguide.org/)
- [JSDoc](https://jsdoc.app/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**문서 작성일**: 2025-11-14  
**최종 수정일**: 2025-11-14  
**버전**: 1.0.0

