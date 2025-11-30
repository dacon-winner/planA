-- =========================================================
-- [메이크업] 데이터 Bulk Insert 스크립트
-- =========================================================
-- 총 30개 업체, 각 업체별 서비스 상품 포함
-- 작성일: 2024
-- =========================================================

-- 1. 끌로에 (Chloe)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '끌로에', 
    '서울시 강남구 삼성로 772 로데오빌딩 3F', 
    '강남/청담', 
    '02-512-5797', 
    '대표: 김선진 / 전문적인 헤어 & 메이크업 서비스', 
    37.52360238, 127.0480223
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1100000, true),
  (v_id, '촬영+본식 (원장) Premium', 1320000, true),
  (v_id, '본식 (원장)', 550000, false),
  (v_id, '본식 (원장) Premium', 660000, false),
  (v_id, '촬영 (원장)', 550000, false),
  (v_id, '촬영 (원장) Premium', 660000, false);
END $$;

-- 2. 순수 청담본점 (Soonsoo)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '순수 청담본점', 
    '서울시 강남구 도산대로 61길 4(청담동)', 
    '강남/청담', 
    '02-518-6221', 
    '대표: 최수경 / 트렌디한 웨딩 스타일링', 
    37.5241328, 127.0431018
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 990000, true),
  (v_id, '촬영+본식 (원장)', 1210000, true),
  (v_id, '촬영+본식 (원장) Premium', 1540000, true),
  (v_id, '본식 (실장)', 655000, false),
  (v_id, '본식 (원장)', 710000, false),
  (v_id, '본식 (원장) Premium', 1100000, false),
  (v_id, '촬영 (실장)', 655000, false),
  (v_id, '촬영 (원장)', 710000, false),
  (v_id, '촬영 (원장) Premium', 1100000, false);
END $$;

-- 3. 이경민포레 홍대점
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '이경민포레 홍대점', 
    '서울시 마포구 월드컵로5길 10 1층', 
    '마포/홍대', 
    '02-337-7444', 
    '대표: 최용석', 
    37.55191041, 126.9116495
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1200000, true),
  (v_id, '본식 (원장)', 600000, false),
  (v_id, '촬영 (원장)', 600000, false);
END $$;

-- 4. 고센뷰티 (Goshen Beauty)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '고센뷰티', 
    '서울특별시 강남구 신사동 634-9, 영빌딩', 
    '강남/신사', 
    '02-547-3307', 
    '대표: 김기열', 
    37.52646413, 127.0337449
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1320000, true),
  (v_id, '촬영+본식 (원장)', 1540000, true),
  (v_id, '촬영+본식 (원장) Premium', 1760000, true),
  (v_id, '본식 (실장)', 660000, false),
  (v_id, '본식 (원장)', 770000, false),
  (v_id, '본식 (원장) Premium', 880000, false),
  (v_id, '촬영 (실장)', 660000, false),
  (v_id, '촬영 (원장)', 770000, false),
  (v_id, '촬영 (원장) Premium', 880000, false);
END $$;

-- 5. 정샘물 이스트점 (Jungsaemmool East)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '정샘물 이스트점', 
    '서울시 강남구 도산대로81길 57 (청담동)', 
    '강남/청담', 
    '02-518-8100', 
    '대표: 김미희 / K-Beauty의 중심', 
    37.52728882, 127.0453107
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1230000, true),
  (v_id, '촬영+본식 (원장)', 1340000, true),
  (v_id, '촬영+본식 (원장) Premium', 1450000, true),
  (v_id, '본식 (실장)', 695000, false),
  (v_id, '본식 (원장)', 750000, false),
  (v_id, '본식 (원장) Premium', 860000, false),
  (v_id, '촬영 (실장)', 695000, false),
  (v_id, '촬영 (원장)', 750000, false),
  (v_id, '촬영 (원장) Premium', 860000, false);
END $$;

