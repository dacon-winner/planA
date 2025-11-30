-- Transaction block for Studio
DO $$
DECLARE v_id uuid;
BEGIN

-- [1] 아르센스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '아르센스튜디오', '서울 강남구 도산대로49길 36 3층, 4층, 5층', '서울', '02-518-6179', 37.5253022, 127.0371738)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아르센스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아르센', 1520000, false);

-- [2] 아키스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '아키스튜디오', '서울 강남구 논현로105길 11-1', '서울', '02-514-8879', 37.5056705, 127.0332961)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아키스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아트&키치', 1460000, false);

-- [3] 앤드류권 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '앤드류권 스튜디오', '서울 강남구 학동로21길 52 지하1층, 지상1층, 2층', '서울', '02-548-7217', 37.5163086, 127.026342)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '앤드류권 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '하프데이', 2500000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '원데이', 3100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '올데이', 4800000, false);

-- [4] 유하하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '유하하우스', '서울 광진구 능동로 154', '서울', '0507-1397-0813', 37.544547, 127.0731039)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '유하하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 1800000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 2100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입', 2600000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입', 3700000, false);

-- [5] 이브로제하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '이브로제하우스', '서울 강남구 언주로122길 17', '서울', '02-516-8806', 37.5123313, 127.0374366)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '이브로제하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 2000000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 2300000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입', 2600000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입', 3900000, false);

-- [6] 제이로그 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '제이로그 스튜디오', '서울 강남구 학동로14길 12 4/5층', '서울', '02-6956-2334', 37.5117046, 127.0257692)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '제이로그 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '제이로그', 1520000, false);

-- [7] 줄리의정원스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '줄리의정원스튜디오', '서울 강남구 봉은사로47길 53', '서울', '02-544-0888', 37.5132369, 127.0399051)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '줄리의정원스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Vol.3', 1630000, false);

-- [8] 지엥마지
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '지엥마지', '서울 강남구 선릉로127길 11-6', '서울', '0507-1313-2644', 37.5150656, 127.0407091)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '지엥마지';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 1900000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 2200000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입', 2500000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입', 3800000, false);

-- [9] 클레스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '클레스튜디오', '서울 강남구 논현로131길 37 5층', '서울', '02-514-3530', 37.5137008, 127.0274734)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '클레스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 1600000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 1800000, false);

-- [10] 클레이앤클레어
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '클레이앤클레어', '서울 강남구 학동로3길 30', '서울', '02-547-5405', 37.513729, 127.0220837)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '클레이앤클레어';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오전', 1795000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오후', 1995000, false);

-- [11] 테라스스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '테라스스튜디오', '서울 강남구 선릉로135길 13-3', '서울', '0507-1401-8541', 37.4770536, 127.0364806)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '테라스스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '테라스', 1190000, false);

-- [12] 테오그라피
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '테오그라피', '서울 성북구 성북로23가길 12', '서울', '02-541-3458', 37.5921962, 126.9946058)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '테오그라피';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '베이직 20P', 1080000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '프로포즈 20P', 1190000, false);

-- [13] 세미앙
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '세미앙', '서울 강남구 강남대로128길 67 2, 7층', '서울', '0507-1392-9486', 37.5121891, 127.0267953)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '세미앙';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '퍼스트세미앙', 1630000, false);

-- [14] 페레스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '페레스튜디오', '서울 강남구 도산대로24길 20 1층', '서울', '02-3446-7667', 37.5175938, 127.0266323)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '페레스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아띠랑스', 1240000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '기본', 1350000, false);

-- [15] 플레하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '플레하우스', '서울 강남구 봉은사로47길 57', '서울', '02-6953-0303', 37.5134531, 127.0398328)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '플레하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '드플레', 1570000, false);

-- [16] 피아스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '피아스튜디오', '서울 강남구 강남대로128길 67 4,6층', '서울', '0507-1472-1252', 37.5121963, 127.0267976)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '피아스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '그와나 vol.2', 1520000, false);

-- [17] 해밀스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '해밀스튜디오', '서울 강남구 선릉로162길 39', '서울', '-', 37.5264532, 127.0437255)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '해밀스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '해밀', 1240000, false);

