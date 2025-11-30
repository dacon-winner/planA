-- 테스트 데이터 정리 스크립트
-- 실행: psql -d plana -f scripts/cleanup-test-data.sql

BEGIN;

-- 1. 테스트 이메일로 생성된 사용자 관련 데이터 삭제
DELETE FROM ai_log 
WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE 'test.%@example.com'
);

DELETE FROM plan_item 
WHERE plan_id IN (
  SELECT id FROM plan WHERE user_id IN (
    SELECT id FROM users WHERE email LIKE 'test.%@example.com'
  )
);

DELETE FROM plan 
WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE 'test.%@example.com'
);

DELETE FROM users_info 
WHERE user_id IN (
  SELECT id FROM users WHERE email LIKE 'test.%@example.com'
);

DELETE FROM users 
WHERE email LIKE 'test.%@example.com';

-- 2. 결과 확인
SELECT 
  '사용자' as type, COUNT(*) as count FROM users
UNION ALL
SELECT 'UsersInfo', COUNT(*) FROM users_info
UNION ALL
SELECT 'Plan', COUNT(*) FROM plan
UNION ALL
SELECT 'PlanItem', COUNT(*) FROM plan_item
UNION ALL
SELECT 'AI Log', COUNT(*) FROM ai_log
ORDER BY type;

COMMIT;

\echo ''
\echo '✅ 테스트 데이터 정리 완료!'

