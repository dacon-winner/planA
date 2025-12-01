-- ================================================
-- vendor_operating_hour 테이블 초기 데이터 생성
-- ================================================
-- 설명: 모든 vendor에 대해 기본 영업시간을 설정합니다.
--       평일(월~금): 09:00 - 18:00
--       주말(토~일): 10:00 - 17:00
-- 작성일: 2025.12.01
-- ================================================

BEGIN;

DO $$
BEGIN
    RAISE NOTICE '======================================';
    RAISE NOTICE 'vendor_operating_hour 시딩 시작';
    RAISE NOTICE '======================================';
END $$;

-- 기존 데이터 삭제 (선택사항)
-- TRUNCATE TABLE vendor_operating_hour CASCADE;

-- 모든 vendor에 대해 요일별 영업시간 생성
INSERT INTO "vendor_operating_hour" (vendor_id, day_of_week, open_time, close_time, is_holiday)
SELECT 
    v.id AS vendor_id,
    dow AS day_of_week,
    CASE 
        -- 일요일 (0): 휴무
        WHEN dow = 0 THEN NULL
        -- 월~금 (1~5): 09:00 - 18:00
        WHEN dow BETWEEN 1 AND 5 THEN '09:00:00'::time
        -- 토요일 (6): 10:00 - 17:00
        WHEN dow = 6 THEN '10:00:00'::time
    END AS open_time,
    CASE 
        -- 일요일 (0): 휴무
        WHEN dow = 0 THEN NULL
        -- 월~금 (1~5): 09:00 - 18:00
        WHEN dow BETWEEN 1 AND 5 THEN '18:00:00'::time
        -- 토요일 (6): 10:00 - 17:00
        WHEN dow = 6 THEN '17:00:00'::time
    END AS close_time,
    CASE 
        -- 일요일만 휴무 처리
        WHEN dow = 0 THEN true
        ELSE false
    END AS is_holiday
FROM 
    vendor v
CROSS JOIN 
    generate_series(0, 6) AS dow
ON CONFLICT (vendor_id, day_of_week) 
DO UPDATE SET
    open_time = EXCLUDED.open_time,
    close_time = EXCLUDED.close_time,
    is_holiday = EXCLUDED.is_holiday;

-- 결과 확인
DO $$
DECLARE
    total_count int;
    vendor_count int;
BEGIN
    SELECT COUNT(*) INTO total_count FROM vendor_operating_hour;
    SELECT COUNT(DISTINCT vendor_id) INTO vendor_count FROM vendor_operating_hour;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ 영업시간 시딩 완료';
    RAISE NOTICE '   - 업체 수: % 개', vendor_count;
    RAISE NOTICE '   - 총 레코드: % 건 (업체당 7일)', total_count;
    RAISE NOTICE '';
    RAISE NOTICE '기본 영업시간:';
    RAISE NOTICE '   - 월~금: 09:00 - 18:00';
    RAISE NOTICE '   - 토요일: 10:00 - 17:00';
    RAISE NOTICE '   - 일요일: 휴무';
    RAISE NOTICE '======================================';
END $$;

COMMIT;

-- ================================================
-- 조회 쿼리 예시
-- ================================================
-- 특정 업체의 영업시간 확인:
-- SELECT v.name, voh.day_of_week, voh.open_time, voh.close_time, voh.is_holiday
-- FROM vendor v
-- JOIN vendor_operating_hour voh ON v.id = voh.vendor_id
-- WHERE v.name = '아르센스튜디오'
-- ORDER BY voh.day_of_week;

-- 휴무일인 업체 확인:
-- SELECT v.name, voh.day_of_week
-- FROM vendor v
-- JOIN vendor_operating_hour voh ON v.id = voh.vendor_id
-- WHERE voh.is_holiday = true
-- ORDER BY v.name, voh.day_of_week;

