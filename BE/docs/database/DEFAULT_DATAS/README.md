# DEFAULT_DATAS - 초기 데이터 시딩 가이드

> 로컬 개발 환경 DB 초기화용 데이터 파일들

## 📁 파일 구조

```
DEFAULT_DATAS/
├── README.md                          # 이 파일
├── STUDIO_DATAS.sql                   # 스튜디오 업체 데이터
├── DRESS_DATAS.sql                    # 드레스 업체 데이터
├── MAKEUP_DATAS.sql                   # 메이크업 업체 데이터
├── WEDDING_DATAS.sql                  # 웨딩홀 업체 데이터
├── FIX_VENDOR_REGIONS.sql             # 🔧 vendor region 수정 (구 단위)
├── SEED_VENDOR_OPERATING_HOURS.sql    # 📅 업체 영업시간 시딩 (NEW)
├── SEED_VENDOR_COST_DETAILS.sql       # 💵 스드메 추가 비용 시딩 (NEW)
├── SEED_VENDOR_IMAGES.sql             # 업체 이미지 시딩 ⭐
├── SEED_AI_RESOURCES.sql              # AI 추천용 리소스 시딩 🤖
├── POLICY_INFO_DATAS.sql              # 신혼부부 정책 정보 데이터 💰
├── AI_RESOURCE_SETUP.md               # AI 리소스 설정 가이드
├── REGION_FIX_SUMMARY.md              # region 수정 요약
└── README_VENDOR_IMAGES.md            # 이미지 시딩 가이드
```

---

## 🚀 빠른 시작

### **신규 개발자 (처음 셋업)**

로컬 개발 환경에서 DB를 처음 설정하는 경우 아래 순서대로 실행하세요.

```bash
cd BE

# ============================================
# 1단계: 스키마 생성
# ============================================
npm run migration:run

# ============================================
# 2단계: 업체 기본 데이터 삽입 (스드메베)
# ============================================
# 순서: STUDIO → DRESS → MAKEUP → WEDDING(VENUE)
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/STUDIO_DATAS.sql
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/DRESS_DATAS.sql
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/MAKEUP_DATAS.sql
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/WEDDING_DATAS.sql

# ============================================
# 3단계: Vendor 데이터 보강
# ============================================
# 3-1. Region 수정 (서울 → 강남구 형식으로 변경) 🔧
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/FIX_VENDOR_REGIONS.sql

# 3-2. 영업시간 시딩 (평일/주말 기본 영업시간) 📅
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_OPERATING_HOURS.sql

# 3-3. 추가 비용 정보 시딩 (스드메 피팅비, 헬퍼비 등) 💵
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_COST_DETAILS.sql

# 3-4. 이미지 시딩 (썸네일 + 상세 이미지) ⭐
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql

# ============================================
# 4단계: AI 추천 시스템 데이터
# ============================================
# AI 추천용 리소스 시딩 (vendor 기반 자동 생성) 🤖
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql

# ============================================
# 5단계: 정책 정보 데이터
# ============================================
# 신혼부부 정책 정보 시딩 (대출, 보조금 등) 💰
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/POLICY_INFO_DATAS.sql

# ============================================
# 6단계: 서버 시작
# ============================================
npm run start:dev
```

### **간편 설치 (전체 한 번에)**

```bash
cd BE

# 1. 스키마 생성
npm run migration:run

# 2. 모든 데이터 시딩 (순서대로 실행)
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/STUDIO_DATAS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/DRESS_DATAS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/MAKEUP_DATAS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/WEDDING_DATAS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/FIX_VENDOR_REGIONS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_OPERATING_HOURS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_COST_DETAILS.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql && \
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/POLICY_INFO_DATAS.sql

# 3. 서버 시작
npm run start:dev
```

### **기존 개발자 (부분 업데이트)**

특정 데이터만 추가/업데이트하는 경우:

```bash
cd BE

# 이미지만 추가
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_IMAGES.sql

# 영업시간만 추가
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_OPERATING_HOURS.sql

# 추가 비용 정보만 추가
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_COST_DETAILS.sql

# AI 리소스 재생성 (vendor 데이터 변경 시)
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql

# 서버 시작
npm run start:dev
```

---

## 🖼️ 이미지 확인

```
http://localhost:3000/static/vendor-images/studio/studio01.jpg
http://localhost:3000/static/vendor-images/dress/dress01.jpg
http://localhost:3000/static/vendor-images/makeup/makeup01.jpg
http://localhost:3000/static/vendor-images/venue/weddingHall01.png
```

---

## 📊 데이터 현황

### 1. 업체 기본 데이터 (`vendor`)

