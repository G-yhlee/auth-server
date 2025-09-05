# OAuth Login API

OAuth를 통해 외부 서비스(Google, GitHub) 계정으로 로그인합니다.

## Google OAuth Login

### Google OAuth 시작

Google 계정으로 로그인 프로세스를 시작합니다.

**Endpoint:**
```
POST http://localhost:3333/api/auth/sign-in/social/google
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "callbackURL": "/dashboard"
}
```

**Response:**
```json
{
  "url": "https://accounts.google.com/oauth/authorize?response_type=code&client_id=xxx&redirect_uri=http%3A//localhost%3A3333/api/auth/callback/google&scope=openid%20profile%20email&state=xxx"
}
```

### Google OAuth 콜백

OAuth 제공자에서 리디렉션되는 콜백 엔드포인트입니다.

**Endpoint:**
```
GET http://localhost:3333/api/auth/callback/google?code=xxx&state=xxx
```

**Response:**
사용자를 `callbackURL`로 리디렉션하며, 쿠키에 인증 토큰이 설정됩니다.

## GitHub OAuth Login

### GitHub OAuth 시작

GitHub 계정으로 로그인 프로세스를 시작합니다.

**Endpoint:**
```
POST http://localhost:3333/api/auth/sign-in/social/github
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "callbackURL": "/dashboard"
}
```

**Response:**
```json
{
  "url": "https://github.com/login/oauth/authorize?response_type=code&client_id=xxx&redirect_uri=http%3A//localhost%3A3333/api/auth/callback/github&scope=user%3Aemail&state=xxx"
}
```

### GitHub OAuth 콜백

**Endpoint:**
```
GET http://localhost:3333/api/auth/callback/github?code=xxx&state=xxx
```

**Response:**
사용자를 `callbackURL`로 리디렉션하며, 쿠키에 인증 토큰이 설정됩니다.

## OAuth 설정 요구사항

### Google OAuth 설정
1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. OAuth 2.0 클라이언트 ID 생성
3. 승인된 리디렉션 URI에 `http://localhost:3333/api/auth/callback/google` 추가
4. 환경 변수 설정:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

### GitHub OAuth 설정
1. [GitHub Developer Settings](https://github.com/settings/developers)에서 OAuth App 생성
2. Authorization callback URL에 `http://localhost:3333/api/auth/callback/github` 입력
3. 환경 변수 설정:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

## 특징

- OAuth 로그인시 사용자가 존재하지 않으면 자동으로 계정이 생성됩니다
- 브라우저 환경에서만 완전히 동작합니다 (리디렉션 필요)
- 사용자 정보는 OAuth 제공자에서 자동으로 가져옵니다
- 별도의 비밀번호 설정 없이 안전한 인증이 가능합니다

## 사용 예시

### JavaScript/Fetch
```javascript
// Google OAuth 시작
const response = await fetch('http://localhost:3333/api/auth/sign-in/social/google', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    callbackURL: '/dashboard'
  })
});

const data = await response.json();
// 브라우저를 OAuth URL로 리디렉션
window.location.href = data.url;
```

### cURL
```bash
# Google OAuth URL 받기
curl -X POST http://localhost:3333/api/auth/sign-in/social/google \
  -H "Content-Type: application/json" \
  -d '{"callbackURL": "/dashboard"}'

# GitHub OAuth URL 받기
curl -X POST http://localhost:3333/api/auth/sign-in/social/github \
  -H "Content-Type: application/json" \
  -d '{"callbackURL": "/dashboard"}'
```