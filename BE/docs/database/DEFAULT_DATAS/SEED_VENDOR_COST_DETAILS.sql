-- ================================================
-- vendor_cost_detail 테이블 초기 데이터 생성
-- ================================================
-- 설명: 스드메(STUDIO, DRESS, MAKEUP) 업체에 대해 추가 비용 정보를 설정합니다.
-- 작성일: 2025.12.01
-- ================================================

BEGIN;

DO $$
BEGIN
    RAISE NOTICE '======================================';
    RAISE NOTICE 'vendor_cost_detail 시딩 시작';
    RAISE NOTICE '======================================';
END $$;

-- 기존 데이터 삭제 (선택사항)
-- TRUNCATE TABLE vendor_cost_detail CASCADE;

-- 1. STUDIO (스튜디오) 추가 비용
INSERT INTO "vendor_cost_detail" (
    vendor_id,
    fitting_fee,
    helper_fee,
    early_start_fee,
    original_file_fee,
    modified_file_fee,
    valet_fee,
    after_party_fee,
    cancellation_policy
)
SELECT 
    v.id AS vendor_id,
    0 AS fitting_fee,          -- 스튜디오는 피팅비 없음
    0 AS helper_fee,            -- 스튜디오는 헬퍼비 없음
    0 AS early_start_fee,       -- 스튜디오는 얼리비 없음
    200000 AS original_file_fee,  -- 원본 파일 비용 (평균 20만원)
    100000 AS modified_file_fee,  -- 수정 파일 비용 (평균 10만원)
    30000 AS valet_fee,          -- 발렛 비용 (평균 3만원)
    0 AS after_party_fee,        -- 피로연 비용
    '촬영일 기준 7일 전 취소 시 100% 환불, 3일 전 50% 환불, 당일 취소 시 환불 불가' AS cancellation_policy
FROM vendor v
WHERE v.category = 'STUDIO'
ON CONFLICT (vendor_id) 
DO UPDATE SET
    original_file_fee = EXCLUDED.original_file_fee,
    modified_file_fee = EXCLUDED.modified_file_fee,
    valet_fee = EXCLUDED.valet_fee,
    cancellation_policy = EXCLUDED.cancellation_policy;

-- 2. DRESS (드레스) 추가 비용
INSERT INTO "vendor_cost_detail" (
    vendor_id,
    fitting_fee,
    helper_fee,
    early_start_fee,
    original_file_fee,
    modified_file_fee,
    valet_fee,
    after_party_fee,
    cancellation_policy
)
SELECT 
    v.id AS vendor_id,
    50000 AS fitting_fee,        -- 피팅비 (평균 5만원)
    100000 AS helper_fee,        -- 헬퍼비 (평균 10만원)
    50000 AS early_start_fee,    -- 얼리비 (평균 5만원)
    0 AS original_file_fee,      -- 드레스는 원본비 없음
    0 AS modified_file_fee,      -- 드레스는 수정비 없음
    30000 AS valet_fee,          -- 발렛 비용
    0 AS after_party_fee,        -- 피로연 비용
    '계약금 입금 후 7일 이내 취소 시 50% 환불, 14일 이후 환불 불가, 예식일 기준 1개월 전 취소 시 계약금 전액 몰수' AS cancellation_policy
FROM vendor v
WHERE v.category = 'DRESS'
ON CONFLICT (vendor_id) 
DO UPDATE SET
    fitting_fee = EXCLUDED.fitting_fee,
    helper_fee = EXCLUDED.helper_fee,
    early_start_fee = EXCLUDED.early_start_fee,
    valet_fee = EXCLUDED.valet_fee,
    cancellation_policy = EXCLUDED.cancellation_policy;

