-- =========================================================
-- policy_info 테이블 초기 데이터 생성
-- =========================================================
-- 설명: 신혼부부를 위한 정책 정보 데이터를 policy_info 테이블에 적재합니다.
--       대출, 보조금, 주택 지원 등 다양한 정책 정보를 포함합니다.
-- 작성일: 2025.12.01
-- 카테고리: LOAN(대출), SUBSIDY(보조금), HOUSING(주택)
-- =========================================================

BEGIN;

-- 기존 policy_info 데이터 삭제 (선택사항)
-- TRUNCATE TABLE policy_info CASCADE;

DO $$
BEGIN
    RAISE NOTICE '신혼부부 정책 데이터 적재 시작';
END $$;

-- =========================================================
-- 신혼부부 정책 데이터 적재 (policy_info)
-- =========================================================
INSERT INTO "policy_info" (
  "title",
  "subtitle",
  "type",
  "badges",
  "benefit_summary",
  "apply_url",
  "thumbnail_url"
) VALUES 
-- 1. 신혼부부 디딤돌 대출 (구입자금)
(
  '신혼부부 전용 구입자금 대출 (디딤돌)',
  '생애 최초 내 집 마련을 꿈꾸는 신혼부부를 위한 저금리 대출',
  'LOAN',
  '["저금리", "최대4억", "LTV80%"]',
  '최저 연 2.15% ~ 3.25% 금리 적용, 최대 4억원 한도 (생애최초 주택구입 시 LTV 80% 적용)',
  'https://nhuf.molit.go.kr/',
  'https://cdn.plana.com/policy/didimdol.png'
),
-- 2. 신혼부부 버팀목 대출 (전세자금)
(
  '신혼부부 전용 전세자금 대출 (버팀목)',
  '높은 전세금이 부담되는 신혼부부를 위한 전세 보증금 대출',
  'LOAN',
  '["전세자금", "수도권3억", "저금리"]',
  '연 1.5% ~ 2.7% 저금리, 수도권 최대 3억원(지방 2억원) 대출 한도 지원',
  'https://nhuf.molit.go.kr/',
  'https://cdn.plana.com/policy/beotimmok.png'
),
-- 3. 서울시 임차보증금 이자지원
(
  '서울시 신혼부부 임차보증금 이자지원',
  '서울에 거주하는 신혼부부의 주거비 부담을 덜어드립니다',
  'SUBSIDY',
  '["서울시", "이자지원", "최대10년"]',
  '보증금의 90% 이내(최대 3억원) 대출 가능, 대출이자 최대 연 3.6% 지원 (소득 구간별 차등)',
  'https://housing.seoul.go.kr/',
  'https://cdn.plana.com/policy/seoul_interest.png'
),
-- 4. 신혼희망타운
(
  '신혼희망타운 (분양형/임대형)',
  '육아와 보육에 특화된 신혼부부 전용 공공주택',
  'HOUSING',
  '["내집마련", "육아특화", "공공분양"]',
  '주변 시세 대비 저렴한 분양가, 단지 내 국공립 어린이집 등 육아 특화 시설 제공',
  'https://apply.lh.or.kr/',
  'https://cdn.plana.com/policy/heemang_town.png'
),
-- 5. 첫만남이용권
(
  '첫만남이용권 (출산지원금)',
  '세상에 나온 아기와의 첫 만남을 축하합니다',
  'SUBSIDY',
  '["200만원", "전국공통", "바우처"]',
  '출생 아동 1명당 200만원 이용권 지급 (둘째 이상 300만원), 국민행복카드로 지급',
  'https://www.bokjiro.go.kr/',
  'https://cdn.plana.com/policy/first_meeting.png'
),
-- 6. 임신/출산 진료비 지원
(
  '임신·출산 진료비 지원 (국민행복카드)',
  '건강한 임신과 출산을 위한 의료비 부담 경감',
  'SUBSIDY',
  '["병원비", "임산부", "100만원"]',
  '임신 1회당 100만원 바우처 지원 (다태아 140만원), 분만 취약지 추가 지원',
  'https://www.nhis.or.kr/',
  'https://cdn.plana.com/policy/pregnancy_card.png'
),
-- 7. 신생아 특례 대출
(
  '신생아 특례 구입자금 대출',
  '아기를 낳은 가정을 위한 파격적인 금리 혜택',
  'LOAN',
  '["신생아", "1%대금리", "최대5억"]',
  '신청일 기준 2년 내 출산한 가구 대상, 최저 1.6% 금리로 최대 5억원까지 대출',
  'https://nhuf.molit.go.kr/',
  'https://cdn.plana.com/policy/newborn_loan.png'
),
-- 8. 난임부부 시술비 지원
(
  '난임부부 시술비 지원',
  '소중한 아기를 기다리는 난임부부의 경제적 부담 완화',
  'SUBSIDY',
  '["난임지원", "체외수정", "인공수정"]',
  '체외수정(신선/동결), 인공수정 시술비 일부 지원 (소득 및 횟수 제한 확인 필요)',
  'https://www.bokjiro.go.kr/',
  'https://cdn.plana.com/policy/infertility.png'
);

DO $$
DECLARE
    inserted_count INTEGER;
BEGIN
    -- 삽입된 데이터 확인
    SELECT COUNT(*) INTO inserted_count FROM "policy_info";
    RAISE NOTICE '정책 정보 데이터 적재 완료: % 건', inserted_count;
END $$;

COMMIT;

-- =========================================================
-- 실행 방법:
-- psql -h localhost -U postgres -d Plan_A -f POLICY_INFO_DATAS.sql
-- 
-- 또는 DBeaver 등 GUI 도구에서 SQL 직접 실행
-- =========================================================

