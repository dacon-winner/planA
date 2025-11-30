-- Vendor 데이터를 AI Resource로 변환하는 스크립트
-- 실행: psql -d plana -f scripts/sync-ai-resources.sql

BEGIN;

-- 기존 ai_resource 데이터 중 vendor_id가 있는 것만 삭제 (수동 생성 데이터는 유지)
DELETE FROM ai_resource WHERE vendor_id IS NOT NULL;

-- vendor 데이터를 ai_resource로 변환하여 삽입
INSERT INTO ai_resource (
  vendor_id,
  category,
  name,
  content,
  metadata
)
SELECT 
  v.id AS vendor_id,
  v.category::text AS category,
  v.name AS name,
  
  -- content: 업체 정보를 AI가 읽기 쉬운 문장으로 변환
  CONCAT(
    v.name, '은(는) ',
    v.region, '에 위치한 ',
    CASE v.category
      WHEN 'STUDIO' THEN '웨딩 스튜디오입니다. '
      WHEN 'DRESS' THEN '웨딩 드레스 업체입니다. '
      WHEN 'MAKEUP' THEN '웨딩 메이크업 업체입니다. '
      WHEN 'VENUE' THEN '웨딩홀입니다. '
      ELSE '웨딩 업체입니다. '
    END,
    COALESCE(v.introduction, ''),
    CASE WHEN v.introduction IS NOT NULL AND v.introduction != '' THEN ' ' ELSE '' END,
    '주소는 ', v.address, '입니다. ',
    CASE 
      WHEN v.naver_rating > 0 THEN CONCAT('네이버 평점은 ', v.naver_rating::text, '점입니다. ')
      ELSE ''
    END,
    CASE 
      WHEN v.total_score > 0 THEN CONCAT('전체 평점은 ', v.total_score::text, '점입니다. ')
      ELSE ''
    END,
    CASE 
      WHEN v.review_count > 0 THEN CONCAT('리뷰는 ', v.review_count::text, '개가 있습니다. ')
      ELSE ''
    END,
    CASE 
      WHEN v.operating_hours IS NOT NULL THEN CONCAT('영업시간은 ', v.operating_hours, '입니다.')
      ELSE ''
    END
  ) AS content,
  
  -- metadata: 필터링과 검색에 사용할 구조화된 데이터
  jsonb_build_object(
    'region', v.region,
    'address', v.address,
    'phone', v.phone,
    'naver_rating', v.naver_rating,
    'total_score', v.total_score,
    'review_count', v.review_count,
    'badges', v.badges,
    'naver_place_url', v.naver_place_url,
    'thumbnail_url', v.thumbnail_url
  ) AS metadata

FROM vendor v
WHERE v.category IN ('STUDIO', 'DRESS', 'MAKEUP', 'VENUE');

-- 결과 확인
SELECT 
  category,
  COUNT(*) as count
FROM ai_resource
WHERE vendor_id IS NOT NULL
GROUP BY category
ORDER BY category;

COMMIT;

-- 변환 완료 메시지
\echo ''
\echo '✅ Vendor → AI Resource 변환 완료!'
\echo ''
\echo '변환된 데이터 확인:'
SELECT 
  category,
  name,
  LEFT(content, 100) || '...' as content_preview,
  metadata->>'region' as region
FROM ai_resource
WHERE vendor_id IS NOT NULL
ORDER BY category, name
LIMIT 10;

