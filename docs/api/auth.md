# Auth API Documentation

## Anonymous Login

### Sign In (Anonymous)
익명 로그인을 통해 임시 사용자를 생성합니다.

**Endpoint:**
```
POST http://localhost:3333/api/auth/sign-in/anonymous
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "token": "sK6WZb38FYuRz1iH3EYEjeg2UxL9ypAY",
  "user": {
    "id": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAw",
    "email": "temp-xxx@http://localhost:3333",
    "emailVerified": false,
    "name": "Anonymous",
    "createdAt": "2025-09-05T16:45:18.451Z",
    "updatedAt": "2025-09-05T16:45:18.451Z"
  }
}
```

### Sign Out
현재 세션을 종료합니다.

**Endpoint:**
```
POST http://localhost:3333/api/auth/sign-out
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "success": true
}
```

### Get Session
현재 세션 정보를 조회합니다.

**Endpoint:**
```
GET http://localhost:3333/api/auth/get-session
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "id": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAw",
    "email": "temp-xxx@http://localhost:3333",
    "emailVerified": false,
    "name": "Anonymous",
    "createdAt": "2025-09-05T16:45:18.451Z",
    "updatedAt": "2025-09-05T16:45:18.451Z"
  },
  "session": {
    "id": "session_id",
    "userId": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAw",
    "expiresAt": "2025-09-06T16:45:18.451Z"
  }
}
```

## Notes
- Anonymous 로그인은 임시 이메일과 함께 사용자를 자동 생성합니다
- 생성된 사용자는 `isAnonymous` 필드가 `1`로 설정됩니다
- 토큰은 인증이 필요한 모든 API 호출에 사용됩니다