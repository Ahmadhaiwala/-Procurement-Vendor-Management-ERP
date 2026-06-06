# 🏢 VendorBridge Procurement ERP

A comprehensive procurement management system built with **Node.js**, **Next.js**, and **PostgreSQL**.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd VendorBridge-ERP

# Setup Backend
cd backend
npm install
cp .env.example .env
# Configure your .env file (see Configuration section)
npm run migrate
npm run dev

# Setup Frontend (in new terminal)
cd ../vendor-bridge-erp-design(1)
npm install
cp .env.local.example .env.local
npm run dev
```

## 🏗️ Architecture Overview

### Tech Stack
- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with raw SQL queries
- **Authentication**: Session-based with PostgreSQL store
- **File Handling**: Multer for uploads, Puppeteer for PDFs
- **Email**: Nodemailer with Gmail SMTP

### Project Structure
```
VendorBridge-ERP/
├── backend/                    # Node.js API Server
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── routes/            # API route definitions
│   │   ├── db/               # Database queries & migrations
│   │   ├── utils/            # Utilities (logger, password, etc)
│   │   └── config/           # Database, email, cache config
│   ├── scripts/              # Database management scripts
│   └── uploads/              # File upload directory
├── vendor-bridge-erp-design(1)/  # Next.js Frontend
│   ├── app/                  # Next.js 14 App Router
│   ├── components/           # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, types, API client
│   └── public/              # Static assets
└── docs/                    # Documentation (this folder)
```

## 🔧 Prerequisites

- **Node.js**: v20 or higher
- **PostgreSQL**: v12 or higher
- **npm**: v8 or higher
- **Gmail Account**: For email functionality (optional)

## ⚙️ Configuration

See [Configuration Guide](docs/CONFIGURATION.md) for detailed setup instructions.