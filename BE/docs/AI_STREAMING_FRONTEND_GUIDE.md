# AI 스트리밍 프론트엔드 연결 가이드

> **작성일**: 2025.12.01  
> **최종 수정일**: 2025.12.01  
> **버전**: 1.0.0

---

## 📋 개요

LangChain을 사용하여 AI 추천 프로세스를 **실시간 스트리밍**으로 프론트엔드에 전달하는 방법을 안내합니다.

### 주요 특징

- **Server-Sent Events (SSE)** 프로토콜 사용
- **실시간 진행 상황** 표시 가능
- **LangChain 기반** 스트리밍
- **비동기 처리**로 사용자 경험 향상
- **에러 핸들링** 포함

### 왜 스트리밍인가?

```
기존 방식 (HTTP 요청/응답):
[프론트엔드] ──→ 요청 ──→ [백엔드 AI 처리... 30초] ──→ 응답 ──→ [프론트엔드]
                           ⚠️ 사용자는 30초간 기다림

스트리밍 방식 (SSE):
[프론트엔드] ──→ 연결 ──→ [백엔드]
             ←── "후보 업체 찾는 중..." ←──
             ←── "AI 분석 중..." ←──
             ←── "스튜디오 선택: A스튜디오" ←──
             ←── "드레스 선택: B드레스" ←──
             ←── "완료!" ←──
✅ 사용자는 실시간으로 진행 상황 확인
```

---

## 🏗️ 아키�ecture

### 백엔드 구조

```
[AiController]
   ↓ @Sse('recommend/stream')
   ↓ Server-Sent Events 엔드포인트
   ↓
[AiService.streamRecommendation()]
   ↓ AsyncGenerator 사용
   ↓
   ├─→ 1. DB에서 후보 업체 추출
   │      └─→ yield "progress" 이벤트
   │
   ├─→ 2. LangChain 모델 초기화
   │      ├─→ ChatOpenAI (streaming: true)
   │      └─→ yield "progress" 이벤트
   │
   ├─→ 3. 스트림으로 AI 응답 수신
   │      └─→ yield "chunk" 이벤트 (여러 번)
   │
   └─→ 4. 결과 파싱 및 완료
          └─→ yield "complete" 이벤트
```

### 이벤트 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| `progress` | 진행 상황 메시지 | "후보 업체를 찾았습니다..." |
| `chunk` | AI 응답의 일부 (스트리밍) | `{"studio": {"vendor_id"` |
| `complete` | 추천 완료 (최종 데이터) | 전체 추천 결과 객체 |
| `error` | 에러 발생 | "추천 시스템 오류..." |

---

## 🚀 API 명세

### 엔드포인트

```
POST /api/v1/ai/recommend/stream
```

### 인증

```
Authorization: Bearer {access_token}
```

### 요청 본문

```typescript
interface RecommendationRequest {
  wedding_date?: Date | string;       // 결혼 예정일 (선택)
  preferred_region?: string;          // 선호 지역 (선택)
  budget_limit?: number;              // 예산 한도 (선택)
}
```

### 응답 형식 (SSE)

SSE는 `text/event-stream` 형식으로 데이터를 전송합니다:

```
data: {"type":"progress","message":"후보 업체를 찾았습니다...","data":{"studio":5,"dress":8,"makeup":6,"venue":4}}

data: {"type":"progress","message":"AI가 최적의 조합을 찾고 있습니다..."}

data: {"type":"chunk","data":"{\n"}

data: {"type":"chunk","data":"  \"studio\": {\n"}

data: {"type":"chunk","data":"    \"vendor_id\": \"uuid\",\n"}

data: {"type":"complete","message":"추천이 완료되었습니다!","data":{...}}
```

---

## 💻 프론트엔드 구현 예시

### 1. React Hook 구현

`useAiRecommendationStream.ts` 파일을 생성하세요:

