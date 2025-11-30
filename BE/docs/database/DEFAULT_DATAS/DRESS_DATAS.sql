-- Transaction block for Dress
DO $$
DECLARE v_id uuid;
BEGIN

-- [1] 더에이미
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '더에이미', '서울 강남구 선릉로152길 25 2층', '서울', '0507-1396-3024', 37.52448443, 127.0416939)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더에이미';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1610000, false);

-- [2] 더화이트 엘리자베스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '더화이트 엘리자베스', '서울 강남구 선릉로 739 엘리자베스빌딩 3층', '서울', '02-518-8051', 37.52024674, 127.0398749)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더화이트 엘리자베스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식 + 촬영', 2110000, false);

-- [3] 디 아일
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '디 아일', '서울 강남구 선릉로 820 남한강빌딩 2층 201호', '서울', '02-3447-2076', 37.52506612, 127.0401037)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '디 아일';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '정보 없음', 0, false);

-- [4] 라비노체
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '라비노체', '서울 강남구 선릉로 710 3,4층', '서울', '0507-1439-6878', 37.51835779, 127.0411747)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '라비노체';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2000000, false);

-- [5] 라포레
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '라포레', '서울 강남구 선릉로145길 5-11 4층~6층', '서울', '0507-1364-3051', 37.52077845, 127.0395132)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '라포레';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 2660000, false);

-- [6] 레이나모라
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '레이나모라', '서울 강남구 선릉로145길 16 동성빌딩 5층', '서울', '0507-1417-4104', 37.52157181, 127.0380769)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '레이나모라';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1900000, false);

-- [7] 레이앤코
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '레이앤코', '서울 강남구 압구정로72길 25 5층', '서울', '0507-1313-7924', 37.52487414, 127.0452916)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '레이앤코';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2200000, false);

-- [8] 로우케이x더뷸라
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '로우케이x더뷸라', '서울 강남구 도산대로99길 17 MS빌딩 3F', '서울', '0507-1402-3445', 37.52598426, 127.0516693)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로우케이x더뷸라';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2000000, false);

-- [9] 로브드K
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '로브드K', '서울 강남구 도산대로 427 파모소빌딩 4층', '서울', '02-545-5870', 37.52399037, 127.042567)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로브드K';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1720000, false);

-- [10] 로자스포사
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '로자스포사', '서울 강남구 압구정로79길 20 4층', '서울', '0507-1466-6555', 37.52505835, 127.048802)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로자스포사';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2400000, false);

-- [11] 로즈로사 청담본점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '로즈로사 청담본점', '서울 강남구 도산대로57길 20 오페라하우스 2층', '서울', '0507-1423-6979', 37.5248966, 127.0416716)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로즈로사 청담본점';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2550000, false);

-- [12] 루이즈블랑
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '루이즈블랑', '서울 강남구 도산대로55길 24 4층', '서울', '02-547-9413', 37.52506682, 127.0407033)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '루이즈블랑';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1760000, false);

-- [13] 르메르 by 노비아웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '르메르 by 노비아웨딩', '서울 강남구 도산대로54길 6', '서울', '02-514-9981', 37.5222759, 127.0383211)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르메르 by 노비아웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 2330000, false);

-- [14] 르블랑 웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '르블랑 웨딩', '서울 강남구 선릉로152길 18 3층 르블랑 웨딩', '서울', '02-517-0214', 37.52405761, 127.0409471)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르블랑 웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2200000, false);

-- [15] 르네 아뜰리에
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '르네 아뜰리에', '서울 강남구 도산대로54길 17 4층', '서울', '02-547-5584', 37.5216157, 127.0388245)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르네 아뜰리에';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1420000, false);

-- [16] 리안마리
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '리안마리', '서울 강남구 도산대로83길 17 3층', '서울', '0507-1313-1706', 37.52555956, 127.04817)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '리안마리';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1750000, false);

-- [17] 마틴드세븐
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '마틴드세븐', '서울 강남구 도산대로57길 8 4층', '서울', '02-515-3091', 37.52413854, 127.0414154)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '마틴드세븐';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1210000, false);

-- [18] 메이제인바이김영주
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '메이제인바이김영주', '서울 강남구 도산대로61길 27 3층', '서울', '02-544-2880', 37.52568405, 127.0431245)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '메이제인바이김영주';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1630000, false);

-- [19] 모니카블랑쉬
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '모니카블랑쉬', '서울 강남구 선릉로146길 15 헤비히터 빌딩 3층', '서울', '02-3445-3444', 37.52208442, 127.0409505)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '모니카블랑쉬';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 1520000, false);

-- [20] 모네뜨아르
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '모네뜨아르', '서울 강남구 압구정로 449 청하빌딩', '서울', '0507-1483-5548', 37.5262414, 127.0464825)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '모네뜨아르';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 1050000, false);

