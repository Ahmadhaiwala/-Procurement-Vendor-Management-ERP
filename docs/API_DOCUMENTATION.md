# 📡 API Documentation

## 🔐 Authentication Endpoints

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd123!",
  "full_name": "John Doe",
  "role": "PROCUREMENT_OFFICER",
  "organization": {
    "name": "Acme Corp"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "PROCUREMENT_OFFICER",
    "organization_id": "uuid"
  }
}
```

### POST `/api/auth/login`
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd123!",
  "remember_me": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "PROCUREMENT_OFFICER",
      "organization_id": "uuid",
      "organization_name": "Acme Corp"
    }
  }
}
```

### GET `/api/auth/session`
Check current session status.

**Response:**
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "PROCUREMENT_OFFICER"
  }
}
```

### POST `/api/auth/logout`
End current session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```