```typescript
import { useState, useCallback } from 'react';

/**
 * AI 스트리밍 이벤트 타입
 */
export interface AiStreamEvent {
  type: 'progress' | 'chunk' | 'complete' | 'error';
  message?: string;
  data?: any;
}

/**
 * 추천 요청 파라미터
 */
export interface RecommendationRequest {
  wedding_date?: Date | string;
  preferred_region?: string;
  budget_limit?: number;
}

/**
 * AI 추천 스트리밍 Hook
 */
export const useAiRecommendationStream = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [chunks, setChunks] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 스트리밍 추천 시작
   */
  const streamRecommendation = useCallback(
    async (request: RecommendationRequest, token: string) => {
      setIsStreaming(true);
      setProgress('');
      setChunks([]);
      setResult(null);
      setError(null);

      try {
        // fetch API로 SSE 스트림 요청
        const response = await fetch('http://localhost:3000/api/v1/ai/recommend/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        // ReadableStream을 읽어서 처리
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // 디코딩하고 버퍼에 추가
          buffer += decoder.decode(value, { stream: true });

          // SSE 형식: "data: {...}\n\n"으로 구분
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || ''; // 마지막 불완전한 줄은 버퍼에 유지

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const eventData = JSON.parse(line.substring(6)) as AiStreamEvent;

                switch (eventData.type) {
                  case 'progress':
                    setProgress(eventData.message || '');
                    break;

                  case 'chunk':
                    setChunks((prev) => [...prev, eventData.data]);
                    break;

                  case 'complete':
                    setResult(eventData.data);
                    setProgress(eventData.message || '완료!');
                    break;

                  case 'error':
                    setError(eventData.message || '알 수 없는 오류가 발생했습니다.');
                    break;
                }
              } catch (parseError) {
                console.error('Failed to parse SSE event:', parseError);
              }
            }
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        console.error('Streaming error:', err);
      } finally {
        setIsStreaming(false);
      }
    },
    []
  );

  return {
    streamRecommendation,
    isStreaming,
    progress,
    chunks,
    result,
    error,
  };
};
```

### 2. React 컴포넌트 사용 예시

```typescript
import React from 'react';
import { useAiRecommendationStream } from './hooks/useAiRecommendationStream';

export const AiRecommendationComponent: React.FC = () => {
  const { 
    streamRecommendation, 
    isStreaming, 
    progress, 
    chunks, 
    result, 
    error 
  } = useAiRecommendationStream();

  const handleRecommend = async () => {
    const token = localStorage.getItem('access_token'); // 또는 다른 방식으로 토큰 획득
    
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    await streamRecommendation({
      wedding_date: '2025-06-15',
      preferred_region: '서울 강남구',
      budget_limit: 50000000,
    }, token);
  };

  return (
    <div>
      <h2>AI 추천 받기</h2>
      
      <button 
        onClick={handleRecommend} 
        disabled={isStreaming}
      >
        {isStreaming ? '추천 중...' : 'AI 추천 시작'}
      </button>

      {/* 진행 상황 표시 */}
      {isStreaming && (
        <div className="progress-container">
          <p>{progress}</p>
          <div className="loading-spinner" />
        </div>
      )}

      {/* 실시간 청크 표시 (디버깅용) */}
      {chunks.length > 0 && (
        <div className="chunks-container">
          <h3>AI 응답 (실시간)</h3>
          <pre>{chunks.join('')}</pre>
        </div>
      )}

      {/* 최종 결과 표시 */}
      {result && (
        <div className="result-container">
          <h3>추천 결과</h3>
          
          {result.studio && (
            <div className="recommendation-card">
              <h4>📸 스튜디오</h4>
              <p><strong>{result.studio.name}</strong></p>
              <p>{result.studio.selection_reason}</p>
            </div>
          )}

          {result.dress && (
            <div className="recommendation-card">
              <h4>👗 드레스</h4>
              <p><strong>{result.dress.name}</strong></p>
              <p>{result.dress.selection_reason}</p>
            </div>
          )}

          {result.makeup && (
            <div className="recommendation-card">
              <h4>💄 메이크업</h4>
              <p><strong>{result.makeup.name}</strong></p>
              <p>{result.makeup.selection_reason}</p>
            </div>
          )}

          {result.venue && (
            <div className="recommendation-card">
              <h4>🏛️ 웨딩홀</h4>
              <p><strong>{result.venue.name}</strong></p>
              <p>{result.venue.selection_reason}</p>
            </div>
          )}

          {result.overall_reason && (
            <div className="overall-reason">
              <h4>전체 추천 이유</h4>
              <p>{result.overall_reason}</p>
            </div>
          )}
        </div>
      )}

      {/* 에러 표시 */}
      {error && (
        <div className="error-container">
          <p style={{ color: 'red' }}>에러: {error}</p>
        </div>
      )}
    </div>
  );
};
```

