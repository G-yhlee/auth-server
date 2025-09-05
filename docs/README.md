# API Documentation

이 폴더는 auth-server의 API 사용법을 문서화합니다.

## API 문서 목록

### 📋 Quick Reference
- [API Endpoints Summary](./api-endpoints.md) - 모든 API 엔드포인트 요약

### Authentication
- [Auth API](./api/auth/) - 인증 관련 API 문서
  - [Anonymous Login](./api/auth/anonymous.md) - 익명 로그인
  - [OAuth Login](./api/auth/oauth.md) - 소셜 로그인 (Google, GitHub)
  - [Session Management](./api/auth/session.md) - 세션 관리

### User Management  
- [Users API](./api/users.md) - 사용자 조회 API

### Testing
- [Postman 테스트 가이드](./postman.md) - Postman을 사용한 API 테스트 방법

## 서버 정보
- **Base URL**: `http://localhost:3333`
- **Port**: 3333
- **Database**: SQLite (`auth.db`)

## 구현된 기능
- ✅ Anonymous 로그인
- ✅ OAuth 로그인 (Google, GitHub)
- ✅ 세션 관리
- ✅ 사용자 관리 API

## 구현 예정
- OTP 로그인
- 추가 사용자 관리 기능
- 이메일 인증
- 비밀번호 재설정

## OAuth 설정
OAuth 로그인을 사용하려면 다음 환경 변수를 설정해야 합니다:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id  
GITHUB_CLIENT_SECRET=your_github_client_secret
```

자세한 설정 방법은 [메인 README](../README.md#oauth-설정)를 참고하세요.

## 사용법
각 API 문서에서 엔드포인트, 요청/응답 형식, 예제를 확인할 수 있습니다. Postman 테스트는 [Postman 테스트 가이드](./postman.md)를 참고하세요.