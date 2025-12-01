-- ================================================
-- vendor 테이블의 region 컬럼 수정
-- ================================================
-- 설명: address에서 구 단위를 자동으로 추출하여 region을 업데이트
--       서울시 전용 서비스이므로 구 단위가 필수
-- 작성일: 2025.12.01
-- ================================================

BEGIN;

-- 1. 현재 region 상태 확인
DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE '[수정 전] 현재 region 분포';
    RAISE NOTICE '==============================================';
END $$;

SELECT region, COUNT(*) as count
FROM vendor
GROUP BY region
ORDER BY count DESC;

DO $$
BEGIN
    RAISE NOTICE '';
END $$;

-- 2. address에서 구 단위 추출하여 region 업데이트
-- 패턴: "서울 [구이름] ..." → "[구이름]" 추출
UPDATE vendor
SET region = (
    SELECT 
        CASE
            -- "서울 강남구 ..." 패턴에서 "강남구" 추출
            WHEN address ~ '^서울\s+\S+구' THEN
                (regexp_match(address, '^서울\s+(\S+구)'))[1]
            -- "서울특별시 강남구 ..." 패턴에서 "강남구" 추출
            WHEN address ~ '^서울특별시\s+\S+구' THEN
                (regexp_match(address, '^서울특별시\s+(\S+구)'))[1]
            -- 경기도 주소인 경우 "경기" 유지
            WHEN address ~ '^경기' THEN '경기'
            -- 그 외의 경우 기존 값 유지
            ELSE region
        END
)
WHERE address IS NOT NULL AND address != '';

-- 3. 특수 케이스 처리 (강남/신사, 강남/청담 등)
-- 이미 address에서 추출했지만, 혹시 남아있는 케이스를 위해
UPDATE vendor
SET region = '강남구'
WHERE region LIKE '강남/%' OR region = '강남';

UPDATE vendor
SET region = '마포구'
WHERE region LIKE '마포/%' OR region = '마포';

UPDATE vendor
SET region = '중구'
WHERE region LIKE '중구/%' OR region = '중구/명동';

-- 4. 업데이트 결과 확인
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '[수정 후] 업데이트된 region 분포';
    RAISE NOTICE '==============================================';
END $$;

SELECT region, COUNT(*) as count
FROM vendor
GROUP BY region
ORDER BY count DESC;

-- 5. 통계 출력
DO $$
DECLARE
    total_count INTEGER;
    gu_count INTEGER;
    non_gu_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_count FROM vendor;
    SELECT COUNT(*) INTO gu_count FROM vendor WHERE region LIKE '%구';
    SELECT COUNT(*) INTO non_gu_count FROM vendor WHERE region NOT LIKE '%구';
    
    RAISE NOTICE '';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '[통계]';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '전체 업체 수: %', total_count;
    RAISE NOTICE '구 단위로 설정된 업체: % (%.1f%%)', gu_count, (gu_count::float / total_count * 100);
    RAISE NOTICE '기타 지역 업체: % (%.1f%%)', non_gu_count, (non_gu_count::float / total_count * 100);
    RAISE NOTICE '==============================================';
END $$;

-- 6. 샘플 데이터 확인
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '[샘플 데이터 - 각 region별 3개씩]';
    RAISE NOTICE '';
END $$;

SELECT 
    region,
    name,
    LEFT(address, 50) as address_preview
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY region ORDER BY name) AS rn
    FROM vendor
) sub
WHERE rn <= 3
ORDER BY region, name;

COMMIT;

-- ================================================
-- 실행 방법:
-- psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/FIX_VENDOR_REGIONS.sql
-- ================================================