| 카테고리   | 설명          | 시딩 파일           |
| ---------- | ------------- | ------------------- |
| **STUDIO** | 스튜디오 업체 | `STUDIO_DATAS.sql`  |
| **DRESS**  | 드레스 업체   | `DRESS_DATAS.sql`   |
| **MAKEUP** | 메이크업 업체 | `MAKEUP_DATAS.sql`  |
| **VENUE**  | 웨딩홀 업체   | `WEDDING_DATAS.sql` |

### 2. 업체 보강 데이터

#### 2-1. Region 정보 (`vendor.region`)

- **수정 전**: `서울` (시 단위)
- **수정 후**: `강남구`, `서초구` 등 (구 단위)
- **시딩 파일**: `FIX_VENDOR_REGIONS.sql`

#### 2-2. 영업시간 (`vendor_operating_hour`) 📅

- **데이터 수**: 업체 수 × 7일 (요일별)
- **기본 설정**:
  - 월~금: 09:00 - 18:00
  - 토요일: 10:00 - 17:00
  - 일요일: 휴무
- **시딩 파일**: `SEED_VENDOR_OPERATING_HOURS.sql` ⭐ **NEW**

#### 2-3. 추가 비용 정보 (`vendor_cost_detail`) 💵

- **대상**: STUDIO, DRESS, MAKEUP (스드메 업체만)
- **포함 정보**:
  - **스튜디오**: 원본비, 수정비, 발렛비
  - **드레스**: 피팅비, 헬퍼비, 얼리비, 발렛비
  - **메이크업**: 피팅비, 헬퍼비, 얼리비
  - **공통**: 위약금 규정 (cancellation_policy)
- **시딩 파일**: `SEED_VENDOR_COST_DETAILS.sql` ⭐ **NEW**

#### 2-4. 이미지 데이터 (`vendor_image`)

- **venue**: 20개 이미지
- **studio**: 23개 이미지
- **dress**: 19개 이미지
- **makeup**: 17개 이미지
- **구성**: 각 업체당 3개 이미지 (thumbnail + 상세 2개)
- **저장 위치**: `BE/public/vendor-images/{category}/`
- **시딩 파일**: `SEED_VENDOR_IMAGES.sql`

### 3. AI 추천 시스템 데이터 (`ai_resource`) 🤖

AI 추천 시스템이 사용하는 벡터 검색용 리소스:

- **STUDIO**: 약 82건
- **DRESS**: 약 59건
- **MAKEUP**: 약 30건
- **VENUE**: 웨딩홀 업체 전체
- **총**: 171건 이상

**생성 방식**:

- `vendor` 테이블 데이터를 기반으로 자동 생성
- 각 업체의 정보를 AI가 읽을 수 있는 텍스트 형식으로 변환
- metadata에는 지역, 가격대, 주소 등 구조화된 정보 포함

**시딩 파일**: `SEED_AI_RESOURCES.sql`

**⚠️ 중요**: AI 리소스는 vendor 데이터가 모두 삽입된 후에 생성해야 합니다.

### 4. 정책 정보 데이터 (`policy_info`) 💰

신혼부부를 위한 정책 정보:

| 유형                 | 건수 | 내용                                              |
| -------------------- | ---- | ------------------------------------------------- |
| **LOAN** (대출)      | 3건  | 디딤돌 대출, 버팀목 대출, 신생아 특례 대출        |
| **SUBSIDY** (보조금) | 4건  | 임차보증금 이자지원, 첫만남이용권, 진료비 지원 등 |
| **HOUSING** (주택)   | 1건  | 신혼희망타운                                      |
| **총계**             | 8건  | -                                                 |

**포함 정보**:

- 정책명 (title, subtitle)
- 정책 유형 (type: LOAN/SUBSIDY/HOUSING)
- 뱃지 (badges: JSON 배열)
- 혜택 요약 (benefit_summary)
- 신청 URL (apply_url)
- 썸네일 이미지 URL (thumbnail_url)

**시딩 파일**: `POLICY_INFO_DATAS.sql`

---

## ⚠️ 시딩 순서가 중요한 이유

데이터 시딩은 **반드시 아래 순서**대로 진행해야 합니다:

```
1. vendor (업체 기본 정보)
   ↓
2. service_item, vendor_venue_detail (업체별 상품/상세)
   ↓
3. FIX_VENDOR_REGIONS (region 수정)
   ↓
4. vendor_operating_hour (영업시간) ← vendor_id 참조
   ↓
5. vendor_cost_detail (추가 비용) ← vendor_id 참조
   ↓
6. vendor_image (이미지) ← vendor_id 참조
   ↓
7. ai_resource (AI 리소스) ← vendor_id 참조 (NULL 가능)
   ↓
8. policy_info (정책 정보) ← 독립적
```

**외래키 관계**:

