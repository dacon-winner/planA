-- ================================================
-- ai_resource 테이블 초기 데이터 생성
-- ================================================
-- 설명: vendor 테이블의 스드메베(STUDIO, DRESS, MAKEUP, VENUE) 데이터를 기반으로
--       ai_resource 테이블을 채웁니다.
-- 작성일: 2025.12.01
-- 수정일: 2025.12.01 - VENUE 카테고리 추가
-- ================================================

BEGIN;

-- 1. 기존 ai_resource 데이터 삭제 (초기화)
TRUNCATE TABLE ai_resource CASCADE;

DO $$
BEGIN
    RAISE NOTICE '기존 ai_resource 데이터 삭제 완료';
END $$;

-- 2. vendor 테이블에서 스드메베 업체 데이터를 ai_resource로 변환
-- 각 업체의 서비스 가격 범위를 계산하고, AI가 읽을 수 있는 텍스트 형식으로 변환
INSERT INTO ai_resource (vendor_id, category, name, content, metadata)
SELECT 
    v.id AS vendor_id,
    v.category::text AS category,
    v.name AS name,
    -- content: AI가 읽을 상세 설명 텍스트
    CONCAT(
        '업체명: ', v.name, E'\n',
        '카테고리: ', 
        CASE v.category::text
            WHEN 'STUDIO' THEN '스튜디오'
            WHEN 'DRESS' THEN '드레스'
            WHEN 'MAKEUP' THEN '메이크업'
            WHEN 'VENUE' THEN '웨딩홀'
            ELSE v.category::text
        END, E'\n',
        '주소: ', v.address, E'\n',
        '지역: ', v.region, E'\n',
        '전화번호: ', v.phone, E'\n',
        -- 스드메: service_item 가격 정보
        CASE 
            WHEN v.category IN ('STUDIO', 'DRESS', 'MAKEUP') AND price_info.price_min IS NOT NULL THEN 
                CONCAT('가격대: ', TO_CHAR(price_info.price_min, 'FM999,999,999'), '원 ~ ', TO_CHAR(price_info.price_max, 'FM999,999,999'), '원', E'\n')
            ELSE ''
        END,
        -- 웨딩홀: venue_detail 가격 정보
        CASE 
            WHEN v.category = 'VENUE' AND vvd.vendor_id IS NOT NULL THEN 
                CONCAT(
                    CASE WHEN vvd.hall_type IS NOT NULL THEN CONCAT('홀 타입: ', vvd.hall_type, E'\n') ELSE '' END,
                    CASE WHEN vvd.meal_type IS NOT NULL THEN CONCAT('식사 타입: ', vvd.meal_type, E'\n') ELSE '' END,
                    '최소 보증 인원: ', vvd.min_guarantee, '명', E'\n',
                    '식대(1인): ', TO_CHAR(vvd.meal_cost, 'FM999,999,999'), '원', E'\n',
                    '대관료: ', TO_CHAR(vvd.rental_fee, 'FM999,999,999'), '원', E'\n',
                    '예식 간격: ', vvd.ceremony_interval, '분', E'\n',
                    CASE WHEN vvd.ceremony_form IS NOT NULL THEN CONCAT('예식 형태: ', vvd.ceremony_form, E'\n') ELSE '' END
                )
            ELSE ''
        END,
        CASE 
            WHEN v.introduction IS NOT NULL AND v.introduction != '' THEN 
                CONCAT('소개: ', v.introduction, E'\n')
            ELSE ''
        END,
        CASE 
            WHEN JSONB_ARRAY_LENGTH(v.badges::jsonb) > 0 THEN 
                CONCAT('특징: ', ARRAY_TO_STRING(ARRAY(SELECT jsonb_array_elements_text(v.badges::jsonb)), ', '), E'\n')
            ELSE ''
        END,
        CASE 
            WHEN v.parking_info IS NOT NULL AND v.parking_info != '' THEN 
                CONCAT('주차정보: ', v.parking_info, E'\n')
            ELSE ''
        END,
        CASE 
            WHEN v.transport_info IS NOT NULL AND v.transport_info != '' THEN 
                CONCAT('교통정보: ', v.transport_info, E'\n')
            ELSE ''
        END
    ) AS content,
    -- metadata: JSON 형식의 구조화된 데이터
    JSONB_BUILD_OBJECT(
        'region', v.region,
        'address', v.address,
        'phone', v.phone,
        'price_min', COALESCE(price_info.price_min, vvd.meal_cost * vvd.min_guarantee + vvd.rental_fee),
        'price_max', COALESCE(price_info.price_max, vvd.meal_cost * vvd.min_guarantee + vvd.rental_fee),
        'latitude', v.latitude,
        'longitude', v.longitude,
        'thumbnail_url', v.thumbnail_url,
        'badges', v.badges,
        'parking_info', v.parking_info,
        'transport_info', v.transport_info,
        'naver_place_url', v.naver_place_url,
        -- 웨딩홀 전용 메타데이터
        'hall_type', vvd.hall_type,
        'meal_type', vvd.meal_type,
        'min_guarantee', vvd.min_guarantee,
        'meal_cost', vvd.meal_cost,
        'rental_fee', vvd.rental_fee,
        'ceremony_interval', vvd.ceremony_interval,
        'ceremony_form', vvd.ceremony_form
    ) AS metadata
