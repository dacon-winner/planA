-- ========================================
-- Vendor 이미지 시딩 스크립트
-- 순환 할당(Round-robin) 방식으로 이미지 할당
-- ========================================

-- 1단계: 기존 vendor_image 데이터 삭제 (재실행을 위해)
DELETE FROM vendor_image;

-- 2단계: 썸네일 URL 업데이트 (순환 할당)
WITH vendor_with_row AS (
  SELECT 
    id,
    category,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY name) as row_num
  FROM vendor
)
UPDATE vendor v
SET thumbnail_url = CASE v.category
  -- VENUE: 20개 이미지
  WHEN 'VENUE' THEN 
    'http://localhost:3000/static/vendor-images/venue/weddingHall' || 
    LPAD((((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 20 + 1)::text, 2, '0') || 
    CASE 
      WHEN ((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 20 + 1 IN (3,4,5,6,7,19) THEN '.jpg'
      ELSE '.png'
    END
  
  -- STUDIO: 23개 이미지
  WHEN 'STUDIO' THEN 
    'http://localhost:3000/static/vendor-images/studio/studio' || 
    LPAD((((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 23 + 1)::text, 2, '0') || 
    CASE 
      WHEN ((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 23 + 1 IN (1,2) THEN '.jpg'
      ELSE '.png'
    END
  
  -- DRESS: 19개 이미지
  WHEN 'DRESS' THEN 
    'http://localhost:3000/static/vendor-images/dress/dress' || 
    LPAD((((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 19 + 1)::text, 2, '0') || 
    CASE 
      WHEN ((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 19 + 1 IN (1,2,3,4) THEN '.jpg'
      ELSE '.png'
    END
  
  -- MAKEUP: 17개 이미지
  WHEN 'MAKEUP' THEN 
    'http://localhost:3000/static/vendor-images/makeup/makeup' || 
    LPAD((((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 17 + 1)::text, 2, '0') || 
    CASE 
      WHEN ((SELECT row_num FROM vendor_with_row WHERE id = v.id) - 1) % 17 + 1 IN (1,2,3,4) THEN '.jpg'
      ELSE '.png'
    END
END;

-- 3단계: vendor_image 테이블에 상세 이미지 삽입 (각 업체당 3개씩, thumbnail 포함)
WITH vendor_with_row AS (
  SELECT 
    id,
    category,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY name) as row_num
  FROM vendor
)
INSERT INTO vendor_image (id, vendor_id, image_url, role, sort_order)
SELECT 
  gen_random_uuid(),
  vwr.id,
  CASE vwr.category
    -- VENUE: 20개 이미지 순환
    WHEN 'VENUE' THEN 
      'http://localhost:3000/static/vendor-images/venue/weddingHall' || 
      LPAD(((vwr.row_num - 1 + img_offset.offset) % 20 + 1)::text, 2, '0') || 
      CASE 
        WHEN (vwr.row_num - 1 + img_offset.offset) % 20 + 1 IN (3,4,5,6,7,19) THEN '.jpg'
        ELSE '.png'
      END
    
    -- STUDIO: 23개 이미지 순환
    WHEN 'STUDIO' THEN 
      'http://localhost:3000/static/vendor-images/studio/studio' || 
      LPAD(((vwr.row_num - 1 + img_offset.offset) % 23 + 1)::text, 2, '0') || 
      CASE 
        WHEN (vwr.row_num - 1 + img_offset.offset) % 23 + 1 IN (1,2) THEN '.jpg'
        ELSE '.png'
      END
    
    -- DRESS: 19개 이미지 순환
    WHEN 'DRESS' THEN 
      'http://localhost:3000/static/vendor-images/dress/dress' || 
      LPAD(((vwr.row_num - 1 + img_offset.offset) % 19 + 1)::text, 2, '0') || 
      CASE 
        WHEN (vwr.row_num - 1 + img_offset.offset) % 19 + 1 IN (1,2,3,4) THEN '.jpg'
        ELSE '.png'
      END
    
    -- MAKEUP: 17개 이미지 순환
    WHEN 'MAKEUP' THEN 
      'http://localhost:3000/static/vendor-images/makeup/makeup' || 
      LPAD(((vwr.row_num - 1 + img_offset.offset) % 17 + 1)::text, 2, '0') || 
      CASE 
        WHEN (vwr.row_num - 1 + img_offset.offset) % 17 + 1 IN (1,2,3,4) THEN '.jpg'
        ELSE '.png'
      END
  END,
  'DETAIL',
  img_offset.offset
FROM vendor_with_row vwr
CROSS JOIN (
  -- 각 업체당 3개의 이미지 생성 (offset 0~2)
  SELECT generate_series(0, 2) as offset
) img_offset
ORDER BY vwr.category, vwr.row_num, img_offset.offset;

-- 4단계: 결과 확인
SELECT 
  v.category,
  COUNT(*) as vendor_count,
  COUNT(DISTINCT v.thumbnail_url) as unique_thumbnails,
  COUNT(vi.id) as total_images
FROM vendor v
LEFT JOIN vendor_image vi ON v.id = vi.vendor_id
GROUP BY v.category
ORDER BY v.category;

-- 각 카테고리별 샘플 확인 (처음 20개)
SELECT 
  v.id,
  v.category,
  v.name,
  v.thumbnail_url,
  COUNT(vi.id) as image_count
FROM vendor v
LEFT JOIN vendor_image vi ON v.id = vi.vendor_id
GROUP BY v.id, v.category, v.name, v.thumbnail_url
ORDER BY v.category, v.name
LIMIT 20;
