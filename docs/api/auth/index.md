# Authentication API Documentation

auth-server의 인증 관련 API 문서입니다.

## 📂 인증 방식별 문서

### 🔐 [Anonymous Login](./anonymous.md)
익명 로그인을 통한 임시 사용자 생성
- 즉시 사용 가능한 임시 계정 생성
- 별도의 회원가입 과정 없음
- 세션 기반 사용자 관리

### 🌐 [OAuth Login](./oauth.md) 
외부 서비스를 통한 소셜 로그인
- **Google OAuth**: Google 계정으로 로그인
- **GitHub OAuth**: GitHub 계정으로 로그인
- 안전한 외부 인증 연동

### 📋 [Session Management](./session.md)
사용자 세션 관리 및 인증 상태 확인
- 현재 세션 정보 조회
- 로그아웃 및 세션 종료
- 인증 토큰 관리

## 🚀 빠른 시작

### 1. Anonymous 로그인
```bash
curl -X POST http://localhost:3333/api/auth/sign-in/anonymous \
  -H "Content-Type: application/json" \
  -d "{}"
```

### 2. OAuth 로그인 (Google)
```bash
curl -X POST http://localhost:3333/api/auth/sign-in/social/google \
  -H "Content-Type: application/json" \
  -d '{"callbackURL": "/dashboard"}'
```

### 3. 세션 확인
```bash
curl -X GET http://localhost:3333/api/auth/get-session \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔑 인증 토큰 사용

모든 인증된 API 요청에는 다음과 같이 토큰을 포함해야 합니다:

```javascript
fetch('http://localhost:3333/api/protected-endpoint', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
  }
})
```

## ⚙️ 설정 요구사항

### 환경 변수
OAuth 로그인을 사용하려면 다음 환경 변수가 필요합니다:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth  
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# 서버 설정
PORT=3333
```

### OAuth 제공자 설정
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)에서 OAuth 클라이언트 설정
- **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)에서 OAuth App 설정

자세한 설정 방법은 각 문서를 참고하세요.

## 📋 API 엔드포인트 요약

| 기능 | 메소드 | 엔드포인트 | 인증 필요 |
|------|--------|------------|-----------|
| Anonymous 로그인 | POST | `/api/auth/sign-in/anonymous` | ❌ |
| Google OAuth 시작 | POST | `/api/auth/sign-in/social/google` | ❌ |
| GitHub OAuth 시작 | POST | `/api/auth/sign-in/social/github` | ❌ |
| Google OAuth 콜백 | GET | `/api/auth/callback/google` | ❌ |
| GitHub OAuth 콜백 | GET | `/api/auth/callback/github` | ❌ |
| 세션 조회 | GET | `/api/auth/get-session` | ✅ |
| 로그아웃 | POST | `/api/auth/sign-out` | ✅ |

## 🧪 테스트

Postman을 사용한 API 테스트는 [Postman 테스트 가이드](../../postman.md)를 참고하세요.

## 🔍 관련 문서

- [메인 README](../../../README.md) - 프로젝트 개요 및 설치 가이드
- [Users API](../users.md) - 사용자 관리 API
- [Postman 테스트 가이드](../../postman.md) - API 테스트 방법