-- 6. 고바이씬 (Gobuythin)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '고바이씬', 
    '서울특별시 강남구 청담동 19-4 (전층)', 
    '강남/청담', 
    '02-545-1982', 
    '대표: 정현석', 
    37.52225403, 127.0430968
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1210000, true),
  (v_id, '촬영+본식 (원장)', 1430000, true),
  (v_id, '본식 (실장)', 660000, false),
  (v_id, '본식 (원장)', 770000, false),
  (v_id, '촬영 (실장)', 660000, false),
  (v_id, '촬영 (원장)', 770000, false);
END $$;

-- 7. 드이희 (De Ihee)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '드이희', 
    '서울시 강남구 청담동 85-3 남한강빌딩 3층 302호', 
    '강남/청담', 
    '010-5577-5345', 
    '대표: 이희', 
    37.52508894, 127.0400493
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1760000, true),
  (v_id, '본식 (원장)', 880000, false),
  (v_id, '촬영 (원장)', 880000, false);
END $$;

-- 8. 보보리스 (Boboris)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '보보리스', 
    '서울시 강남구 언주로 154길 14', 
    '강남/언주', 
    '070-8844-0988', 
    '대표: 유영숙', 
    37.52321515, 127.0345506
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '본식 (원장)', 910000, false),
  (v_id, '촬영+본식 (원장)', 1110000, true),
  (v_id, '촬영+본식 (원장) Premium', 1310000, true),
  (v_id, '본식 (원장) Type B', 715000, false),
  (v_id, '촬영 (원장)', 710000, false),
  (v_id, '촬영 (원장) Premium', 910000, false);
END $$;

-- 9. 위스도산 x 에스휴
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '위스도산 x 에스휴', 
    '서울시 강남구 언주로 807 지하 1층', 
    '강남/언주', 
    '02-3448-3007', 
    '대표: 안장규', 
    37.52240763, 127.0331171
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 880000, true),
  (v_id, '촬영+본식 (원장)', 1100000, true),
  (v_id, '촬영+본식 (원장) Premium', 1320000, true),
  (v_id, '본식 (실장)', 440000, false),
  (v_id, '본식 (원장)', 550000, false),
  (v_id, '본식 (원장) Premium', 660000, false),
  (v_id, '촬영 (실장)', 440000, false),
  (v_id, '촬영 (원장)', 550000, false),
  (v_id, '촬영 (원장) Premium', 660000, false);
END $$;

-- 10. 아라알레스 (Ara Allès)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '아라알레스', 
    '서울시 강남구 신사동 646-2 : 2F', 
    '강남/신사', 
    '02-545-8701', 
    '대표: 진철관', 
    37.5256585, 127.036023
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 740000, true),
  (v_id, '촬영+본식 (원장)', 795000, true),
  (v_id, '본식 (실장)', 455000, false),
  (v_id, '촬영 (실장)', 455000, false),
  (v_id, '본식 (원장)', 510000, false),
  (v_id, '촬영 (원장)', 510000, false);
END $$;

-- 11. 에포트 (Effort)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '에포트', 
    '서울 강남구 선릉로111길 8 (논현동, 윙갤러리 빌딩) B1F', 
    '강남/논현', 
    '02-3446-8085', 
    '대표: 한동규', 
    37.51098241, 127.0427871
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식', 880000, true),
  (v_id, '본식', 455000, false),
  (v_id, '촬영', 455000, false),
  (v_id, '촬영+본식 Premium', 895000, true),
  (v_id, '촬영 Premium', 477000, false),
  (v_id, '본식 Premium', 477000, false);
END $$;