-- [21] 모리엠포티
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '모리엠포티', '서울 강남구 도산대로75길 26 2층', '서울', '02-514-2573', 37.52592101, 127.0455343)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '모리엠포티';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1580000, false);

-- [22] 니니슈아
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '니니슈아', '서울 강남구 도산대로99길 27-4 청담 SM타워 2층', '서울', '02-3444-8055', 37.52611709, 127.0507814)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '니니슈아';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1800000, false);

-- [23] 니콜스포사
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '니콜스포사', '서울 강남구 선릉로152길 32 6층', '서울', '0507-1411-8010', 37.52422475, 127.0422142)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '니콜스포사';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1320000, false);

-- [24] 누벨드블랑
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '누벨드블랑', '서울 강남구 도산대로 435 삼이빌딩 9층', '서울', '02-3444-4138', 37.52402524, 127.0432899)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '누벨드블랑';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1870000, false);

-- [25] 브라이드메르시
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '브라이드메르시', '서울 강남구 도산대로81길 46 성원빌딩 2층', '서울', '02-541-0222', 37.52720368, 127.0464379)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '브라이드메르시';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1940000, false);

-- [26] 브라이드손윤희
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '브라이드손윤희', '서울 강남구 도산대로54길 29 SONYUNHUI', '서울', '02-515-4520', 37.52074613, 127.0391602)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '브라이드손윤희';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2830000, false);

-- [27] 브라이덜 수지
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '브라이덜 수지', '서울 강남구 선릉로148길 48 미준빌딩 4층', '서울', '02-549-6369', 37.5227683, 127.0434215)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '브라이덜 수지';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 910000, false);

-- [28] 블랑코노비아
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '블랑코노비아', '서울 강남구 선릉로145길 13 2층 1호', '서울', '02-546-5960', 37.521155, 127.0385506)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '블랑코노비아';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 1650000, false);

-- [29] 비비드블랑
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '비비드블랑', '서울 강남구 선릉로137길 5 1~2층', '서울', '02-3444-8902', 37.5190646, 127.0399579)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '비비드블랑';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1600000, false);

-- [30] 보다이승진웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '보다이승진웨딩', '서울 강남구 압구정로79길 37-5 이승진', '서울', '0507-1373-6645', 37.51400913, 127.0227172)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '보다이승진웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2420000, false);

-- [31] 셀렉션H
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '셀렉션H', '서울 강남구 압구정로60길 18 4층', '서울', '02-3446-2322', 37.52615668, 127.041713)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '셀렉션H';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2090000, false);

-- [32] 셀린 아뜰리에
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '셀린 아뜰리에', '서울 강남구 압구정로80길 30 삼도빌딩 4층', '서울', '0507-1407-2511', 37.52477718, 127.0443571)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '셀린 아뜰리에';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1720000, false);

-- [33] 소노 SONO
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '소노 SONO', '서울 강남구 선릉로 753 2층', '서울', '02-515-9355', 37.52191829, 127.0392988)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '소노 SONO';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2530000, false);

-- [34] 시그니처B
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '시그니처B', '서울 강남구 학동로 209 2층', '서울', '02-546-1128', 37.51456386, 127.0317957)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '시그니처B';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1210000, false);

-- [35] 시그니처 엘리자베스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '시그니처 엘리자베스', '서울 강남구 선릉로 739 엘리자베스빌딩 4층', '서울', '02-540-6877', 37.52024674, 127.0398749)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '시그니처 엘리자베스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌', 2750000, false);

-- [36] 시작바이이명순
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '시작바이이명순', '서울 강남구 선릉로152길 37 4층', '서울', '02-511-1011', 37.52462011, 127.0427223)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '시작바이이명순';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2330000, false);

-- [37] 아비가일웨딩드레스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '아비가일웨딩드레스', '서울 강남구 도산대로54길 5 학일빌딩 1층', '서울', '02-548-1844', 37.52241682, 127.0384823)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아비가일웨딩드레스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1410000, false);

-- [38] 아르하
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '아르하', '서울 강남구 도산대로63길 18 1층', '서울', '0507-1483-6675', 37.52496575, 127.0436818)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아르하';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1750000, false);

-- [39] 아뜰리에 로리에
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '아뜰리에 로리에', '서울 강남구 선릉로152길 33 테이블2025 빌딩 20건물 3층', '서울', '0507-1400-7633', 37.52474097, 127.0423683)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아뜰리에 로리에';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1800000, false);

-- [40] 아이테오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '아이테오', '서울 강남구 삼성로 726 4층', '서울', '02-3445-3442', 37.52053135, 127.0496599)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아이테오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2060000, false);