-- [18] 스튜디오S
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '스튜디오S', '서울 서초구 신반포로41길 7 JW빌딩', '서울', '0507-1349-7860', 37.5101893, 127.0167233)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '스튜디오S';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'TAKE 19', 1520000, false);

-- [19] 헤로하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '헤로하우스', '서울 강남구 삼성로122길 29', '서울', '02-794-5258', 37.5185387, 127.0547681)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '헤로하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '헤로하우스', 1520000, false);

-- [20] 허밍스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '허밍스튜디오', '경기 하남시 미사동로 102-123', '서울', '0507-1302-8698', 37.5719078, 127.2072206)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '허밍스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '허밍', 1630000, false);

-- [21] 스튜디오휴일
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '스튜디오휴일', '서울 중랑구 망우로70길 118', '서울', '-', 37.5947846, 127.1054481)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '스튜디오휴일';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '휴일', 1140000, false);

-- [22] 아우어스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '아우어스튜디오', '서울 강남구 영동대로114길 13', '서울', '0507-1315-7580', 37.5156426, 127.060968)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '아우어스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아우어', 1190000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아우어스위트홈', 1300000, false);

-- [23] 어바웃제인
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '어바웃제인', '서울 강남구 봉은사로55길 35', '서울', '02-451-5044', 37.4529729, 127.0764888)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '어바웃제인';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '20P', 1410000, false);

-- [24] 어뮤즈하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '어뮤즈하우스', '서울 강남구 언주로79길 8 1층', '서울', '02-547-0709', 37.4994683, 127.0433017)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '어뮤즈하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '어뮤즈', 1520000, false);

-- [25] 에이프릴스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '에이프릴스튜디오', '서울 서초구 양재천로29길 11 3층', '서울', '02-572-0809', 37.4794052, 127.0419538)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '에이프릴스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '에이브릴', 1190000, false);

-- [26] 에밀리
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '에밀리', '서울 강남구 봉은사로6길 15 1층', '서울', '02-552-2024', 37.5195154, 127.0214168)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '에밀리';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '에밀리', 1410000, false);

-- [27] 원규스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '원규스튜디오', '서울 강남구 영동대로118길 66', '서울', '02-518-6232', 37.517818, 127.0635941)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '원규스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '원규', 1410000, false);

-- [28] 원세컨드 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '원세컨드 스튜디오', '서울 강남구 영동대로 342 덕유빌딩', '서울', '0507-1413-7304', 37.505201, 127.0657209)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '원세컨드 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '드레스, 한복, 헬퍼 포함', 1820000, false);

-- [29] 온뜰에피움스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '온뜰에피움스튜디오', '서울 강남구 논현로140길 21 B2', '서울', '02-3443-8825', 37.5172364, 127.0309982)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '온뜰에피움스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '온뜰에피움', 1190000, false);

-- [30] 일드한남
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '일드한남', '서울 용산구 이태원로55길 43-8 1층', '서울', '070-8691-3461', 37.5377599, 126.9987554)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '일드한남';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오전', 1760000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오후', 1980000, false);

-- [31] 이경호 포토그라피
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '이경호 포토그라피', '서울 강남구 자곡로7길 12-3', '서울', '0507-1312-2528', 37.4737197, 127.099389)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '이경호 포토그라피';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Style C (실내하프)', 1750000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Style D (야외하프)', 2000000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Style B (하프앤하프)', 2500000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Style A (원데이)', 3500000, false);

-- [32] 꼬모스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '꼬모스튜디오', '서울 용산구 이태원로55길 43-8 2층', '서울', '070-8691-3558', 37.5377599, 126.9987554)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '꼬모스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '꼬모', 1740000, false);

-- [33] 꼼쎄보 마리아주
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '꼼쎄보 마리아주', '서울 강남구 삼성로149길 8 B1', '서울', '02-515-5502', 37.523431, 127.0469514)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '꼼쎄보 마리아주';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '라 로즈 20P', 3300000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '르 블랑 20P', 4500000, false);

