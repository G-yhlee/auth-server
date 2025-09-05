```md
## env 세팅

- 파일위치 확인

## development deploy:

npm i
npm start

## production deploy:

#### note

npm i
npm run dist
```

#### agent 서버

- 서버 연동 체크 및 앱 송수신 환경 재현

```todo
1. Better auth 사용 및 해당 프래임웍의 다음 기능사용.
  - ✅ Anonymous 로그인.
  - ✅ Oauth 로그인.
  - Opt 로그인.
2. Auth 서버와 프론트 앱은 분리 (따로 배포 되어야함).

3. 로그인 화면 구현
  - 위 기능을 사용한 로그인 플로우 구현.
  - nextjs 14버전 page 라우터 사용.
  - vercel 에 배포.
```

## OAuth 설정

### 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Server Configuration
PORT=3333
```

### OAuth Provider 설정

#### Google OAuth 설정
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. OAuth 2.0 클라이언트 ID 생성
4. 승인된 리디렉션 URI에 `http://localhost:3333/api/auth/callback/google` 추가

#### GitHub OAuth 설정
1. [GitHub Developer Settings](https://github.com/settings/developers)에 접속
2. 새 OAuth App 생성
3. Authorization callback URL에 `http://localhost:3333/api/auth/callback/github` 입력

### 사용 방법

#### 로그인 엔드포인트
- Google 로그인: `POST /api/auth/sign-in/social/google`
- GitHub 로그인: `POST /api/auth/sign-in/social/github`
- Anonymous 로그인: `POST /api/auth/sign-in/anonymous`

#### 사용 예시
```javascript
// Google 로그인
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
window.location.href = data.url;
```