-- [41] 안나스포사
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '안나스포사', '서울 강남구 선릉로 727 NK빌딩 2층', '서울', '02-3444-7960', 37.51946817, 127.0401708)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '안나스포사';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1120000, false);

-- [42] 에스메랄다 웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '에스메랄다 웨딩', '서울 강남구 압구정로72길 25', '서울', '02-548-4751', 37.52486512, 127.0453097)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '에스메랄다 웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2500000, false);

-- [43] 에토프꾸뛰르
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '에토프꾸뛰르', '서울 강남구 선릉로152길 33 테이블 2025빌딩 20건물 1층', '서울', '0507-1432-2050', 37.52474727, 127.0423864)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '에토프꾸뛰르';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2530000, false);

-- [44] 이브스 더데이
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '이브스 더데이', '서울 강남구 도산대로54길 47 B1', '서울', '02-6204-2151', 37.51968102, 127.0395601)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '이브스 더데이';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 910000, false);

-- [45] 이네스이든
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '이네스이든', '서울 강남구 봉은사로29길 35 B1', '서울', '02-6925-4470', 37.50959884, 127.033558)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '이네스이든';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 3300000, false);

-- [46] 쥬빌리브라이드
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '쥬빌리브라이드', '서울 강남구 도산대로75길 11 3층', '서울', '02-518-7268', 37.52501362, 127.0457487)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '쥬빌리브라이드';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2000000, false);

-- [47] 제이미브라이드
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '제이미브라이드', '서울 강남구 압구정로80길 34 원일빌딩 2층', '서울', '0507-1427-8831', 37.5247332, 127.0439125)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '제이미브라이드';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2530000, false);

-- [48] 제이바이루시
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '제이바이루시', '서울 강남구 선릉로 719 4층', '서울', '02-512-8258', 37.51891306, 127.0404511)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '제이바이루시';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식드레스 1벌, 턱시도 1벌', 800000, false);

-- [49] 제시카로렌
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '제시카로렌', '서울 강남구 도산대로 409 P층 13층', '서울', '02-515-8305', 37.52371359, 127.0404853)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '제시카로렌';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2000000, false);

-- [50] 조슈아벨브라이덜
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '조슈아벨브라이덜', '서울 강남구 선릉로152길 11 세진빌딩 2층', '서울', '02-517-8067', 37.52431007, 127.0404313)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '조슈아벨브라이덜';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 1500000, false);

-- [51] 켈리손윤희
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '켈리손윤희', '서울 강남구 도산대로54길 29', '서울', '02-515-4412', 37.52074613, 127.0391602)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '켈리손윤희';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2620000, false);

-- [52] 클라라웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '클라라웨딩', '서울 강남구 언주로170길 25', '서울', '02-514-7600', 37.52681907, 127.0357604)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '클라라웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2000000, false);

-- [53] 클라우디아웨딩컴퍼니
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '클라우디아웨딩컴퍼니', '서울 강남구 도산대로63길 18', '서울', '02-511-3909', 37.52681907, 127.0357604)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '클라우디아웨딩컴퍼니';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영드레스 3벌', 2240000, false);

-- [54] 크리드제이
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '크리드제이', '서울 강남구 삼성로149길 3-7 DD빌딩 F1~F5', '서울', '0507-1315-4191', 37.52290732, 127.0474036)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '크리드제이';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2200000, false);

-- [55] 펠리스 노비아
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '펠리스 노비아', '서울 강남구 선릉로145길 13 3층', '서울', '02-512-5960', 37.52118423, 127.0385292)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '펠리스 노비아';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1390000, false);

-- [56] 플로렌스웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '플로렌스웨딩', '서울 강남구 압구정로80길 34 원일빌딩 5층', '서울', '0507-1472-4246', 37.524753, 127.0439657)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '플로렌스웨딩';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 1650000, false);

-- [57] 하우스오브에이미 청담본점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '하우스오브에이미 청담본점', '서울 강남구 선릉로152길 25 위빌딩 3층', '서울', '0507-1377-8576', 37.524753, 127.0439657)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '하우스오브에이미 청담본점';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 2200000, false);

-- [58] 헤리티크뉴욕
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '헤리티크뉴욕', '서울 강남구 도산대로45길 16-9', '서울', '02-514-4010', 37.52365376, 127.0360553)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '헤리티크뉴욕';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '본식 + 촬영', 2500000, false);

-- [59] 황정아웨딩 앤 드레스부티크
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('DRESS', '황정아웨딩 앤 드레스부티크', '서울 강남구 선릉로 830 1층', '서울', '02-541-8811', 37.52601116, 127.0404424)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '황정아웨딩 앤 드레스부티크';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '촬영 + 본식드레스 4벌', 3480000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '가봉스냅드레스 3벌', 1750000, false);

END $$;