### 3. React Native 구현 예시

React Native에서는 `fetch` API를 사용하여 동일하게 구현할 수 있습니다:

```typescript
import { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export const AiRecommendationScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState(null);

  const handleRecommend = async () => {
    setIsLoading(true);
    setProgress('시작 중...');

    try {
      const token = await AsyncStorage.getItem('access_token');
      
      const response = await fetch('http://localhost:3000/api/v1/ai/recommend/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          wedding_date: '2025-06-15',
          preferred_region: '서울 강남구',
          budget_limit: 50000000,
        }),
      });

      // React Native의 fetch는 ReadableStream을 직접 지원하지 않으므로
      // 전체 응답을 텍스트로 받아 처리
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const eventData = JSON.parse(line.substring(6));
            
            if (eventData.type === 'progress') {
              setProgress(eventData.message);
            } else if (eventData.type === 'complete') {
              setResult(eventData.data);
              setProgress('완료!');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setProgress('에러가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>AI 추천</Text>
      
      <Button 
        title={isLoading ? '추천 중...' : 'AI 추천 시작'}
        onPress={handleRecommend}
        disabled={isLoading}
      />

      {isLoading && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>{progress}</Text>
        </View>
      )}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>추천 결과</Text>
          {/* 결과 렌더링 */}
        </View>
      )}
    </View>
  );
};
```

---

## 🔧 네이티브 EventSource 사용 (대안)

브라우저 환경에서는 `EventSource` API를 사용할 수도 있습니다:

```typescript
const useEventSourceStream = (token: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const startStream = (request: RecommendationRequest) => {
    // EventSource는 GET만 지원하므로 query string으로 전달
    const params = new URLSearchParams({
      wedding_date: request.wedding_date?.toString() || '',
      preferred_region: request.preferred_region || '',
      budget_limit: request.budget_limit?.toString() || '',
    });

    const eventSource = new EventSource(
      `http://localhost:3000/api/v1/ai/recommend/stream?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      
      if (eventData.type === 'complete') {
        setData(eventData.data);
        eventSource.close();
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      setError(err);
      eventSource.close();
    };

    return () => eventSource.close();
  };

  return { startStream, data, error };
};
```

**⚠️ 주의:** `EventSource`는 인증 헤더를 지원하지 않는 브라우저가 많아, `fetch` API를 권장합니다.

---

## 🧪 테스트 방법

### 1. cURL로 테스트

```bash
curl -N -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "wedding_date": "2025-06-15",
    "preferred_region": "서울 강남구",
    "budget_limit": 50000000
  }' \
  http://localhost:3000/api/v1/ai/recommend/stream
```

`-N` 옵션은 버퍼링 없이 실시간으로 데이터를 받기 위함입니다.

### 2. Postman으로 테스트

1. **메서드**: POST
2. **URL**: `http://localhost:3000/api/v1/ai/recommend/stream`
3. **Headers**:
   - `Content-Type: application/json`
   - `Authorization: Bearer {token}`
4. **Body** (JSON):
```json
{
  "wedding_date": "2025-06-15",
  "preferred_region": "서울 강남구",
  "budget_limit": 50000000
}
```
5. **Send** 클릭 후 실시간으로 이벤트 확인

---

## 📊 응답 예시

### 전체 스트림 흐름

