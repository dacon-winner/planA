-- ========================================
-- Vendor 이미지 시딩 스크립트
-- 순환 할당(Round-robin) 방식으로 이미지 할당
-- 외부 저장소(i.ibb.co) URL 사용
-- ========================================

-- 1단계: 기존 vendor_image 데이터 삭제 (재실행을 위해)
DELETE FROM vendor_image;

-- 2단계: 썸네일 URL 업데이트 (순환 할당)
WITH 
  -- 외부 저장소 URL 배열 정의
  image_urls AS (
    SELECT 
      'VENUE' as category,
      ARRAY[
        'https://i.ibb.co/0jY16YGs/wedding-Hall01.png',
        'https://i.ibb.co/F4zgxnyX/wedding-Hall02.png',
        'https://i.ibb.co/3LBRJ3d/wedding-Hall03.jpg',
        'https://i.ibb.co/1fhhvfwg/wedding-Hall04.jpg',
        'https://i.ibb.co/fdHvzy7L/wedding-Hall05.jpg',
        'https://i.ibb.co/twGzxsjb/wedding-Hall07.jpg',
        'https://i.ibb.co/rKcb2d2x/wedding-Hall06.jpg',
        'https://i.ibb.co/R4ShNzQt/wedding-Hall08.png',
        'https://i.ibb.co/p6KCYdvc/wedding-Hall09.png',
        'https://i.ibb.co/VfPKRjz/wedding-Hall10.png',
        'https://i.ibb.co/chf5S94M/wedding-Hall11.png',
        'https://i.ibb.co/wNbq6krZ/wedding-Hall12.png',
        'https://i.ibb.co/F408pLXp/wedding-Hall13.png',
        'https://i.ibb.co/ccN1nKyW/wedding-Hall14.png',
        'https://i.ibb.co/pj9pq4LM/wedding-Hall15.png',
        'https://i.ibb.co/DPZvyBF6/wedding-Hall16.png',
        'https://i.ibb.co/nN3v7qQc/wedding-Hall17.png',
        'https://i.ibb.co/fhJrqMK/wedding-Hall18.png',
        'https://i.ibb.co/v4n0bBVN/wedding-Hall19.jpg',
        'https://i.ibb.co/ZpTqvLRy/wedding-Hall20.png'
      ] as urls
    UNION ALL
    SELECT 
      'STUDIO' as category,
      ARRAY[
        'https://i.ibb.co/1fB9p5QP/studio01.jpg',
        'https://i.ibb.co/JR9qqwkm/studio02.jpg',
        'https://i.ibb.co/pBMXjXn8/studio03.png',
        'https://i.ibb.co/JRxBSB5V/studio04.png',
        'https://i.ibb.co/93nTT1jt/studio05.png',
        'https://i.ibb.co/mCM6BBKL/studio06.png',
        'https://i.ibb.co/rf6rZhwk/studio07.png',
        'https://i.ibb.co/Lz9spdsM/studio08.png',
        'https://i.ibb.co/YBxNPkyC/studio09.png',
        'https://i.ibb.co/gbyMY4Jt/studio10.png',
        'https://i.ibb.co/PzVRjGzp/studio11.png',
        'https://i.ibb.co/WWZ5j0tR/studio12.png',
        'https://i.ibb.co/X1YSzr6/studio13.png',
        'https://i.ibb.co/V0QmNb3p/studio14.png',
        'https://i.ibb.co/TBT6vkSL/studio15.png',
        'https://i.ibb.co/gbzjZcJ5/studio16.png',
        'https://i.ibb.co/rGMP7Bh5/studio17.png',
        'https://i.ibb.co/h117cwvX/studio18.png',
        'https://i.ibb.co/qYCLZwZ5/studio19.png',
        'https://i.ibb.co/HpMyXVsL/studio20.png',
        'https://i.ibb.co/xSzqHQ4d/studio21.png',
        'https://i.ibb.co/hR8LxYFJ/studio22.png',
        'https://i.ibb.co/F1Q7CK2/studio23.png'
      ] as urls
    UNION ALL
    SELECT 
      'DRESS' as category,
      ARRAY[
        'https://i.ibb.co/VYBnJ58J/dress02.jpg',
        'https://i.ibb.co/v6FyCXKp/dress01.jpg',
        'https://i.ibb.co/fYX1KdWy/dress03.jpg',
        'https://i.ibb.co/tp4sKPxL/dress04.jpg',
        'https://i.ibb.co/CKrpgMdh/dress05.png',
        'https://i.ibb.co/b5XZHk9j/dress06.png',
        'https://i.ibb.co/k2fdfvF4/dress07.png',
        'https://i.ibb.co/vChHd9DW/dress08.png',
        'https://i.ibb.co/fZ3L5yM/dress09.png',
        'https://i.ibb.co/nMV7VZ8y/dress10.png',
        'https://i.ibb.co/7tBRntzp/dress11.png',
        'https://i.ibb.co/4RT1qwMy/dress12.png',
        'https://i.ibb.co/N6d0ZddJ/dress13.png',
        'https://i.ibb.co/BKGGbNRv/dress14.png',
        'https://i.ibb.co/fjrWQ0q/dress15.png',
        'https://i.ibb.co/Qvx0J4q4/dress16.png',
        'https://i.ibb.co/Q4XzJQZ/dress17.png',
        'https://i.ibb.co/KxF9y5hN/dress19.png',
        'https://i.ibb.co/B2sRz6Kq/dress18.png'
      ] as urls
    UNION ALL
    SELECT 
      'MAKEUP' as category,
      ARRAY[
        'https://i.ibb.co/WNXHR7Pk/makeup01.jpg',
        'https://i.ibb.co/jZLcrm3M/makeup02.jpg',
        'https://i.ibb.co/jvptLSwc/makeup03.jpg',
        'https://i.ibb.co/FLXRJfkM/makeup04.jpg',
        'https://i.ibb.co/v4T06NWP/makeup05.png',
        'https://i.ibb.co/qF3GKnBf/makeup06.png',
        'https://i.ibb.co/fzcdz1ZN/makeup07.png',
        'https://i.ibb.co/B2SPRgsZ/makeup08.png',
        'https://i.ibb.co/FG4QX2z/makeup09.png',
        'https://i.ibb.co/n8VhPHm3/makeup10.png',
        'https://i.ibb.co/q31mzrLL/makeup11.png',
        'https://i.ibb.co/bjsFLFHw/makeup12.png',
        'https://i.ibb.co/5xTQsLwJ/makeup13.png',
        'https://i.ibb.co/jv4SBgyS/makeup14.png',
        'https://i.ibb.co/tp61frQs/makeup15.png',
        'https://i.ibb.co/BVCmhsvx/makeup16.png'
      ] as urls
  ),
  vendor_with_row AS (
    SELECT 
      v.id,
      v.category,
      ROW_NUMBER() OVER (PARTITION BY v.category ORDER BY v.name) as row_num,
      iu.urls,
      array_length(iu.urls, 1) as url_count
    FROM vendor v
    JOIN image_urls iu ON v.category::text = iu.category
  )
