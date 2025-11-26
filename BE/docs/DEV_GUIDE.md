# 📘 개발 가이드 및 DB 테이블 명세서 (MVP)
본 문서는 해커톤 MVP 스펙에 맞춰 최적화된 데이터베이스 설계와 핵심 비즈니스 로직 구현 가이드를 다룹니다.

## 1. 핵심 구현 로직 (Business Logic)

### A. RAG 기반 AI 추천 시스템 (Cost-Effective)
API 비용 절감과 응답 속도 향상을 위해 **2단계 필터링 구조**를 사용합니다.

1. **1차 필터링 (DB Level):**
   - `ai_resource` 테이블에서 유저의 `preferred_region` 및 `budget_limit`에 맞는 데이터를 SQL `WHERE` 절로 1차 조회합니다. (약 2,000개 -> 20개로 후보 압축)
   - **SQL 예시:** `SELECT * FROM ai_resource WHERE category='studio' AND metadata->>'region' = '강남구' LIMIT 20;`

2. **2차 추천 (LLM Level):**
   - 1차에서 뽑힌 20개의 `content` 텍스트를 프롬프트에 주입(Context Injection)합니다.
   - **Prompt:** "여기 후보 20개가 있어. 유저 취향(화려한, 가성비)에 맞는 베스트 4개를 뽑아서 JSON으로 줘."

3. **로깅 (Logging):**
   - AI 응답이 오면 `ai_log` 테이블에 `input_tokens`와 `output_tokens`를 저장하여 API 비용을 추적합니다.

### B. 회원가입 및 가상 결제
(기존 내용 유지...)

---

## 2. 테이블 상세 명세 (Table Specification)

### 🤖 10. AI RAG & Logs (신규 추가)

| 테이블명 | 주요 컬럼 | 설명 |
| :--- | :--- | :--- |
| **ai_resource** | `content`, `metadata` | AI에게 먹여줄 **지식 데이터**. `vendor` 테이블의 정보를 문장형으로 가공하여 저장. |
| **ai_log** | `model_name`, `total_tokens` | API 비용 관리용. 누가, 언제, 얼마나 썼는지 기록. |


작성일: 2025.11.26
작성자: 김동언