```
# 이벤트 1: 진행 상황
data: {"type":"progress","message":"후보 업체를 찾았습니다...","data":{"studio":5,"dress":8,"makeup":6,"venue":4}}

# 이벤트 2: AI 분석 시작
data: {"type":"progress","message":"AI가 최적의 조합을 찾고 있습니다..."}

# 이벤트 3-N: AI 응답 청크 (여러 개)
data: {"type":"chunk","data":"{\n"}

data: {"type":"chunk","data":"  \"studio\": {\n"}

data: {"type":"chunk","data":"    \"vendor_id\": \"uuid-1234\",\n"}

data: {"type":"chunk","data":"    \"name\": \"A 스튜디오\",\n"}

data: {"type":"chunk","data":"    \"selection_reason\": \"자연광이 좋습니다\"\n"}

data: {"type":"chunk","data":"  },\n"}

# ... (드레스, 메이크업, 웨딩홀도 동일)

# 마지막 이벤트: 완료
data: {"type":"complete","message":"추천이 완료되었습니다!","data":{"studio":{"vendor_id":"uuid-1234","category":"STUDIO","name":"A 스튜디오","selection_reason":"자연광이 좋습니다"},"dress":{...},"makeup":{...},"venue":{...},"overall_reason":"전체적으로 예산에 맞는 최적의 조합입니다."}}
```

### complete 이벤트의 data 구조

```typescript
{
  studio: {
    vendor_id: "uuid-1234",
    category: "STUDIO",
    name: "A 스튜디오",
    selection_reason: "강남 지역의 인기 스튜디오로, 자연광 촬영에 특화되어 있습니다."
  },
  dress: {
    vendor_id: "uuid-5678",
    category: "DRESS",
    name: "B 드레스샵",
    selection_reason: "예산 내에서 최고의 퀄리티를 제공합니다."
  },
  makeup: {
    vendor_id: "uuid-9012",
    category: "MAKEUP",
    name: "C 메이크업",
    selection_reason: "자연스러운 웨딩 메이크업 전문가입니다."
  },
  venue: {
    vendor_id: "uuid-3456",
    category: "VENUE",
    name: "D 웨딩홀",
    selection_reason: "식대가 합리적이며 대관료가 적절합니다."
  },
  overall_reason: "전체적으로 예산에 맞는 최적의 조합입니다."
}
```

---

## 🚨 에러 처리

### 백엔드 에러

```typescript
data: {"type":"error","message":"추천 시스템 오류로 인해 추천을 생성할 수 없습니다."}
```

### 프론트엔드 에러 처리

```typescript
const streamRecommendation = async (request, token) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // 스트림 처리...
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('사용자가 요청을 취소했습니다.');
    } else if (err.message.includes('Failed to fetch')) {
      console.error('네트워크 오류: 서버에 연결할 수 없습니다.');
    } else {
      console.error('알 수 없는 오류:', err);
    }
  }
};
```

### 타임아웃 설정

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 60000); // 60초 타임아웃

try {
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  
  // 처리...
} catch (err) {
  if (err.name === 'AbortError') {
    console.error('요청 타임아웃');
  }
} finally {
  clearTimeout(timeoutId);
}
```

---

## ⚡ 성능 최적화

### 1. 청크 버퍼링

너무 많은 `chunk` 이벤트가 발생하면 리렌더링이 과도할 수 있습니다:

```typescript
// 청크를 표시하지 않고 최종 결과만 사용
const [result, setResult] = useState(null);

// chunk 이벤트는 무시하고 complete만 처리
if (eventData.type === 'complete') {
  setResult(eventData.data);
}
```

### 2. Debouncing

진행 상황 업데이트를 제한:

```typescript
import { debounce } from 'lodash';

const debouncedSetProgress = debounce(setProgress, 100);

// progress 이벤트 처리 시
if (eventData.type === 'progress') {
  debouncedSetProgress(eventData.message);
}
```

### 3. 메모이제이션

```typescript
const memoizedResult = useMemo(() => {
  if (!result) return null;
  
  return {
    studio: result.studio,
    dress: result.dress,
    makeup: result.makeup,
    venue: result.venue,
  };
}, [result]);
```

---

## 🔐 보안 고려사항

### 1. 토큰 관리

```typescript
// ❌ 나쁜 예: 토큰을 URL에 포함
const url = `${API_URL}/stream?token=${token}`;

// ✅ 좋은 예: Authorization 헤더 사용
headers: {
  'Authorization': `Bearer ${token}`,
}
```

### 2. CORS 설정

백엔드에서 CORS를 올바르게 설정해야 합니다:

```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3001', 'https://your-domain.com'],
  credentials: true,
});
```

### 3. Rate Limiting

AI 추천은 비용이 많이 드는 작업이므로 요청 제한을 고려하세요:

```typescript
// 프론트엔드에서 중복 요청 방지
const [lastRequestTime, setLastRequestTime] = useState(0);

