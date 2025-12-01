# 설치 가이드

## 1단계: 필수 라이브러리 설치

### react-native-webview 설치

```bash
# FE 디렉토리로 이동
cd /Users/kimdongeun/planA/FE

# Expo 관리형 설치 (권장)
npx expo install react-native-webview

# 또는 npm 직접 설치
npm install react-native-webview@^13.12.4
```

### 설치 버전 확인
```bash
npm list react-native-webview
```

**예상 출력:**
```
planA@1.0.0 /Users/kimdongeun/planA/FE
└── react-native-webview@13.12.4
```

## 2단계: 카카오맵 API 키 발급

### 2-1. Kakao Developers 가입 및 앱 등록

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 로그인 또는 회원가입
3. **내 애플리케이션** 메뉴 선택
4. **애플리케이션 추가하기** 클릭
5. 앱 정보 입력:
   - 앱 이름: `Plan A`
   - 사업자명: (선택사항)

### 2-2. JavaScript 키 발급

1. 생성된 앱 선택
2. **앱 키** 탭 클릭
3. **JavaScript 키** 복사

### 2-3. 플랫폼 등록

#### iOS 설정
1. **플랫폼** > **iOS 플랫폼 등록**
2. 번들 ID 입력: `com.plana.app` (app.json 참고)

#### Android 설정
1. **플랫폼** > **Android 플랫폼 등록**
2. 패키지명 입력: `com.plana.app` (app.json 참고)
3. 키 해시 입력 (개발용):

```bash
# macOS에서 키 해시 생성
keytool -exportcert -alias androiddebugkey \
  -keystore ~/.android/debug.keystore | \
  openssl sha1 -binary | \
  openssl base64
# 비밀번호: android
```

## 3단계: 환경 변수 설정

### 3-1. .env 파일 생성

```bash
# FE 디렉토리에 .env 파일 생성
cd /Users/kimdongeun/planA/FE
touch .env
```

### 3-2. API 키 입력

`.env` 파일 내용:
```env
# Kakao Map API
EXPO_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here

# 예시 (실제 키로 변경 필요)
# EXPO_PUBLIC_KAKAO_MAP_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 3-3. .gitignore 확인

`.env` 파일이 Git에 커밋되지 않도록 확인:

```bash
# .gitignore에 다음 내용이 있는지 확인
echo ".env" >> .gitignore
```

## 4단계: 설치 확인

### 4-1. 테스트 컴포넌트 생성

`app/test-map.tsx` 파일 생성:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import Constants from 'expo-constants';

export default function TestMap() {
  const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_KAKAO_MAP_API_KEY;
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>API Key 로드 테스트</Text>
      <Text>{apiKey ? '✅ API Key 로드 성공' : '❌ API Key 없음'}</Text>
    </View>
  );
}
```

### 4-2. 개발 서버 재시작

```bash
# 캐시 삭제 및 재시작
npx expo start -c
```

## 5단계: 선택적 라이브러리 설치

### expo-location (현재 위치 기능용)

```bash
npx expo install expo-location
```

**package.json 업데이트:**
```json
{
  "dependencies": {
    "expo-location": "~18.0.5"
  }
}
```

## 설치 체크리스트

- [ ] react-native-webview 설치 완료
- [ ] 카카오 개발자 계정 생성
- [ ] 카카오 앱 등록 완료
- [ ] JavaScript 키 발급
- [ ] iOS 플랫폼 등록 (번들 ID: com.plana.app)
- [ ] Android 플랫폼 등록 (패키지명: com.plana.app)
- [ ] .env 파일 생성 및 API 키 입력
- [ ] .gitignore에 .env 추가
- [ ] 개발 서버 재시작
- [ ] (선택) expo-location 설치

## 트러블슈팅

### react-native-webview 설치 오류

**증상:** 설치 중 네이티브 모듈 에러
**해결:**
```bash
# 캐시 삭제
rm -rf node_modules
rm package-lock.json

# 재설치
npm install
npx expo install react-native-webview
```

### API 키가 로드되지 않음

**증상:** `undefined` 또는 `null` 반환
**해결:**
1. `.env` 파일이 `/Users/kimdongeun/planA/FE` 에 있는지 확인
2. 키 이름이 `EXPO_PUBLIC_` 접두사로 시작하는지 확인
3. 개발 서버를 완전히 종료 후 재시작 (`npx expo start -c`)

### iOS 빌드 오류

**증상:** WebView 관련 빌드 실패
**해결:**
```bash
# iOS 폴더로 이동 (expo prebuild 실행 후)
cd ios
pod install
cd ..

# 재빌드
npx expo run:ios
```

### Android 빌드 오류

**증상:** WebView 관련 빌드 실패
**해결:**
```bash
# Android 폴더 정리 (expo prebuild 실행 후)
cd android
./gradlew clean
cd ..

# 재빌드
npx expo run:android
```

## 다음 단계

설치가 완료되면 다음 문서를 참고하세요:

- `README.md`: 전체 개요 및 사용법
- `USAGE.md`: 상세 사용 가이드
- `API.md`: API 레퍼런스

## 지원

문제가 발생하면:
- 작성자: 김동언 (rlaehddhs12@gmail.com)
- 프로젝트 문서: `/Users/kimdongeun/planA/FE/doc/`