UPDATE vendor v
SET thumbnail_url = (
  SELECT vwr.urls[((vwr.row_num - 1) % vwr.url_count) + 1]
  FROM vendor_with_row vwr
  WHERE vwr.id = v.id
);

-- 3단계: vendor_image 테이블에 상세 이미지 삽입 (각 업체당 3개씩, thumbnail 포함)
WITH 
  -- 외부 저장소 URL 배열 정의
  image_urls AS (
    SELECT 
      'VENUE' as category,
      ARRAY[
        'https://i.ibb.co/0jY16YGs/wedding-Hall01.png',
        'https://i.ibb.co/F4zgxnyX/wedding-Hall02.png',
        'https://i.ibb.co/3LBRJ3d/wedding-Hall03.jpg',
        'https://i.ibb.co/1fhhvfwg/wedding-Hall04.jpg',
        'https://i.ibb.co/fdHvzy7L/wedding-Hall05.jpg',
        'https://i.ibb.co/twGzxsjb/wedding-Hall07.jpg',
        'https://i.ibb.co/rKcb2d2x/wedding-Hall06.jpg',
        'https://i.ibb.co/R4ShNzQt/wedding-Hall08.png',
        'https://i.ibb.co/p6KCYdvc/wedding-Hall09.png',
        'https://i.ibb.co/VfPKRjz/wedding-Hall10.png',
        'https://i.ibb.co/chf5S94M/wedding-Hall11.png',
        'https://i.ibb.co/wNbq6krZ/wedding-Hall12.png',
        'https://i.ibb.co/F408pLXp/wedding-Hall13.png',
        'https://i.ibb.co/ccN1nKyW/wedding-Hall14.png',
        'https://i.ibb.co/pj9pq4LM/wedding-Hall15.png',
        'https://i.ibb.co/DPZvyBF6/wedding-Hall16.png',
        'https://i.ibb.co/nN3v7qQc/wedding-Hall17.png',
        'https://i.ibb.co/fhJrqMK/wedding-Hall18.png',
        'https://i.ibb.co/v4n0bBVN/wedding-Hall19.jpg',
        'https://i.ibb.co/ZpTqvLRy/wedding-Hall20.png'
      ] as urls
    UNION ALL
    SELECT 
      'STUDIO' as category,
      ARRAY[
        'https://i.ibb.co/1fB9p5QP/studio01.jpg',
        'https://i.ibb.co/JR9qqwkm/studio02.jpg',
        'https://i.ibb.co/pBMXjXn8/studio03.png',
        'https://i.ibb.co/JRxBSB5V/studio04.png',
        'https://i.ibb.co/93nTT1jt/studio05.png',
        'https://i.ibb.co/mCM6BBKL/studio06.png',
        'https://i.ibb.co/rf6rZhwk/studio07.png',
        'https://i.ibb.co/Lz9spdsM/studio08.png',
        'https://i.ibb.co/YBxNPkyC/studio09.png',
        'https://i.ibb.co/gbyMY4Jt/studio10.png',
        'https://i.ibb.co/PzVRjGzp/studio11.png',
        'https://i.ibb.co/WWZ5j0tR/studio12.png',
        'https://i.ibb.co/X1YSzr6/studio13.png',
        'https://i.ibb.co/V0QmNb3p/studio14.png',
        'https://i.ibb.co/TBT6vkSL/studio15.png',
        'https://i.ibb.co/gbzjZcJ5/studio16.png',
        'https://i.ibb.co/rGMP7Bh5/studio17.png',
        'https://i.ibb.co/h117cwvX/studio18.png',
        'https://i.ibb.co/qYCLZwZ5/studio19.png',
        'https://i.ibb.co/HpMyXVsL/studio20.png',
        'https://i.ibb.co/xSzqHQ4d/studio21.png',
        'https://i.ibb.co/hR8LxYFJ/studio22.png',
        'https://i.ibb.co/F1Q7CK2/studio23.png'
      ] as urls
    UNION ALL
    SELECT 
      'DRESS' as category,
      ARRAY[
        'https://i.ibb.co/VYBnJ58J/dress02.jpg',
        'https://i.ibb.co/v6FyCXKp/dress01.jpg',
        'https://i.ibb.co/fYX1KdWy/dress03.jpg',
        'https://i.ibb.co/tp4sKPxL/dress04.jpg',
        'https://i.ibb.co/CKrpgMdh/dress05.png',
        'https://i.ibb.co/b5XZHk9j/dress06.png',
        'https://i.ibb.co/k2fdfvF4/dress07.png',
        'https://i.ibb.co/vChHd9DW/dress08.png',
        'https://i.ibb.co/fZ3L5yM/dress09.png',
        'https://i.ibb.co/nMV7VZ8y/dress10.png',
        'https://i.ibb.co/7tBRntzp/dress11.png',
        'https://i.ibb.co/4RT1qwMy/dress12.png',
        'https://i.ibb.co/N6d0ZddJ/dress13.png',
        'https://i.ibb.co/BKGGbNRv/dress14.png',
        'https://i.ibb.co/fjrWQ0q/dress15.png',
        'https://i.ibb.co/Qvx0J4q4/dress16.png',
        'https://i.ibb.co/Q4XzJQZ/dress17.png',
        'https://i.ibb.co/KxF9y5hN/dress19.png',
        'https://i.ibb.co/B2sRz6Kq/dress18.png'
      ] as urls
    UNION ALL
    SELECT 
      'MAKEUP' as category,
      ARRAY[
        'https://i.ibb.co/WNXHR7Pk/makeup01.jpg',
        'https://i.ibb.co/jZLcrm3M/makeup02.jpg',
        'https://i.ibb.co/jvptLSwc/makeup03.jpg',
        'https://i.ibb.co/FLXRJfkM/makeup04.jpg',
        'https://i.ibb.co/v4T06NWP/makeup05.png',
        'https://i.ibb.co/qF3GKnBf/makeup06.png',
        'https://i.ibb.co/fzcdz1ZN/makeup07.png',
        'https://i.ibb.co/B2SPRgsZ/makeup08.png',
        'https://i.ibb.co/FG4QX2z/makeup09.png',
        'https://i.ibb.co/n8VhPHm3/makeup10.png',
        'https://i.ibb.co/q31mzrLL/makeup11.png',
        'https://i.ibb.co/bjsFLFHw/makeup12.png',
        'https://i.ibb.co/5xTQsLwJ/makeup13.png',
        'https://i.ibb.co/jv4SBgyS/makeup14.png',
        'https://i.ibb.co/tp61frQs/makeup15.png',
        'https://i.ibb.co/BVCmhsvx/makeup16.png'
      ] as urls
  ),
  vendor_with_row AS (
    SELECT 
      v.id,
      v.category,
      ROW_NUMBER() OVER (PARTITION BY v.category ORDER BY v.name) as row_num,
      iu.urls,
      array_length(iu.urls, 1) as url_count
    FROM vendor v
    JOIN image_urls iu ON v.category::text = iu.category
  )
INSERT INTO vendor_image (id, vendor_id, image_url, role, sort_order)
SELECT 
  gen_random_uuid(),
  vwr.id,
  -- 순환 할당: (row_num - 1 + offset) % url_count + 1 인덱스의 URL 선택
  vwr.urls[(((vwr.row_num - 1 + img_offset.offset) % vwr.url_count) + 1)],
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