- `vendor_operating_hour`, `vendor_cost_detail`, `vendor_image`, `service_item`은 모두 `vendor.id`를 참조
- 따라서 `vendor` 데이터가 먼저 삽입되어야 함
- `ai_resource`는 vendor 데이터를 기반으로 자동 생성되므로 가장 나중에 실행

## 🔧 문제 해결

### 1. DB 연결 오류

```bash
# .env 파일 확인
cat BE/.env | grep DB_

# PostgreSQL 접속 테스트
psql -U your_username -d plana -c "SELECT 1;"
```

### 2. 데이터 초기화 (처음부터 다시)

```bash
# 모든 마이그레이션 되돌리기
npm run migration:revert

# 마이그레이션 재실행
npm run migration:run

# 데이터 시딩 재실행 (위의 "빠른 시작" 참조)
```

### 3. 특정 테이블만 초기화

```bash
# vendor_operating_hour만 재시딩
psql -U your_username -d plana -c "TRUNCATE TABLE vendor_operating_hour CASCADE;"
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_OPERATING_HOURS.sql

# vendor_cost_detail만 재시딩
psql -U your_username -d plana -c "TRUNCATE TABLE vendor_cost_detail CASCADE;"
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_VENDOR_COST_DETAILS.sql

# ai_resource만 재시딩
psql -U your_username -d plana -c "TRUNCATE TABLE ai_resource CASCADE;"
psql -U your_username -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
```

### 4. 이미지가 안 보이는 경우

```bash
# 이미지 파일 확인
ls -la BE/public/vendor-images/studio/

# 퍼미션 확인
chmod -R 755 BE/public/vendor-images/

# 서버 재시작
npm run start:dev
```

### 5. 외래키 오류 발생 시

```
ERROR: insert or update on table "vendor_operating_hour" violates foreign key constraint
```

**원인**: vendor 데이터가 없는 상태에서 관련 테이블에 데이터 삽입 시도

**해결**:

1. vendor 데이터 먼저 삽입
2. 위의 시딩 순서대로 재실행

### 6. 데이터 확인 쿼리

```bash
# 업체 수 확인
psql -U your_username -d plana -c "SELECT category, COUNT(*) FROM vendor GROUP BY category;"

# 영업시간 데이터 확인
psql -U your_username -d plana -c "SELECT COUNT(*) FROM vendor_operating_hour;"

# 추가 비용 데이터 확인
psql -U your_username -d plana -c "SELECT COUNT(*) FROM vendor_cost_detail;"

# 이미지 데이터 확인
psql -U your_username -d plana -c "SELECT COUNT(*) FROM vendor_image;"

# AI 리소스 확인
psql -U your_username -d plana -c "SELECT category, COUNT(*) FROM ai_resource GROUP BY category;"
```

---

## 📝 참고 문서

- **스키마 문서**: [../DATABASE.md](../DATABASE.md)
- **이미지 상세**: [README_VENDOR_IMAGES.md](./README_VENDOR_IMAGES.md)
- **AI 리소스 가이드**: [AI_RESOURCE_SETUP.md](./AI_RESOURCE_SETUP.md)
- **Region 수정 요약**: [REGION_FIX_SUMMARY.md](./REGION_FIX_SUMMARY.md)

## 🎯 체크리스트

신규 개발자가 DB 셋업 시 확인할 사항:

- [ ] PostgreSQL 설치 및 실행 확인
- [ ] `plana` 데이터베이스 생성
- [ ] `.env` 파일 DB 설정 확인
- [ ] `npm run migration:run` 실행 완료
- [ ] 업체 데이터 시딩 (STUDIO, DRESS, MAKEUP, WEDDING)
- [ ] Region 수정 실행
- [ ] 영업시간 시딩 실행 ⭐
- [ ] 추가 비용 정보 시딩 실행 ⭐
- [ ] 이미지 시딩 실행
- [ ] AI 리소스 시딩 실행
- [ ] 정책 정보 시딩 실행
- [ ] 서버 정상 구동 확인 (`npm run start:dev`)
- [ ] API 테스트 (`GET /api/vendors`)
- [ ] 이미지 접근 확인 (`http://localhost:3000/static/vendor-images/...`)

---

**최종 수정일**: 2025.12.01  
**버전**: 1.1.0  
**작성자**: 이윤재  
**주요 변경사항**:

- ⭐ `SEED_VENDOR_OPERATING_HOURS.sql` 추가 (영업시간 시딩)
- ⭐ `SEED_VENDOR_COST_DETAILS.sql` 추가 (추가 비용 정보 시딩)
- 📝 시딩 순서 명확화 및 간편 설치 스크립트 추가
- 🔧 문제 해결 가이드 강화 (외래키 오류, 데이터 확인 쿼리 등)