-- [34] 구호스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '구호스튜디오', '서울 성동구 아차산로15길 47-38 1층', '서울', '0507-1333-5282', 37.5474251, 127.0631666)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '구호스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '구호', 1140000, false);

-- [35] 글랑디 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '글랑디 스튜디오', '서울 강남구 봉은사로30길 43 3층', '서울', '02-6490-1717', 37.5047614, 127.0362419)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '글랑디 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '글랑디', 1630000, false);

-- [36] 글렌하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '글렌하우스', '서울 강남구 봉은사로105길 54-4', '서울', '0507-1371-8078', 37.5178077, 127.0607683)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '글렌하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '글렌', 1740000, false);

-- [37] 그림비스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '그림비스튜디오', '경기 하남시 미사동로37번길 64', '서울', '-', 37.572997, 127.200486)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '그림비스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'YOUR', 1300000, false);

-- [38] 그레이스케일 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '그레이스케일 스튜디오', '서울 강남구 선릉로132길 19-10 전층', '서울', '02-516-8824', 37.5186345, 127.0431974)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '그레이스케일 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '아른', 1520000, false);

-- [39] 노아고즈
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '노아고즈', '서울 강남구 삼성로148길 10 3,4층', '서울', '02-516-8806', 37.5237105, 127.048619)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노아고즈';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 1800000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 2100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입', 2400000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입', 3700000, false);

-- [40] 노올스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '노올스튜디오', '서울 강남구 논현로145길 36 1층', '서울', '070-4280-8755', 37.517079, 127.0259521)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노올스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '4시간, 앨범 미포함', 1300000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '20P', 1630000, false);

-- [41] 노트레세느
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '노트레세느', '서울 강남구 자곡로7길 12-3', '서울', '070-5220-4332', 37.4737084, 127.0994417)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '노트레세느';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'DAY (야간씬 불가)', 1530000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'EVENING (야간씬 가능)', 1980000, false);

-- [42] 느와르블랑하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '느와르블랑하우스', '서울 강남구 학동로25길 38', '서울', '0507-1479-8445', 37.5160721, 127.0282581)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '느와르블랑하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입', 1850000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입', 2100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입', 2400000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입', 3800000, false);

-- [43] 디하우스스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '디하우스스튜디오', '서울 강남구 논현로145길 28', '서울', '02-3446-7707', 37.5174979, 127.0264465)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '디하우스스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '디하우스', 1570000, false);

-- [44] 라앤디스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '라앤디스튜디오', '서울 강남구 테헤란로19길 33-10', '서울', '0507-1324-8912', 37.5023911, 127.032322)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '라앤디스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '라앤디', 1850000, false);

-- [45] 라크마스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '라크마스튜디오', '서울 강남구 봉은사로47길 58', '서울', '02-544-0898', 37.5135071, 127.0400975)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '라크마스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '라크마', 1740000, false);

-- [46] 스튜디오랑게
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '스튜디오랑게', '서울 강남구 도산대로57길 24', '서울', '02-514-8351', 37.5252556, 127.0418346)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '스튜디오랑게';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '랑게', 1300000, false);

-- [47] 레이디로즈스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '레이디로즈스튜디오', '서울 강남구 도산대로38길 50', '서울', '0507-1440-5536', 37.5174305, 127.0328715)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '레이디로즈스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오전 촬영', 1410000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오후 촬영', 1630000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '프리미엄', 2840000, false);

-- [48] 로브아스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '로브아스튜디오', '서울 강남구 봉은사로30길 43 5층', '서울', '02-514-2347', 37.5047614, 127.0362407)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로브아스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '로브아', 1520000, false);

-- [49] LOG_A
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', 'LOG_A', '서울 강남구 학동로42길 17 3층', '서울', '0507-1375-3530', 37.5144179, 127.036573)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = 'LOG_A';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '30P', 3300000, false);

-- [50] 로이스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '로이스튜디오', '서울 강남구 도산대로38길 30 1층', '서울', '0507-1315-1941', 37.5188632, 127.0325678)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '로이스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '화목애', 1300000, false);