const handleRecommend = async () => {
  const now = Date.now();
  if (now - lastRequestTime < 10000) { // 10초 제한
    alert('잠시 후 다시 시도해주세요.');
    return;
  }
  
  setLastRequestTime(now);
  await streamRecommendation(request, token);
};
```

---

## 📱 모바일 앱 고려사항

### React Native

React Native에서는 `fetch` API를 사용하되, 다음 사항에 주의하세요:

1. **네트워크 상태 확인**
```typescript
import NetInfo from '@react-native-community/netinfo';

const checkNetwork = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    Alert.alert('네트워크 오류', '인터넷에 연결되어 있지 않습니다.');
    return false;
  }
  return true;
};
```

2. **백그라운드 처리**
```typescript
import BackgroundFetch from 'react-native-background-fetch';

// 앱이 백그라운드로 가면 스트림 중단
AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'background') {
    // 스트림 취소 로직
  }
});
```

---

## 🔍 디버깅 팁

### 1. 개발자 도구 Network 탭

Chrome DevTools에서 Network 탭을 열고:
- **Type**: `eventsource` 또는 `fetch`로 필터링
- **Response** 탭에서 실시간 이벤트 확인

### 2. 로깅 추가

```typescript
const streamRecommendation = async (request, token) => {
  console.log('[STREAM] 시작:', request);
  
  try {
    // ...
    
    for await (const chunk of stream) {
      console.log('[STREAM] 청크 수신:', chunk);
    }
  } catch (err) {
    console.error('[STREAM] 에러:', err);
  }
};
```

### 3. SSE 이벤트 모니터링

```typescript
// 모든 이벤트를 기록
const allEvents = [];

for (const line of lines) {
  if (line.startsWith('data: ')) {
    const event = JSON.parse(line.substring(6));
    allEvents.push(event);
    console.log('[SSE Event]', event);
  }
}
```

---

## 📚 참고 자료

### 관련 문서
- [AI_RECOMMENDATION.md](./AI_RECOMMENDATION.md) - 기본 AI 추천 시스템
- [LangChain 공식 문서](https://js.langchain.com/docs/get_started/introduction)
- [Server-Sent Events (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

### 예제 코드
- `/BE/src/modules/ai/ai.controller.ts` - SSE 엔드포인트
- `/BE/src/modules/ai/ai.service.ts` - 스트리밍 로직

### 패키지
- `@langchain/openai` - LangChain OpenAI 통합
- `@langchain/core` - LangChain 코어
- `langchain` - LangChain 메인 패키지
- `rxjs` - Observable (SSE 처리)

---

## ❓ FAQ

### Q1: EventSource vs Fetch, 어떤 것을 사용해야 하나요?

**A:** `fetch`를 권장합니다. EventSource는 인증 헤더를 지원하지 않는 브라우저가 많고, POST 요청을 지원하지 않습니다.

### Q2: 스트림이 중간에 끊기면 어떻게 하나요?

**A:** 재시도 로직을 추가하세요:
```typescript
const MAX_RETRIES = 3;
let retryCount = 0;

const streamWithRetry = async () => {
  try {
    await streamRecommendation(request, token);
  } catch (err) {
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`재시도 ${retryCount}/${MAX_RETRIES}`);
      await new Promise(r => setTimeout(r, 1000 * retryCount));
      await streamWithRetry();
    } else {
      throw err;
    }
  }
};
```

### Q3: 프로덕션 환경에서 주의할 점은?

**A:**
1. HTTPS 사용 필수
2. 적절한 타임아웃 설정 (60초 권장)
3. Rate limiting 적용
4. 에러 로깅 및 모니터링
5. 사용자에게 예상 소요 시간 안내

### Q4: 비용은 얼마나 드나요?

**A:** GPT-4o 모델 기준:
- Input: ~$2.50 / 1M tokens
- Output: ~$10.00 / 1M tokens
- 1회 추천당 약 500-1000 tokens 사용
- 예상 비용: $0.01 ~ $0.02 / 1회

---

**문서 버전**: 1.0.0  
**최종 수정일**: 2025.12.01  
**작성자**: Backend Team


