# Modal 컴포넌트 명세서

> 이 문서는 Modal 컴포넌트의 사용법과 명세를 정의합니다.

## 컴포넌트명: Modal

### 기본 정보

| 항목 | 내용 |
|------|------|
| **컴포넌트명** | Modal |
| **위치** | `commons/components/modal/` |
| **작성일** | 2025-11-29 |
| **작성자** | - |
| **버전** | 1.1.0 |
| **상태** | ✅ 완료 |

---

## 개요

### 목적
Modal 컴포넌트는 피그마 디자인 시스템을 기반으로 한 재사용 가능한 모달 창입니다. ModalProvider와 함께 사용되어 백드롭을 포함하지 않으며, 제목, 설명, 가변 컨텐츠, 그리고 하단 버튼 영역으로 구성됩니다.

### 사용 예시
```typescript
import { Modal } from '@/commons/components/modal';
import { Input } from '@/commons/components/input';
import { Dropdown } from '@/commons/components/dropdown';

function ExampleModal() {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Modal
      title="새 플랜 만들기"
      description="새 플랜 이름과 생성 방법을 선택해주세요"
      buttons={{
        left: {
          label: '취소',
          onPress: () => console.log('취소됨'),
        },
        right: {
          label: '생성하기',
          onPress: () => console.log('생성됨'),
          disabled: !inputValue.trim(),
        },
      }}
    >
      <Input
        label="플랜 이름"
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="플랜 이름을 입력하세요"
      />

      <Dropdown
        value={selectedValue}
        options={[
          { value: 'ai', label: 'AI 플랜 생성' },
          { value: 'manual', label: '직접 업체 추가' },
        ]}
        onChange={setSelectedValue}
        placeholder="생성 방법을 선택하세요"
      />
    </Modal>
  );
}
```

---

## Props 명세

### Required Props
없음 - 모든 Props가 선택적입니다.

### Optional Props

| Prop 이름 | 타입 | 기본값 | 설명 | 예시 |
|-----------|------|--------|------|------|
| `title` | `string` | `undefined` | 상단 타이틀 텍스트 | `"새 플랜 만들기"` |
| `description` | `string` | `undefined` | 타이틀 하단 설명 텍스트 | `"새 플랜 이름과 생성 방법을 선택해주세요"` |
| `children` | `ReactNode` | `undefined` | Input, Dropdown 등 가변 컨텐츠 | `<Input />`, `<Dropdown />` |
| `buttons` | `ModalButtonsProps` | `undefined` | 하단 버튼 설정 객체 | 아래 참고 |

### Type Definitions

```typescript
interface ModalButtonConfig {
  label: string;      // 버튼 텍스트
  onPress: () => void; // 버튼 클릭 핸들러
  disabled?: boolean; // 버튼 비활성화 상태
}

interface ModalButtonsProps {
  left?: ModalButtonConfig;  // 왼쪽 버튼 (취소/닫기)
  right?: ModalButtonConfig; // 오른쪽 버튼 (확인/저장)
}

interface ModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  buttons?: ModalButtonsProps;
}
```

---

## 스타일 명세

### 사용하는 디자인 토큰

#### Colors
```typescript
colors.black['black-1']  // 모달 배경색 (#ffffff)
colors.blue['blue-6']     // 제목 색상 (#1f2937)
colors.blue['blue-5']     // 설명 색상 (#6b7280)
colors.modal.shadow       // 모달 그림자 색상 (#800C3A)
colors.secondary['secondary-600'] // 아이콘 색상 (#8E7982)
colors.root.red           // 에러 아이콘 색상 (#fb2c36)
colors.root.brand         // 브랜드 텍스트 색상 (#ff5c8d)
colors.brown['brown-6']   // 일정 정보 텍스트 색상 (#524a4e)
```

#### Typography
피그마에서 직접 정의된 값 사용:
```typescript
// 제목
fontFamily: 'Pretendard Variable'
fontWeight: '600'
fontSize: 15.64357852935791px
lineHeight: 15.64357852935791px
letterSpacing: -0.38192328810691833px

// 설명
fontFamily: 'Pretendard Variable'
fontWeight: '400'
fontSize: 12.167227745056152px
lineHeight: 17.38175392150879px
letterSpacing: -0.1307026445865631px
```

#### Spacing
```typescript
// 컨테이너 패딩
paddingVertical: 21px
paddingHorizontal: 30px

// 내부 간격
marginBottom: 8px  // 제목-설명 간격
marginBottom: 16px // 설명 컨테이너 하단 간격
marginBottom: 20px // 컨텐츠-버튼 간격
gap: 8px           // 버튼 간 간격
```

