# Anonymous Login API

익명 로그인을 통해 임시 사용자를 생성하고 관리합니다.

## Sign In (Anonymous)

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

## 특징

- 임시 이메일과 함께 사용자를 자동 생성합니다
- 생성된 사용자는 `isAnonymous` 필드가 `1`로 설정됩니다
- 별도의 계정 정보 없이 즉시 사용 가능합니다
- 세션이 만료되면 사용자 정보도 손실될 수 있습니다

## 사용 예시

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:3333/api/auth/sign-in/anonymous', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({})
});

const data = await response.json();
console.log('Anonymous user created:', data.user);
console.log('Token:', data.token);
```

### cURL
```bash
curl -X POST http://localhost:3333/api/auth/sign-in/anonymous \
  -H "Content-Type: application/json" \
  -d "{}"
```