# Session Management API

사용자 세션을 관리하고 인증 상태를 확인합니다.

## Get Session

현재 세션 정보를 조회합니다.

**Endpoint:**

```
GET http://localhost:3333/auth/get-session
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

## Sign Out

현재 세션을 종료합니다.

**Endpoint:**

```
POST http://localhost:3333/auth/sign-out
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

## 특징

- 모든 인증된 요청에는 Bearer 토큰이 필요합니다
- 세션 정보를 통해 현재 로그인한 사용자 정보를 확인할 수 있습니다
- 로그아웃 시 서버에서 세션이 무효화됩니다
- 토큰 만료시 자동으로 세션이 종료됩니다

## 사용 예시

### JavaScript/Fetch

#### 세션 조회

```javascript
const response = await fetch("http://localhost:3333/auth/get-session", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const sessionData = await response.json();
console.log("Current user:", sessionData.user);
console.log("Session info:", sessionData.session);
```

#### 로그아웃

```javascript
const response = await fetch("http://localhost:3333/auth/sign-out", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({}),
});

const result = await response.json();
if (result.success) {
  console.log("Successfully signed out");
  // 토큰 삭제 및 로그인 페이지로 리디렉션
}
```

### cURL

#### 세션 조회

```bash
curl -X GET http://localhost:3333/auth/get-session \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 로그아웃

```bash
curl -X POST http://localhost:3333/auth/sign-out \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{}"
```

## 에러 응답

### 401 Unauthorized

토큰이 없거나 유효하지 않은 경우:

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

### 403 Forbidden

토큰은 유효하지만 권한이 없는 경우:

```json
{
  "error": "Forbidden",
  "message": "Access denied"
}
```