#### Shadow
```typescript
// Drop shadow (피그마: X:0, Y:0, Blur:20, Spread:-3.48, Color:#800C3A 10%)
shadowColor: colors.modal.shadow  // #800C3A
shadowOffset: { width: 0, height: 0 }
shadowOpacity: 0.1  // 10% opacity
shadowRadius: 20     // Blur: 20
elevation: 20        // Android shadow
```

### 스타일 클래스

```typescript
// styles.ts
export const styles = StyleSheet.create({
  /* 컨테이너 */
  'container': {
    backgroundColor: colors.black['black-1'],
    borderRadius: 16,
    paddingVertical: 21,
    paddingHorizontal: 30,
    width: 345,
    alignSelf: 'center',
  },

  /* 텍스트 */
  'title': { /* 제목 스타일 */ },
  'description': { /* 설명 스타일 */ },

  /* 컨텐츠 */
  'content': { /* 컨텐츠 영역 스타일 */ },

  /* 버튼 영역 */
  'buttonContainer': { /* 버튼 컨테이너 스타일 */ },
  'leftButton': { /* 왼쪽 버튼 스타일 */ },
  'rightButton': { /* 오른쪽 버튼 스타일 */ },
  'buttonGap': { /* 버튼 간격 스타일 */ },
  'fullWidthButton': { /* 단일 버튼일 때 전체 너비 스타일 */ },
});

// 아이콘 색상 상수 (StyleSheet 외부에서 export)
export const iconColors = {
  'plan-info-icon': colors.secondary['secondary-600'], // #8E7982
  'error-icon': colors.root.red, // #fb2c36
} as const;
```

---

## 상태 관리

### 내부 상태
Modal 컴포넌트는 상태를 관리하지 않습니다. 모든 상태는 부모 컴포넌트에서 관리됩니다.

### 상태 설명
- 버튼의 `disabled` 상태는 `buttons` prop을 통해 외부에서 주입받습니다.
- 컨텐츠 영역의 상태는 `children`으로 전달된 컴포넌트들이 자체적으로 관리합니다.

---

## 동작 명세

### 사용자 인터랙션

1. **버튼 클릭**
   - 트리거: 사용자가 버튼을 터치할 때
   - 동작: `buttons.left.onPress` 또는 `buttons.right.onPress` 함수 실행
   - 결과: 부모 컴포넌트에서 정의한 동작 수행

### 생명주기
Modal 컴포넌트는 별도의 생명주기 로직을 가지고 있지 않습니다.

---

## 접근성 (Accessibility)

### 스크린 리더 지원
```typescript
<Modal
  accessible={true}
  accessibilityLabel="플랜 생성 모달"
  accessibilityHint="플랜 이름과 생성 방법을 입력하고 생성 버튼을 눌러주세요"
/>
```

### 키보드 네비게이션
- Modal 내부의 Input, Dropdown, Button 컴포넌트들이 자체적으로 키보드 네비게이션을 지원합니다.
- Tab 키: 컨텐츠 영역과 버튼 사이 이동
- Enter/Space 키: 버튼 활성화

---

## 에러 처리

### 예상 에러 케이스

1. **버튼 핸들러 누락**
   - 발생 조건: `buttons.left.onPress` 또는 `buttons.right.onPress`가 undefined일 때
   - 처리 방법: 컴포넌트에서 핸들러 존재 여부 확인 후 실행
   - 사용자 피드백: 버튼 클릭 시 아무 동작 없음 (런타임 에러 방지)

2. **빈 버튼 레이블**
   - 발생 조건: `buttons.left.label` 또는 `buttons.right.label`이 빈 문자열일 때
   - 처리 방법: 빈 문자열 표시
   - 사용자 피드백: 빈 버튼 표시 (UX 개선 필요시 부모에서 검증)

---

## 테스트

### 단위 테스트

```typescript
describe('Modal', () => {
  it('should render title and description', () => {
    // 제목과 설명이 올바르게 렌더링되는지 테스트
  });

  it('should render children content', () => {
    // children이 올바르게 렌더링되는지 테스트
  });

  it('should render buttons correctly', () => {
    // 버튼이 올바르게 렌더링되는지 테스트
  });

  it('should handle button press', () => {
    // 버튼 클릭 핸들러가 올바르게 호출되는지 테스트
  });
});
```

### 테스트 체크리스트