-- [51] 마르니나인 바이 루브르네프
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '마르니나인 바이 루브르네프', '서울 강남구 논현로 664 7,9,10층', '서울', '0507-1315-4395', 37.5135304, 127.0312571)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '마르니나인 바이 루브르네프';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '세미', 1210000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '수석실장', 2090000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '홍혜전 대표', 3080000, false);

-- [52] 루미에르 레브
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '루미에르 레브', '서울 강남구 논현로136길 14 B1', '서울', '02-6204-7071', 37.5160326, 127.0312307)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '루미에르 레브';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '6', 1520000, false);

-- [53] 루미에 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '루미에 스튜디오', '서울 강남구 테헤란로13길 61', '서울', '0507-1323-5491', 37.5032656, 127.0304337)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '루미에 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '루미에', 1300000, false);

-- [54] 루시드웬디
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '루시드웬디', '서울 강남구 봉은사로6길 15', '서울', '02-516-9211', 37.5040232, 127.0271203)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '루시드웬디';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '베이직', 1880000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '프리미엄', 4000000, false);

-- [55] 르안스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '르안스튜디오', '서울 강남구 선릉로152길 11', '서울', '02-516-2886', 37.5242984, 127.0404565)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르안스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '르안', 1300000, false);

-- [56] 르필름
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '르필름', '서울 강남구 봉은사로 317', '서울', '0507-1419-0934', 37.5099747, 127.0415999)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '르필름';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'project C (야외)', 1860000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'project B (스튜디오)', 2200000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'project A (하프)', 2420000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'project S (원데이)', 3960000, false);

-- [57] 리애스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '리애스튜디오', '서울 성동구 둘레21길 15 1, 2층', '서울', '0507-1350-2063', 37.53428, 127.0075352)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '리애스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오전', 2000000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '오후', 2300000, false);

-- [58] 메리드하우스
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '메리드하우스', '서울 강남구 테헤란로13길 38 1층, B1', '서울', '0507-1480-7855', 37.5020939, 127.0317621)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '메리드하우스';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '메리드', 1300000, false);

-- [59] 메이든스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '메이든스튜디오', '서울 강남구 압구정로46길 35', '서울', '02-543-3755', 37.5262639, 127.0362195)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '메이든스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'vol.4', 1460000, false);

-- [60] 메종드힐
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '메종드힐', '서울 강남구 봉은사로16길 37', '서울', '02-568-0822', 37.504039, 127.0288224)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '메종드힐';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '메종드힐', 1410000, false);

-- [61] 모노그램 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '모노그램 스튜디오', '서울 강남구 선릉로127길 22 B1', '서울', '02-517-8988', 37.5153885, 127.0398666)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '모노그램 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '모노그램', 1190000, false);

-- [62] 모닌스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '모닌스튜디오', '서울 강남구 영동대로118길 66 4층', '서울', '02-2088-2897', 37.5178221, 127.0636096)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '모닌스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '모닌', 1740000, false);

-- [63] 실버문스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '실버문스튜디오', '경기 남양주시 고산로 184', '서울', '0507-1385-9431', 37.5939205, 127.185822)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '실버문스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '미네뜨', 1190000, false);

-- [64] 미모아스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '미모아스튜디오', '서울 강남구 테헤란로13길 35', '서울', '02-518-6566', 37.5019027, 127.0315225)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '미모아스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '미모아', 1520000, false);

-- [65] 미세인트스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '미세인트스튜디오', '서울 용산구 유엔빌리지길 200', '서울', '0507-1431-0528', 37.5373518, 127.0136714)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '미세인트스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '미세인트', 1650000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'ONEDAY', 2200000, false);

-- [66] 바로오늘이그날
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '바로오늘이그날', '서울 강남구 봉은사로69길 48', '서울', '02-6204-6677', 37.5150682, 127.0482492)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '바로오늘이그날';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '바로오늘이그날', 1650000, false);

-- [67] 버드투블룸
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '버드투블룸', '서울 강남구 삼성로145길 3 2층', '서울', '0507-1389-7010', 37.5221953, 127.0478861)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '버드투블룸';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '버드투블룸', 1410000, false);

