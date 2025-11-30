-- Transaction block for Venues
DO $$
DECLARE v_id uuid;
BEGIN

-- [1] 상록아트홀
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '상록아트홀', '서울 강남구 역삼동 701 : 5F', '서울', '02-564-5757', 37.50386172, 127.0431617)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '상록아트홀';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '뷔페', 250, 98000, 9800000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [2] 더베르G
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더베르G', '서울 영등포구 당산동3가 2-7 : 코레일유통 사옥', '서울', '02-2088-5272', 37.5257952, 126.9020539)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더베르G';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '더베르가든', '뷔페', 250, 110000, 16000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [3] Lavre Ednia(라브르 에드니아)
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', 'Lavre Ednia(라브르 에드니아)(26.5월 오픈예정)', '서울 송파구 잠실동 196-11 : 파워개발(주) 잠실사옥', '서울', '02-6952-2244', 37.50839792, 127.079587)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = 'Lavre Ednia(라브르 에드니아)(26.5월 오픈예정)';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀 (조감도)', '양식', 300, 150000, 12000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [4] 더화이트베일
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더화이트베일', '서울 서초구 서초동 1445-14 : (주)진로', '서울', '02-3474-5000', 37.48354166, 127.0176761)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더화이트베일';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '화이트베일홀', '뷔페', 250, 85000, 9500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [5] 르비르모어 선릉
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '르비르모어 선릉', '서울 강남구 대치동 889-5 : 샹제리제센터A동 2층', '서울', '02-501-7000', 37.50438099, 127.049964)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르비르모어 선릉';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '클리타홀', '뷔페', 300, 118000, 14000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [6] 더파티움 여의도
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더파티움 여의도', '서울 영등포구 여의도동 16-2 : 중소기업중앙회', '서울', '02-784-0000', 37.52819958, 126.9226561)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더파티움 여의도';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '파티움홀(2관)', '한식', 300, 121000, 16500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [7] 그랜드힐컨벤션
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '그랜드힐컨벤션', '서울 강남구 대치동 1004-3', '서울', '02-6964-7889', 37.50615713, 127.0670948)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '그랜드힐컨벤션';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '양식', 250, 99000, 16000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [8] 노블발렌티_대치점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '노블발렌티_대치점', '서울 강남구 대치동 983-1 : 해암빌딩 L1F', '서울', '02-539-0400', 37.5031994, 127.0649976)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노블발렌티_대치점';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, 'Chapel Hall', '뷔페', 300, 98000, 12000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [9] 더뉴컨벤션웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더뉴컨벤션웨딩', '서울 강서구 내발산동 655', '서울', '02-1661-3303 (예약실 1번)', 37.556084, 126.836821)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더뉴컨벤션웨딩';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '제니스홀(26년 9월 오픈)', '뷔페', 200, 82000, 9000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [10] 강남마리아쥬스퀘어
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '강남마리아쥬스퀘어', '서울 강남구 논현동 92 : SB타워(CGV청담 씨네시티 맞은편)', '서울', '02-541-5007', 37.521976, 127.03634)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '강남마리아쥬스퀘어';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독 홀 조감도(26년 3월 오픈)', '한식', 300, 89000, 6600000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [11] 아르베웨딩(구.벨라비타)
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '아르베웨딩(구.벨라비타)', '서울 강남구 역삼동 680 : SK리더스뷰 1F', '서울', '02-564-7031', 37.508655, 127.039396)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아르베웨딩(구.벨라비타)';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '라피네홀', '뷔페', 200, 38000, 2500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [12] 세인트메리스 강남
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '세인트메리스 강남', '서울 서초구 방배동 481-5 : 삼영빌딩5층', '서울', '02-587-8999', 37.47557236, 126.988519)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '세인트메리스 강남';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '양식', 200, 120000, 24230000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [13] 하우스 오브 더 라움
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '하우스 오브 더 라움', '<br>서울 광진구 자양동 2-3 : 더 라움 펜트하우스', '서울', '02-6457-8100', 37.53836236, 127.0693132)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '하우스 오브 더 라움';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '벨루스홀', '뷔페', 200, 130000, 15000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [14] 빌라드지디 수서
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '빌라드지디 수서', '서울 강남구 율현동 68-8', '서울', '02-543-2555', 37.47414877, 127.1150991)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '빌라드지디 수서';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '르씨엘', '뷔페', 300, 99000, 12000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [15] 웨딩시티 신도림점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '웨딩시티 신도림점', '서울 구로구 구로5동 3-25 : 신도림테크노마트 8F', '서울', '02-2111-8000', 37.507043, 126.890218)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '웨딩시티 신도림점';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '뷔페', 220, 63000, 8000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [16] SW컨벤션센터
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', 'SW컨벤션센터', '서울 종로구 창신동 328-18 : 시즌빌딩 11F', '서울', '02-3673-5000', 37.5717, 127.015185)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = 'SW컨벤션센터';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '뷔페', 200, 66000, 5000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [17] 스타시티아트홀
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '스타시티아트홀', '서울 광진구 화양동 4-20 : 스타시티영존 5F', '서울', '02-430-8000', 37.54065, 127.071412)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '스타시티아트홀';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '한식', 300, 85000, 9000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [18] 토브헤세드
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '토브헤세드', '서울 강남구 논현동 72-8', '서울', '02-516-2300', 37.51854919, 127.0327439)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '토브헤세드';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '뷔페', 100, 114000, 12950000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [19] 아벤티움서울
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '아벤티움서울', '서울 중구 중림동 355 : 브라운스톤서울 3F', '서울', '02-313-2480', 37.560777, 126.968213)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아벤티움서울';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '채플홀', '뷔페', 250, 85000, 8000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [20] 보타닉파크웨딩
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '보타닉파크웨딩', '서울 강서구 마곡동 760 : 보타닉푸르지오시티 B2F', '서울', '02-2662-8300', 37.56729217, 126.8269578)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '보타닉파크웨딩';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '오키드홀', '뷔페', 250, 86000, 7900000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [21] 지타워컨벤션
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '지타워컨벤션', '서울 구로구 구로동 832 : 지타워몰 2F', '서울', '02-432-9000', 37.4798477, 126.8953185)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '지타워컨벤션';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '뷔페', 300, 120000, 21000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [22] 아펠가모 잠실점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '아펠가모 잠실점', '서울 송파구 신천동 7-11 : 한국광고문화회관', '서울', '02-2144-0230 (예약실 2번)', 37.515829, 127.099227)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아펠가모 잠실점';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '뷔페', 300, 100000, 10000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [23] 서울웨딩타워
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '서울웨딩타워', '서울 송파구 가락동 600', '서울', '02-463-5000', 37.49348425, 127.1115057)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '서울웨딩타워';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '퓨전 코스', 350, 95000, 10500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [24] 엘리에나호텔
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '엘리에나호텔', '서울 강남구 논현동 152', '서울', '02-3443-5670(예약실 2번)', 37.51111312, 127.0314119)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '엘리에나호텔';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '양식', 200, 151800, 16500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [25] 엘로라 인 가든
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '엘로라 인 가든', '서울 송파구 충민로 52 : 가든파이브웍스', '서울', '02-2047-1100', 37.47771763, 127.122746)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '엘로라 인 가든';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '뷔페', 200, 79000, 7900000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [26] 더베일리하우스 삼성점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더베일리하우스 삼성점', '서울 강남구 삼성동 168-3', '서울', '02-539-2956', 37.509887, 127.063171)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더베일리하우스 삼성점';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '베일리', '뷔페', 300, 110000, 1500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [27] 더베뉴지서울
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더베뉴지서울', '서울 강서구 등촌동 678-14', '서울', '02-2657-2100(내선1)/02-2657-2200~1(하우스웨딩)', 37.560172, 126.839303)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더베뉴지서울';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '베뉴지홀', '뷔페', 150, 73000, 3500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [28] 보테가마지오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '보테가마지오', '서울 성동구 성수동1가 685-696 : 갤러리아 포레 B2F', '서울', '02-3409-0123', 37.545743, 127.04246)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '보테가마지오';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '로스타뇨홀', '뷔페', 300, 110000, 15000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [29] 성균관컨벤션
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '성균관컨벤션', '서울 종로구 명륜3가 53', '서울', '02-744-0677/02-722-0678', 37.5857992, 126.9957384)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '성균관컨벤션';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '전통혼례실', '뷔페', 200, 75000, 2100000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [30] 호텔파크하비오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '호텔파크하비오', '서울 송파구 문정동 618', '서울', '02-6346-2000', 37.48060576, 127.1236654)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '호텔파크하비오';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '양식', 200, 98000, 12000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [31] 노블발렌티_삼성점
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '노블발렌티_삼성점', '서울 강남구 삼성동 109-6', '서울', '02-540-0711/02-540-0712/02-540-0713', 37.515284, 127.064806)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노블발렌티_삼성점';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, 'The Classic', '양식', 300, 100000, 13000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [32] 온즈드롬 합정
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '온즈드롬 합정', '서울 마포구 합정동 379-4 : 주니비노 호텔(저스티나)', '서울', '02-515-9040', 37.54772848, 126.9108814)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '온즈드롬 합정';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '저스티나', '양식', 150, 108000, 16000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [33] 월드컵컨벤션
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '월드컵컨벤션', '서울 마포구 성산동 515 : 월드컵주경기장', '서울', '02-3152-7700', 37.56828845, 126.897273)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '월드컵컨벤션';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '임페리얼볼룸', '뷔페', 250, 85000, 7500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [34] 더채플앳대치
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '더채플앳대치', '서울 강남구 대치동 1008-3 : YD318', '서울', '02-554-1121 (예약실 2번)', 37.50301835, 127.06699)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '더채플앳대치';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '단독홀', '뷔페', 200, 132000, 17820000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [35] 빌라드지디 논현(구.빌라드지디 강남)
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '빌라드지디 논현(구.빌라드지디 강남)', '서울 강남구 논현동 247-4', '서울', '02-547-3381', 37.514057, 127.037257)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '빌라드지디 논현(구.빌라드지디 강남)';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '가든홀', '뷔페', 200, 95000, 500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [36] 케이터틀
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '케이터틀', '서울 마포구 신수동 63-14', '서울', '02-715-3611 (예약실 1번)', 37.552459, 126.937826)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '케이터틀';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '컨벤션홀', '뷔페', 200, 79000, 7900000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [37] 노보텔앰배서더서울강남
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '노보텔앰배서더서울강남', '서울 강남구 역삼동 603', '서울', '02-531-6622', 37.50524, 127.028883)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노보텔앰배서더서울강남';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '샴페인', '양식', 70, 100000, 5000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [38] 빌라드지디 청담
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '빌라드지디 청담', '서울 강남구 청담동 73-4', '서울', '02-542-7513', 37.52018639, 127.055456)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '빌라드지디 청담';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '앙피레홀', '양식', 270, 130000, 17000000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [39] HW컨벤션
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', 'HW컨벤션', '서울 종로구 부암동 186-2', '서울', '02-396-7000', 37.59721777, 126.9620929)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = 'HW컨벤션';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '그랜드볼룸', '양식', 200, 93000, 14500000)
ON CONFLICT (vendor_id) DO NOTHING;

-- [40] 르메르디앙 서울 명동
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('VENUE', '르메르디앙 서울 명동', '서울 중구 충무로1가 21-17', '서울', '010-9250-2348', 37.56170946, 126.9826747)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르메르디앙 서울 명동';
INSERT INTO "vendor_venue_detail" (vendor_id, hall_type, meal_type, min_guarantee, meal_cost, rental_fee)
VALUES (v_id, '미드 센추리 룸', '한식', 10, 120000, 6000000)
ON CONFLICT (vendor_id) DO NOTHING;

END $$;