-- 12. 김청경 헤어페이스 (Kim Chung Kyung)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '김청경 헤어페이스', 
    '서울시 강남구 도산대로 75길 21, 3층', 
    '강남/청담', 
    '02-3446-2700', 
    '대표: 김청경', 
    37.52558939, 127.045436
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1710000, true),
  (v_id, '촬영 (원장)', 955000, false),
  (v_id, '본식 (원장)', 955000, false),
  (v_id, '촬영+본식 (원장) Type B', 3165000, true),
  (v_id, '촬영+본식 (원장) Type C', 2145000, true),
  (v_id, '촬영+본식 (원장) Type D', 2565000, true);
END $$;

-- 13. KJ스타일
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    'KJ스타일', 
    '서울시 강남구 압구정로50길 18, 3층(신사동)', 
    '강남/압구정', 
    '02-3445-6351', 
    '대표: 강정', 
    37.52722427, 127.0377316
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1540000, true),
  (v_id, '본식 (원장)', 770000, false),
  (v_id, '촬영 (원장)', 770000, false),
  (v_id, '촬영+본식 (원장) Premium', 2000000, true),
  (v_id, '본식 (원장) Premium', 1000000, false),
  (v_id, '촬영 (원장) Premium', 1000000, false);
END $$;

-- 14. 뷰티진동희 청담점
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '뷰티진동희 청담점', 
    '서울시 강남구 도산대로 435 2층', 
    '강남/청담', 
    '02-516-4474', 
    '대표: 진동희', 
    37.52402515, 127.0432893
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1430000, true),
  (v_id, '본식 (원장)', 880000, false),
  (v_id, '촬영 (원장)', 880000, false),
  (v_id, '촬영', 550000, false),
  (v_id, '본식', 550000, false),
  (v_id, '촬영+본식', 880000, true);
END $$;

-- 15. 더페트라
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '더페트라', 
    '서울시 강남구 선릉로 148길 41 제이일레븐 5층', 
    '강남/선릉', 
    '02-3443-0777', 
    '대표: 김미연', 
    37.52296753, 127.0428804
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '본식 (실장)', 440000, false);
END $$;

-- 16. 앤드뮤
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '앤드뮤', 
    '서울시 강남구 신사동 623 B1', 
    '강남/신사', 
    '02-1544-7442', 
    '대표: 김창균', 
    37.52575966, 127.0326782
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영 (실장)', 505000, false),
  (v_id, '촬영 (원장)', 600000, false),
  (v_id, '촬영 (원장) Premium', 700000, false),
  (v_id, '촬영+본식 (실장)', 870000, true),
  (v_id, '촬영+본식 (원장)', 1070000, true),
  (v_id, '촬영+본식 (원장) Premium', 1270000, true),
  (v_id, '본식 (실장)', 505000, false),
  (v_id, '본식 (원장)', 600000, false),
  (v_id, '본식 (원장) Premium', 700000, false);
END $$;

-- 17. 모아위
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '모아위', 
    '서울시 강남구 선릉로 153길 13 한조빌딩 4층', 
    '강남/선릉', 
    '02-512-0548', 
    '대표: 강주희', 
    37.52463127, 127.0383035
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영 (원장)', 370000, false),
  (v_id, '본식 (원장)', 370000, false),
  (v_id, '촬영+본식 (원장)', 640000, true);
END $$;

-- 18. 제니하우스 청담힐
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '제니하우스 청담힐', 
    '서울시 강남구 선릉로 146길 56 (청담동)', 
    '강남/청담', 
    '02-512-1492', 
    '대표: 현순애', 
    37.52133791, 127.0442625
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 2050000, true),
  (v_id, '촬영+본식 (원장) Premium', 1820000, true),
  (v_id, '촬영+본식 (실장)', 1595000, true),
  (v_id, '본식 (원장)', 1140000, false),
  (v_id, '본식 (원장) Premium', 1025000, false),
  (v_id, '본식 (실장)', 913000, false);
END $$;