- [ ] 기본 렌더링 (제목, 설명, 컨텐츠, 버튼)
- [ ] 버튼 상태 관리 (disabled, onPress)
- [ ] 레이아웃 검증 (컨테이너 크기, 패딩, 간격)
- [ ] 접근성 지원
- [ ] 에러 케이스 처리

---

## 성능 고려사항

### 최적화 포인트
- memo 사용 여부: 필요시 React.memo 적용 가능
- useMemo 사용: 스타일 객체 최적화 고려 가능
- useCallback 사용: 버튼 핸들러 최적화 필요시 부모 컴포넌트에서 적용

### 주의사항
- Modal 컴포넌트 자체는 가벼움
- children으로 전달되는 컴포넌트들의 성능에 따라 전체 성능 결정
- 불필요한 re-render 방지를 위해 부모 컴포넌트에서 적절한 memoization 적용 권장

---

## 의존성

### 필수 라이브러리
```json
{
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

### 내부 의존성
- `@/commons/components/button` - Button 컴포넌트
- `@/commons/components/input` - Input 컴포넌트 (특화 모달에서 사용)
- `@/commons/components/dropdown` - Dropdown 컴포넌트 (특화 모달에서 사용)
- `@/commons/enums/color` - 색상 토큰
- `@/commons/enums/typography` - 타이포그래피 토큰 (직접 값 사용)
- `@/commons/providers/modal/modal.provider` - ModalProvider (모달 상태 관리)
- `lucide-react-native` - 아이콘 컴포넌트 (특화 모달에서 사용)

---

## 특화 모달 컴포넌트

기본 Modal 컴포넌트를 기반으로 한 특화 모달 컴포넌트들이 제공됩니다.

### EditModal
- **위치**: `commons/components/modal/EditModal/`
- **피그마 노드ID**: 4188:8192
- **용도**: 정보 수정 확인 모달
- **특징**: 일정 정보(날짜, 장소, 예산) 표시 및 유지/수정 선택

### ErrorModal
- **위치**: `commons/components/modal/ErrorModal/`
- **피그마 노드ID**: 4188:8190
- **용도**: 에러 메시지 표시 모달
- **특징**: ShieldAlert 아이콘 및 브랜드 컬러 강조 텍스트

### NewPlanModal
- **위치**: `commons/components/modal/NewPlanModal/`
- **피그마 노드ID**: 4188:8191
- **용도**: 새 플랜 생성 모달
- **특징**: 플랜 이름 입력 및 생성 방법 선택

### PlanAddModal
- **위치**: `commons/components/modal/PlanAddModal/`
- **피그마 노드ID**: 4188:8189
- **용도**: 플랜에 서비스 추가 모달
- **특징**: 플랜 선택 드롭다운 및 일정 정보 표시

### 사용 예시
```typescript
import { EditModal, ErrorModal, NewPlanModal, PlanAddModal } from '@/commons/components/modal';

// EditModal 사용
<EditModal
  scheduleInfo={{
    date: '2026년 3월 28일 토요일',
    location: '서울특별시 강남구',
    budget: '5,000만원',
  }}
  onKeep={() => console.log('유지됨')}
  onEdit={() => console.log('수정됨')}
/>

// ErrorModal 사용
<ErrorModal
  planAName="플랜 A"
  studioName="에이비 스튜디오"
  onConfirm={() => console.log('확인됨')}
  onCancel={() => console.log('취소됨')}
/>

// NewPlanModal 사용
<NewPlanModal
  initialPlanName="플랜 A"
  onManualAdd={() => console.log('직접 추가')}
  onAIGenerate={(planName) => console.log('AI 생성', planName)}
/>

// PlanAddModal 사용
<PlanAddModal
  serviceName="엘레강스 포토"
  planOptions={[
    { value: 'plan1', label: '플랜 A' },
    { value: 'plan2', label: '플랜 B' },
  ]}
  scheduleInfo={{
    date: '2026년 3월 28일 토요일',
    location: '서울특별시 강남구',
    budget: '5,000만원',
  }}
  onConfirm={() => console.log('저장됨')}
  onCancel={() => console.log('취소됨')}
/>
```

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2025-11-29 | 초기 버전 | - |
| 1.1.0 | 2025-11-29 | 피그마 Drop shadow 효과 추가, 하드코딩 색상값 제거, 특화 모달 컴포넌트 추가 | - |

---

## 참고 자료
- [Figma 디자인](https://www.figma.com/design/fk83ig24/Modal-Design-System)
- 피그마 노드ID: 4188:8189, 4188:8190, 4188:8191, 4188:8192