FROM vendor v
LEFT JOIN LATERAL (
    -- 각 업체의 최소/최대 가격 계산 (스드메만)
    SELECT 
        MIN(s.price) AS price_min,
        MAX(s.price) AS price_max
    FROM service_item s
    WHERE s.vendor_id = v.id
) price_info ON true
LEFT JOIN vendor_venue_detail vvd ON v.id = vvd.vendor_id  -- 웨딩홀 상세 정보
WHERE v.category IN ('STUDIO', 'DRESS', 'MAKEUP', 'VENUE')  -- 스드메베 선택
ORDER BY v.category, v.name;

-- 3. 결과 확인
DO $$
DECLARE
    studio_count INTEGER;
    dress_count INTEGER;
    makeup_count INTEGER;
    venue_count INTEGER;
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO studio_count FROM ai_resource WHERE category = 'STUDIO';
    SELECT COUNT(*) INTO dress_count FROM ai_resource WHERE category = 'DRESS';
    SELECT COUNT(*) INTO makeup_count FROM ai_resource WHERE category = 'MAKEUP';
    SELECT COUNT(*) INTO venue_count FROM ai_resource WHERE category = 'VENUE';
    SELECT COUNT(*) INTO total_count FROM ai_resource;
    
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'ai_resource 테이블 생성 완료';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '스튜디오 (STUDIO): % 건', studio_count;
    RAISE NOTICE '드레스 (DRESS): % 건', dress_count;
    RAISE NOTICE '메이크업 (MAKEUP): % 건', makeup_count;
    RAISE NOTICE '웨딩홀 (VENUE): % 건', venue_count;
    RAISE NOTICE '----------------------------------------------';
    RAISE NOTICE '총계: % 건', total_count;
    RAISE NOTICE '==============================================';
END $$;

-- 4. 샘플 데이터 확인 (각 카테고리별 3개씩)
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '[샘플 데이터 - 각 카테고리별 3개]';
    RAISE NOTICE '';
END $$;

SELECT 
    category,
    name,
    LEFT(content, 100) || '...' AS content_preview,
    metadata->>'region' AS region,
    metadata->>'price_min' AS price_min,
    metadata->>'price_max' AS price_max
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY category ORDER BY name) AS rn
    FROM ai_resource
) sub
WHERE rn <= 3
ORDER BY category, name;

COMMIT;

-- ================================================
-- 실행 방법:
-- psql -h localhost -U yunjae -d plana -f docs/database/DEFAULT_DATAS/SEED_AI_RESOURCES.sql
-- ================================================