-- [68] 비마이스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '비마이스튜디오', '서울 강남구 역삼로38길 6 4층, 5층', '서울', '0507-1343-6537', 37.497414, 127.0432892)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '비마이스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '비마이', 1520000, false);

-- [69] 비슈어
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '비슈어', '서울 강남구 테헤란로30길 23', '서울', '02-540-3519', 37.4997435, 127.0398074)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '비슈어';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '가든하우스', 1900000, false);

-- [70] 비포원 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '비포원 스튜디오', '서울 강남구 언주로126길 32 B1', '서울', '02-541-9030', 37.5139366, 127.0381409)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '비포원 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '비포원', 1300000, false);

-- [71] 비비엔다 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '비비엔다 스튜디오', '인천 미추홀구 석정로 220 신관', '서울', '032-885-6662', 37.4678624, 126.6599138)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '비비엔다 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '1호점 A타입', 1800000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '1호점 B타입', 2100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '1호점 C타입', 2400000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '1호점 S타입', 3700000, false);

-- [72] 볼라르스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '볼라르스튜디오', '서울 중구 동호로17길 252-21', '서울', '02-6204-6699', 37.5486276, 127.0063598)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '볼라르스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'TYPE A', 1600000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'TYPE B', 1800000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'TYPE C', 2200000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '원데이', 3800000, false);

-- [73] 부겐빌리아
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '부겐빌리아', '서울 강남구 테헤란로13길 52 1층', '서울', '0507-1431-8968', 37.502986, 127.031293)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '부겐빌리아';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '부겐빌리아', 1520000, false);

-- [74] 소에브
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '소에브', '서울 강남구 언주로79길 12 4층', '서울', '-', 37.4993996, 127.0430489)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '소에브';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '소에브', 1190000, false);

-- [75] 소율스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '소율스튜디오', '서울 강남구 봉은사로26길 22-9', '서울', '02-558-6619', 37.5050794, 127.0333547)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '소율스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '소율', 1520000, false);

-- [76] 소피소 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '소피소 스튜디오', '서울 강남구 선릉로112길 5', '서울', '0507-1405-8445', 37.5113775, 127.0440155)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '소피소 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'A타입 20P', 2100000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'B타입 20P', 2500000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'C타입 20P', 2700000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'S타입 30P', 4000000, false);

-- [77] 스투디오 사이
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '스투디오 사이', '서울 강남구 봉은사로105길 54-3', '서울', '02-2138-3442', 37.5180664, 127.0607664)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '스투디오 사이';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '21내츄럴 (슈가제이)', 1190000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '스투디오사이', 1355000, false);

-- [78] 클로드유
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '클로드유', '서울 강남구 압구정로72길 14-4 B1', '서울', '070-7774-3090', 37.5257083, 127.0446926)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '클로드유';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '스튜디오클로드', 1800000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '스튜디오콜레트', 1540000, false);

-- [79] 바시움 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '바시움 스튜디오', '서울 강남구 봉은사로51길 26', '서울', '02-6204-7070', 37.5118952, 127.0426008)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '바시움 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'Mix 앨범', 1300000, false);

-- [80] 이노스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '이노스튜디오', '서울 강남구 언주로164길 38-2', '서울', '02-545-6078', 37.5251456, 127.0365402)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '이노스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '스튜디오이노', 1800000, false);

-- [81] 식스플로어 스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '식스플로어 스튜디오', '서울 강남구 선릉로 817 6층', '서울', '070-4144-3594', 37.5224025, 127.0379687)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '식스플로어 스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '식스플로어', 1410000, false);

-- [82] 섬스튜디오
INSERT INTO "vendor" (category, name, address, region, phone, latitude, longitude)
VALUES ('STUDIO', '섬스튜디오', '경기 하남시 미사동로40번길 33-9', '서울', '02-518-5654', 37.5699226, 127.2027598)
ON CONFLICT DO NOTHING;
SELECT id INTO v_id FROM "vendor" WHERE name = '섬스튜디오';
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, '섬스튜디오', 1350000, false);
INSERT INTO "service_item" (vendor_id, name, price, is_package)
VALUES (v_id, 'GLOW', 1300000, false);

END $$;