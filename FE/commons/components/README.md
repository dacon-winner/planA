# 공통 컴포넌트 (Common Components)

이 디렉토리는 Plan A 프로젝트에서 재사용 가능한 공통 컴포넌트들을 포함합니다.

## 📋 컴포넌트 목록

| 컴포넌트 | 설명 | 사용처 |
|----------|------|--------|
| [Badge](./badge/) | 아이콘과 텍스트를 포함한 뱃지 | MyInfo |
| [Button](./button/) | 다양한 스타일의 버튼 | Home |
| [ContentSwitcher](./content-switcher/) | 탭 메뉴 스타일의 스위처 | Home |
| [Filter](./filter/) | 필터 선택 컴포넌트 | Home |
| [Input](./input/) | 텍스트 입력 필드 | Home |
| [Radio](./radio/) | 라디오 버튼 그룹 | Home |
| [Toast](./toast-message/) | 토스트 메시지 알림 | MyInfo |
| [Toggle](./toggle/) | 토글 스위치 | Home |

## 🎯 컴포넌트 개발 표준

### 1. 파일 구조
```
component-name/
├── index.tsx          # 컴포넌트 구현
├── styles.ts          # 스타일 정의
├── prompts/           # AI 프롬프트 템플릿
│   └── prompt.101.ui.txt
└── README.md          # 컴포넌트 문서
```

### 2. 코드 스타일

#### JSDoc 주석
```typescript
/**
 * ComponentName 컴포넌트
 * 컴포넌트에 대한 간단한 설명
 *
 * @example
 * <ComponentName prop="value" />
 */
```

#### Props 인터페이스
```typescript
export interface ComponentNameProps {
  /** prop 설명 */
  propName: PropType;
}
```

#### 컴포넌트 구현
```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  ...otherProps
}) => {
  // 컴포넌트 로직
  return (
    // JSX
  );
};
```

### 3. 스타일 정의

- `StyleSheet.create` 사용
- 디자인 토큰 활용
- 논리적 그룹화

### 4. 접근성

- 시맨틱 HTML 사용
- 적절한 ARIA 속성
- 키보드 내비게이션 지원

## 🔍 현재 상태

- **총 컴포넌트 수**: 8개
- **모두 사용 중**: ✅ (사용되지 않는 컴포넌트 없음)
- **표준 준수**: 부분적 (일부 컴포넌트에서 개선 필요)

## 📈 개선 제안

### 우선순위 1: 표준화
- [ ] JSDoc 주석 표준화
- [ ] Props 타입 정의 일관화
- [ ] Import 스타일 통일 (double quotes)

### 우선순위 2: 문서화
- [ ] 각 컴포넌트 README.md 보완
- [ ] 사용 예시 추가
- [ ] Props API 문서화

### 우선순위 3: 품질 향상
- [ ] 접근성 개선
- [ ] 타입 안전성 강화
- [ ] 성능 최적화