-- 19. 제이와이 (JY)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '제이와이', 
    '서울 강남구 압구정로60길 17-14', 
    '강남/압구정', 
    '0507-1383-3764', 
    '대표: 이지유', 
    37.52572279, 127.04289
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 660000, true),
  (v_id, '촬영 (실장)', 440000, false),
  (v_id, '본식 (실장)', 440000, false),
  (v_id, '촬영+본식 (원장)', 880000, true),
  (v_id, '촬영 (원장)', 660000, false),
  (v_id, '본식 (원장)', 660000, false),
  (v_id, '촬영+본식 (원장) Premium', 1100000, true),
  (v_id, '촬영 (원장) Premium', 880000, false),
  (v_id, '본식 (원장) Premium', 880000, false);
END $$;

-- 20. 터치바이해리 (Touch by Harry)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '터치바이해리', 
    '서울 강남구 도산대로 55길 52 금학빌딩 5층', 
    '강남/청담', 
    '02-516-2227', 
    '대표: 장유리', 
    37.52678689, 127.0413123
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1210000, true),
  (v_id, '촬영 (실장)', 715000, false),
  (v_id, '본식 (실장)', 715000, false),
  (v_id, '촬영+본식 (원장)', 1590000, true),
  (v_id, '촬영 (원장)', 935000, false),
  (v_id, '본식 (원장)', 935000, false),
  (v_id, '촬영+본식 (원장) Premium', 2310000, true),
  (v_id, '촬영 (원장) Premium', 1375000, false),
  (v_id, '본식 (원장) Premium', 1375000, false);
END $$;

-- 21. 르보청담 (Lebo Cheongdam)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '르보청담', 
    '서울 강남구 선릉로162길 27-1', 
    '강남/선릉', 
    '02-512-3737', 
    '대표: 박의환', 
    37.52681018, 127.0427131
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '본식 (실장)', 1100000, false),
  (v_id, '촬영 (실장)', 1100000, false),
  (v_id, '촬영+본식 (실장)', 2200000, true),
  (v_id, '본식 (원장)', 1320000, false),
  (v_id, '촬영 (원장)', 1320000, false),
  (v_id, '촬영+본식 (원장)', 2640000, true);
END $$;

-- 22. 히나프 (Hinap)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '히나프', 
    '서울 강남구 선릉로148길 21 (청담동) 3-5층', 
    '강남/청담', 
    '02-3445-0907', 
    '대표: 황명희, 강미영, 박선미', 
    null, null
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1100000, true),
  (v_id, '촬영+본식 (원장)', 1210000, true),
  (v_id, '촬영+본식 (원장) Premium', 1430000, true),
  (v_id, '본식 (실장)', 715000, false),
  (v_id, '촬영 (실장)', 715000, false),
  (v_id, '본식 (원장)', 825000, false),
  (v_id, '촬영 (원장)', 825000, false),
  (v_id, '본식 (원장) Premium', 935000, false),
  (v_id, '촬영 (원장) Premium', 935000, false);
END $$;

-- 23. 우현증메르시 (Woohyunjeung Merci)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '우현증메르시', 
    '서울특별시 강남구 신사동 628-2 4층', 
    '강남/신사', 
    '02-546-7745', 
    '대표: 우다예', 
    37.52219079, 127.0316863
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 2000000, true),
  (v_id, '본식 (원장)', 1000000, false),
  (v_id, '촬영 (원장)', 1000000, false),
  (v_id, '촬영+본식 (원장) Type B', 1600000, true),
  (v_id, '촬영 (원장) Type B', 800000, false),
  (v_id, '본식 (원장) Type B', 800000, false),
  (v_id, '촬영+본식 (원장) Premium', 3000000, true),
  (v_id, '본식 (원장) Premium', 1500000, false),
  (v_id, '촬영 (원장) Premium', 1500000, false);
END $$;

