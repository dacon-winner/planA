# 환경 변수 설정 가이드

## 📋 목차

1. [개요](#개요)
2. [설정 방법](#설정-방법)
3. [환경 변수 목록](#환경-변수-목록)
4. [사용 방법](#사용-방법)
5. [트러블슈팅](#트러블슈팅)

---

## 개요

Plan A 프로젝트는 환경 변수를 통해 다음을 관리합니다:
- 백엔드 API 엔드포인트
- 카카오맵 API 키
- 앱 환경 설정 (개발/스테이징/프로덕션)

### 파일 구조

```
FE/
├── .env                    # 현재 환경 변수 (Git 제외)
├── .env.example           # 템플릿 (Git 포함)
├── .env.development       # 개발 환경용
├── .env.production        # 프로덕션 환경용
├── app.config.js          # Expo 설정
└── commons/
    └── config/
        ├── env.ts         # 환경 변수 로더
        └── index.ts       # Export 모듈
```

---

## 설정 방법

### 1단계: .env 파일 생성

```bash
# FE 디렉토리로 이동
cd /Users/kimdongeun/planA/FE

# 템플릿 복사
cp .env.example .env
```

### 2단계: 카카오맵 API 키 발급

#### 2-1. Kakao Developers 가입

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 로그인 또는 회원가입

#### 2-2. 애플리케이션 등록

1. **내 애플리케이션** 메뉴 클릭
2. **애플리케이션 추가하기** 클릭
3. 앱 정보 입력:
   - 앱 이름: `Plan A`
   - 사업자명: (선택사항)

#### 2-3. JavaScript 키 복사

1. 생성된 앱 선택
2. **앱 키** 탭 클릭
3. **JavaScript 키** 복사
4. `.env` 파일의 `EXPO_PUBLIC_KAKAO_MAP_API_KEY`에 붙여넣기

#### 2-4. 플랫폼 등록

##### iOS 설정
1. **플랫폼** > **iOS 플랫폼 등록**
2. 번들 ID: `com.plana.app`

##### Android 설정
1. **플랫폼** > **Android 플랫폼 등록**
2. 패키지명: `com.plana.app`
3. 키 해시 등록:

```bash
# macOS/Linux
keytool -exportcert -alias androiddebugkey \
  -keystore ~/.android/debug.keystore | \
  openssl sha1 -binary | \
  openssl base64

# 비밀번호: android
```

### 3단계: 백엔드 API URL 설정

#### 로컬 개발 (기본)

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
```

#### 실제 기기에서 테스트

로컬 네트워크의 IP 주소 사용:

```bash
# macOS/Linux - IP 확인
ipconfig getifaddr en0

# 예시 결과: 192.168.0.10
```

```env
# .env 파일 수정
EXPO_PUBLIC_API_BASE_URL=http://192.168.0.10:3000/api/v1
```

### 4단계: 개발 서버 재시작

환경 변수 변경 후 **반드시** 재시작:

```bash
# 캐시 삭제 후 재시작
npx expo start -c
```

---

## 환경 변수 목록

### 필수 환경 변수

| 변수명 | 설명 | 예시 | 기본값 |
|--------|------|------|--------|
| **EXPO_PUBLIC_KAKAO_MAP_API_KEY** | 카카오맵 JavaScript 키 | `a1b2c3d4e5f6...` | - |
| EXPO_PUBLIC_API_BASE_URL | 백엔드 API URL | `http://localhost:3000/api/v1` | `http://localhost:3000/api/v1` |

### 선택 환경 변수

| 변수명 | 설명 | 예시 | 기본값 |
|--------|------|------|--------|
| EXPO_PUBLIC_API_TIMEOUT | API 타임아웃 (ms) | `30000` | `30000` |
| EXPO_PUBLIC_APP_ENV | 앱 환경 | `development` | `development` |
| EXPO_PUBLIC_DEBUG_MODE | 디버그 모드 | `true` | `true` |
| EXPO_PUBLIC_SENTRY_DSN | Sentry DSN | `https://...` | - |
| EXPO_PUBLIC_GA_ID | Google Analytics ID | `G-XXXXXXXXXX` | - |

---

## 사용 방법

### TypeScript에서 사용

```typescript
// commons/config에서 import
import { env, buildApiUrl } from '@/commons/config';

// 환경 변수 사용
console.log(env.apiBaseUrl);
console.log(env.kakaoMapApiKey);

// API URL 생성
const url = buildApiUrl('/vendors');
// 결과: http://localhost:3000/api/v1/vendors

// 환경 체크
import { isDevelopment, isProduction } from '@/commons/config';

if (isDevelopment) {
  console.log('개발 모드입니다');
}
```

### 컴포넌트에서 사용

```typescript
import React from 'react';
import { env } from '@/commons/config';
import { WebView } from 'react-native-webview';

const KakaoMapView = () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoMapApiKey}"></script>
      </head>
      <body>
        <div id="map"></div>
      </body>
    </html>
  `;
  
  return <WebView source={{ html }} />;
};
```

### API 호출에서 사용

```typescript
import { buildApiUrl } from '@/commons/config';
import axios from 'axios';

// 업체 목록 조회
const fetchVendors = async (category: string) => {
  const response = await axios.get(buildApiUrl('/vendors'), {
    params: {
      category,
      swLat: 37.5,
      swLng: 126.9,
      neLat: 37.6,
      neLng: 127.0,
    },
  });
  
  return response.data;
};
```

---

## 트러블슈팅

### ❌ "필수 환경 변수가 설정되지 않았습니다"

**증상:**
```
❌ 필수 환경 변수가 설정되지 않았습니다: EXPO_PUBLIC_KAKAO_MAP_API_KEY
```

**해결:**
1. `.env` 파일이 `/Users/kimdongeun/planA/FE/` 에 있는지 확인
2. `EXPO_PUBLIC_KAKAO_MAP_API_KEY` 값이 실제 키로 설정되었는지 확인
3. 개발 서버 재시작: `npx expo start -c`

### ❌ 환경 변수가 `undefined`

**증상:**
```typescript
console.log(env.kakaoMapApiKey); // undefined
```

**해결:**
1. 변수명이 `EXPO_PUBLIC_` 접두사로 시작하는지 확인
2. `app.config.js`에 해당 변수가 포함되어 있는지 확인
3. 개발 서버 완전 재시작:
   ```bash
   # 서버 종료 (Ctrl + C)
   npx expo start -c
   ```

### ❌ 실제 기기에서 백엔드 연결 안됨

**증상:**
```
Network Error: http://localhost:3000/api/v1/vendors
```

**해결:**
1. `localhost` 대신 로컬 IP 사용:
   ```bash
   # IP 확인
   ipconfig getifaddr en0
   ```

2. `.env` 수정:
   ```env
   EXPO_PUBLIC_API_BASE_URL=http://192.168.0.10:3000/api/v1
   ```

3. 백엔드 서버가 외부 접속을 허용하는지 확인:
   ```bash
   # BE 디렉토리에서
   # 0.0.0.0으로 바인딩되어야 함
   npm run start:dev
   ```

### ❌ iOS 시뮬레이터에서 카카오맵 로드 실패

**증상:**
카카오맵이 표시되지 않음

**해결:**
1. 카카오 개발자 콘솔에서 iOS 플랫폼 등록 확인
2. 번들 ID가 `com.plana.app`인지 확인 (app.json)
3. 개발 서버 재시작

### ❌ Git에 .env 파일이 커밋됨

**해결:**
```bash
# Git 캐시에서 제거
git rm --cached .env

# .gitignore 확인
cat .gitignore | grep .env

# 다시 커밋
git add .gitignore
git commit -m "chore: .env 파일 제외"
```

---

## 환경별 설정

### 개발 환경

```bash
# .env.development 사용
cp .env.development .env
npx expo start
```

### 프로덕션 환경

```bash
# .env.production 사용
cp .env.production .env
npx expo build:ios
npx expo build:android
```

---

## 보안 주의사항

### ⚠️ 절대 하지 말아야 할 것

1. **API 키를 코드에 직접 작성하지 마세요**
   ```typescript
   // ❌ 나쁜 예
   const KAKAO_KEY = 'a1b2c3d4e5f6...';
   
   // ✅ 좋은 예
   import { env } from '@/commons/config';
   const KAKAO_KEY = env.kakaoMapApiKey;
   ```

2. **`.env` 파일을 Git에 커밋하지 마세요**
   - `.gitignore`에 이미 추가되어 있음
   - 실수로 커밋한 경우 즉시 키를 재발급하세요

3. **환경 변수를 콘솔에 출력하지 마세요 (프로덕션)**
   ```typescript
   // ✅ 개발 환경에서만 출력
   if (__DEV__) {
     console.log('API Key:', env.kakaoMapApiKey);
   }
   ```

---

## 참고 문서

- [Expo 환경 변수 가이드](https://docs.expo.dev/guides/environment-variables/)
- [Kakao Developers](https://developers.kakao.com/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)

---

**작성자**: 김동언  
**이메일**: rlaehddhs12@gmail.com  
**작성일**: 2025.12.01