-- 3. MAKEUP (메이크업) 추가 비용
INSERT INTO "vendor_cost_detail" (
    vendor_id,
    fitting_fee,
    helper_fee,
    early_start_fee,
    original_file_fee,
    modified_file_fee,
    valet_fee,
    after_party_fee,
    cancellation_policy
)
SELECT 
    v.id AS vendor_id,
    30000 AS fitting_fee,        -- 피팅비 (평균 3만원)
    80000 AS helper_fee,         -- 헬퍼비 (평균 8만원)
    100000 AS early_start_fee,   -- 얼리비 (평균 10만원)
    0 AS original_file_fee,      -- 메이크업은 원본비 없음
    0 AS modified_file_fee,      -- 메이크업은 수정비 없음
    0 AS valet_fee,              -- 메이크업은 발렛비 없음 (보통 샵 방문)
    0 AS after_party_fee,        -- 피로연 비용
    '예식일 기준 1개월 전 취소 시 50% 환불, 2주 전 30% 환불, 1주 전 환불 불가' AS cancellation_policy
FROM vendor v
WHERE v.category = 'MAKEUP'
ON CONFLICT (vendor_id) 
DO UPDATE SET
    fitting_fee = EXCLUDED.fitting_fee,
    helper_fee = EXCLUDED.helper_fee,
    early_start_fee = EXCLUDED.early_start_fee,
    cancellation_policy = EXCLUDED.cancellation_policy;

-- 결과 확인
DO $$
DECLARE
    studio_count int;
    dress_count int;
    makeup_count int;
    total_count int;
BEGIN
    SELECT COUNT(*) INTO studio_count FROM vendor_cost_detail vcd
    JOIN vendor v ON vcd.vendor_id = v.id WHERE v.category = 'STUDIO';
    
    SELECT COUNT(*) INTO dress_count FROM vendor_cost_detail vcd
    JOIN vendor v ON vcd.vendor_id = v.id WHERE v.category = 'DRESS';
    
    SELECT COUNT(*) INTO makeup_count FROM vendor_cost_detail vcd
    JOIN vendor v ON vcd.vendor_id = v.id WHERE v.category = 'MAKEUP';
    
    total_count := studio_count + dress_count + makeup_count;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ 추가 비용 정보 시딩 완료';
    RAISE NOTICE '   - STUDIO: % 개', studio_count;
    RAISE NOTICE '   - DRESS: % 개', dress_count;
    RAISE NOTICE '   - MAKEUP: % 개', makeup_count;
    RAISE NOTICE '   - 총합: % 개', total_count;
    RAISE NOTICE '';
    RAISE NOTICE '기본 추가 비용 (예시):';
    RAISE NOTICE '   [스튜디오]';
    RAISE NOTICE '   - 원본비: 200,000원';
    RAISE NOTICE '   - 수정비: 100,000원';
    RAISE NOTICE '   - 발렛비: 30,000원';
    RAISE NOTICE '';
    RAISE NOTICE '   [드레스]';
    RAISE NOTICE '   - 피팅비: 50,000원';
    RAISE NOTICE '   - 헬퍼비: 100,000원';
    RAISE NOTICE '   - 얼리비: 50,000원';
    RAISE NOTICE '   - 발렛비: 30,000원';
    RAISE NOTICE '';
    RAISE NOTICE '   [메이크업]';
    RAISE NOTICE '   - 피팅비: 30,000원';
    RAISE NOTICE '   - 헬퍼비: 80,000원';
    RAISE NOTICE '   - 얼리비: 100,000원';
    RAISE NOTICE '';
    RAISE NOTICE '※ 실제 금액은 업체마다 다를 수 있으며, 위 금액은 평균값입니다.';
    RAISE NOTICE '======================================';
END $$;

COMMIT;

-- ================================================
-- 조회 쿼리 예시
-- ================================================
-- 특정 업체의 추가 비용 확인:
-- SELECT v.name, v.category, vcd.*
-- FROM vendor v
-- JOIN vendor_cost_detail vcd ON v.id = vcd.vendor_id
-- WHERE v.name = '아르센스튜디오';

-- 카테고리별 평균 추가 비용:
-- SELECT 
--     v.category,
--     AVG(vcd.fitting_fee) as avg_fitting_fee,
--     AVG(vcd.helper_fee) as avg_helper_fee,
--     AVG(vcd.early_start_fee) as avg_early_start_fee,
--     AVG(vcd.original_file_fee) as avg_original_file_fee,
--     AVG(vcd.modified_file_fee) as avg_modified_file_fee
-- FROM vendor v
-- JOIN vendor_cost_detail vcd ON v.id = vcd.vendor_id
-- GROUP BY v.category;