-- 24. 로쉬 (Losh)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '로쉬', 
    '서울시 강남구 논현로 158길 29-1', 
    '강남/논현', 
    '02-540-2240', 
    '대표: 김선미', 
    37.52226293, 127.0307912
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1650000, true),
  (v_id, '촬영 (원장)', 990000, false),
  (v_id, '본식 (원장)', 990000, false),
  (v_id, '촬영+본식 (실장)', 990000, true),
  (v_id, '본식 (실장)', 550000, false),
  (v_id, '촬영 (실장)', 550000, false);
END $$;

-- 25. 빈헤어앤메이크업 (Vin Hair&Makeup)
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '빈헤어앤메이크업', 
    '서울시 강남구 선릉로 145길3 우림빌딩4층', 
    '강남/선릉', 
    '02-511-0260', 
    '대표: 김경희, 김혜연', 
    37.52142167, 127.0392664
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영 (원장)', 670000, false),
  (v_id, '본식 (원장)', 670000, false);
END $$;

-- 26. 정샘물 에비뉴엘 명동점
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '정샘물 에비뉴엘 명동점', 
    '서울 중구 남대문로 73 (남대문로2가, AVENUEL) 롯데 에비뉴엘 백화점 10층', 
    '중구/명동', 
    '02-2118-6222', 
    '대표: 강효준', 
    37.56424509, 126.9817815
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 1980000, true),
  (v_id, '본식 (원장)', 990000, false),
  (v_id, '촬영 (원장)', 990000, false),
  (v_id, '촬영+본식', 1320000, true),
  (v_id, '본식', 660000, false),
  (v_id, '촬영', 660000, false);
END $$;

-- 27. 유림메이크업앤헤어
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '유림메이크업앤헤어', 
    '서울시 강남구 삼성로133길 15 (청담동, 근정 빌딩) 6-7층', 
    '강남/청담', 
    '02-547-1367', 
    '대표: 김미경', 
    null, null
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 770000, true),
  (v_id, '촬영 (실장)', 660000, false),
  (v_id, '본식 (실장)', 660000, false);
END $$;

-- 28. 라메종뷰티
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '라메종뷰티', 
    '서울 강남구 청담동 84-21 지하1층', 
    '강남/청담', 
    '02-512-3001', 
    '대표: 이종문', 
    37.52678728, 127.0409849
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (실장)', 1110000, true),
  (v_id, '촬영+본식 (원장)', 1320000, true),
  (v_id, '촬영+본식 (원장) Premium', 1540000, true),
  (v_id, '촬영+본식', 990000, true),
  (v_id, '본식', 550000, false),
  (v_id, '본식 (실장)', 660000, false),
  (v_id, '본식 (원장)', 770000, false),
  (v_id, '본식 (원장) Premium', 880000, false),
  (v_id, '촬영', 550000, false),
  (v_id, '촬영 (실장)', 660000, false),
  (v_id, '촬영 (원장)', 770000, false),
  (v_id, '촬영 (원장) Premium', 880000, false);
END $$;

-- 29. 헤움 수원점
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '헤움 수원점', 
    '경기도 수원시 영통구 영통동 959-6 지하 1층', 
    '경기/수원', 
    '010-4487-2125', 
    '대표: 박홍진', 
    37.25354752, 127.0725232
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영+본식 (원장)', 580000, true),
  (v_id, '본식 (원장)', 380000, false),
  (v_id, '촬영 (원장)', 380000, false);
END $$;

-- 30. 아르즈청담
DO $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO "vendor" (
    "category", "name", "address", "region", "phone", "introduction", "latitude", "longitude"
  ) VALUES (
    'MAKEUP', 
    '아르즈청담', 
    '서울 강남구 청담동 2-10 6층', 
    '강남/청담', 
    '02-3445-5678', 
    '대표: 양예선', 
    37.5229628, 127.0407086
  ) RETURNING id INTO v_id;

  INSERT INTO "service_item" ("vendor_id", "name", "price", "is_package") VALUES
  (v_id, '촬영', 1320000, false),
  (v_id, '본식', 1320000, false);
END $$;