# ⚙️ Configuration Guide

## 🗄️ Database Configuration

### PostgreSQL Setup

1. **Install PostgreSQL**:
   ```bash
   # Windows (using chocolatey)
   choco install postgresql
   
   # macOS (using homebrew)
   brew install postgresql
   
   # Ubuntu
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create Database User**:
   ```sql
   sudo -u postgres psql
   CREATE USER vendorbridge_user WITH PASSWORD 'your_secure_password';
   CREATE DATABASE vendorbridge;
   GRANT ALL PRIVILEGES ON DATABASE vendorbridge TO vendorbridge_user;
   \q
   ```

3. **Configure Backend Environment**:
   ```bash
   # backend/.env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=vendorbridge
   DB_USER=vendorbridge_user
   DB_PASSWORD=your_secure_password
   ```

## 📧 Email Configuration (Gmail)

### Setup Gmail App Password

1. **Enable 2FA** on your Google Account
2. Go to **Google Account Settings** → **Security**
3. Click **App Passwords** under "Signing in to Google"
4. Select **Mail** and **Other (Custom name)**
5. Enter "VendorBridge ERP" as the app name
6. **Copy the 16-character password**

### Configure Backend
```bash
# backend/.env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
```

## 🔐 Security Configuration

### Session Security
```bash
# backend/.env
SESSION_SECRET=your-super-secret-64-character-session-key-here
SESSION_SECURE=false  # Set to true in production with HTTPS
```

### Rate Limiting
```bash
# backend/.env
RATE_LIMIT_WINDOW_MS=900000    # 15 minutes
RATE_LIMIT_MAX=100             # Max requests per window
RATE_LIMIT_AUTH_MAX=20         # Auth endpoint limit
```