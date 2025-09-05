# Users API Documentation

## User Query Endpoints

### Get All Users
모든 사용자를 조회합니다.

**Endpoint:**
```
GET http://localhost:3333/api/users
```

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAw",
      "email": "temp-xxx@http://localhost:3333",
      "emailVerified": false,
      "name": "Anonymous",
      "image": null,
      "createdAt": "2025-09-05T16:45:18.451Z",
      "updatedAt": "2025-09-05T16:45:18.451Z",
      "isAnonymous": 1
    }
  ],
  "count": 1
}
```

### Get Anonymous Users Only
익명 사용자만 조회합니다.

**Endpoint:**
```
GET http://localhost:3333/api/users/anonymous
```

**Headers:**
```
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAW",
      "email": "temp-xxx@http://localhost:3333",
      "emailVerified": false,
      "name": "Anonymous",
      "image": null,
      "createdAt": "2025-09-05T16:45:18.451Z",
      "updatedAt": "2025-09-05T16:45:18.451Z",
      "isAnonymous": 1
    }
  ],
  "count": 1
}
```

### Get User by ID
특정 사용자를 ID로 조회합니다.

**Endpoint:**
```
GET http://localhost:3333/api/users/{user_id}
```

**Headers:**
```
Content-Type: application/json
```

**Path Parameters:**
- `user_id`: 조회할 사용자의 ID

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "tSMIMbcGnqoGpk2y1v3Lekg4WPy7ryAW",
    "email": "temp-xxx@http://localhost:3333",
    "emailVerified": false,
    "name": "Anonymous",
    "image": null,
    "createdAt": "2025-09-05T16:45:18.451Z",
    "updatedAt": "2025-09-05T16:45:18.451Z",
    "isAnonymous": 1
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

**Response (Server Error):**
```json
{
  "success": false,
  "error": "Failed to fetch user"
}
```

## Database Schema
Users 테이블 구조:

```sql
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  email TEXT,
  emailVerified BOOLEAN DEFAULT FALSE,
  name TEXT,
  image TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  isAnonymous INTEGER
);
```

## Notes
- 모든 사용자 조회 API는 인증 없이 접근 가능합니다
- `isAnonymous` 필드: `1`은 익명 사용자, `0`은 일반 사용자
- 익명 사용자는 임시 이메일 주소를 가집니다