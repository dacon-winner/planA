-- =========================================================
-- [4] SEED DATA 적재 (시트 데이터)
-- =========================================================

-- 1. 웨딩홀 (VENUE) 예시 데이터
DO $$
DECLARE
  new_vendor_id uuid;
BEGIN
  -- 1) 기본 정보 삽입
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction",
    "parking_info", "transport_info", "latitude", "longitude", "thumbnail_url"
  ) VALUES (
    'VENUE', 
    '더 채플 앳 논현',      
    '서울 강남구 논현로 549', 
    '강남/논현',            
    '02-123-4567',        
    '채플 스타일의 웅장한 웨딩홀입니다.', 
    '500대 가능',          
    '언주역 도보 3분',      
    37.508, 127.034,      
    'https://example.com/venue_thumb.jpg'         
  ) RETURNING id INTO new_vendor_id;

  -- 2) 웨딩홀 상세 정보 삽입
  INSERT INTO "vendor_venue_detail" (
    "vendor_id", 
    "hall_type",        
    "meal_type",        
    "min_guarantee",    
    "meal_cost",        
    "rental_fee",       
    "ceremony_interval",
    "ceremony_form"     
  ) VALUES (
    new_vendor_id, 
    'BRIGHT', 'BUFFET', 250, 65000, 5000000, 90, 'SEPARATE'
  );
  
  -- 3) 추가 비용 정보 (발렛 등)
  INSERT INTO "vendor_cost_detail" ("vendor_id", "valet_fee") 
  VALUES (new_vendor_id, 5000); 

END $$;

-- 2. 스튜디오 (STUDIO) 예시 데이터
DO $$
DECLARE
  new_vendor_id uuid;
BEGIN
  -- 1) 기본 정보
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction",
    "thumbnail_url"
  ) VALUES (
    'STUDIO', 
    '클로드 원스', 
    '서울 강남구 청담동 123-45', 
    '청담', 
    '02-555-5555', 
    '인물 중심의 깔끔한 사진을 추구합니다.',
    'https://example.com/studio_thumb.jpg'
  ) RETURNING id INTO new_vendor_id;

  -- 2) 비용 상세 정보 (헬퍼비, 원본비 등)
  INSERT INTO "vendor_cost_detail" (
    "vendor_id",
    "helper_fee",         
    "original_file_fee",  
    "modified_file_fee",  
    "valet_fee"           
  ) VALUES (
    new_vendor_id,
    250000, 440000, 110000, 5000
  );
END $$;

-- 3. 드레스 (DRESS) 예시 데이터
DO $$
DECLARE
  new_vendor_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "thumbnail_url"
  ) VALUES (
    'DRESS', '로즈로사', '서울 강남구 청담동 88-1', '청담', '02-777-7777', 'https://example.com/dress_thumb.jpg'
  ) RETURNING id INTO new_vendor_id;

  INSERT INTO "vendor_cost_detail" (
    "vendor_id",
    "fitting_fee",  
    "helper_fee",   
    "valet_fee"
  ) VALUES (
    new_vendor_id,
    50000, 250000, 5000
  );
END $$;

-- 4. 메이크업 (MAKEUP) 예시 데이터
DO $$
DECLARE
  new_vendor_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "thumbnail_url"
  ) VALUES (
    'MAKEUP', '애브뉴준오', '서울 강남구 청담동 63-14', '청담', '02-888-8888', 'https://example.com/makeup_thumb.jpg'
  ) RETURNING id INTO new_vendor_id;

  INSERT INTO "vendor_cost_detail" (
    "vendor_id",
    "early_start_fee",  
    "valet_fee"
  ) VALUES (
    new_vendor_id,
    55000, 5000
  );
END $$;

-- 5. 나머지 시트 데이터는 위 DO BLOCK 패턴을 반복하여 추가합니다.

-- 버전: 1.0.0
-- 작성일: 2025.11.30
-- 작성자: 김동언
-- 설명: PlanA 웨딩 플래닝 서비스 PostgreSQL 스키마
-- 참조: docs/database/DATABASE.md
--  