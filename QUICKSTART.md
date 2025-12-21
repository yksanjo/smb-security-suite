# Quick Start Guide

Get the SMB Security Suite up and running in minutes.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- PostgreSQL 15+ (if running without Docker)
- Redis 7+ (if running without Docker)

## Option 1: Docker Compose (Recommended)

The easiest way to get started:

```bash
cd smb-security-suite
docker-compose -f docker/docker-compose.dev.yml up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis on port 6379
- Backend API on port 3001
- Frontend on port 3000

### First-time Setup

1. **Run database migrations:**
   ```bash
   docker exec -it smb-security-suite-backend-1 npm run migrate
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

3. **Create an account:**
   - Navigate to http://localhost:3000
   - Click "Get Started" or "Sign In"
   - Create a new account

4. **Create an organization:**
   - After logging in, you'll be prompted to create or select an organization
   - Create your first organization

5. **Configure products:**
   - Navigate to the Dashboard
   - Start adding repositories, log sources, or cloud accounts based on your subscription

## Option 2: Local Development

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL and Redis (or use Docker)
docker-compose -f ../docker/docker-compose.dev.yml up postgres redis -d

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

### Backend (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/smb_security
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# OpenAI (required for AI features)
OPENAI_API_KEY=your-openai-api-key

# GitHub (for Attack Surface Monitor)
GITHUB_APP_ID=your-github-app-id
GITHUB_APP_PRIVATE_KEY=your-github-app-private-key

# AWS (for Cloud Monitor)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1

# Stripe (for billing)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Product Setup

### 1. Attack Surface Monitor

1. Navigate to "Attack Surface" in the sidebar
2. Click "Add Repository"
3. Enter:
   - Repository name (e.g., `owner/repo`)
   - Repository URL
   - GitHub personal access token (for scanning)
4. Click "Scan Now" to run an initial scan

### 2. Log Intelligence Platform

1. Navigate to "Log Intelligence"
2. Click "Add Log Source"
3. Configure:
   - Source name
   - Source type (API, S3, OpenTelemetry, Webhook)
   - Configuration details
4. Logs can be ingested via the `/api/logs/ingest` endpoint

### 3. Cloud Network Monitor

1. Navigate to "Cloud Monitor"
2. Click "Add Cloud Account"
3. Enter:
   - Cloud provider (AWS, GCP, Azure)
   - Account ID
   - Account name
   - Credentials configuration
4. Click "Sync Now" to analyze VPC logs and IAM events

### 4. Pentest Assistant

1. Navigate to "Pentest"
2. Click "New Session"
3. Enter target URL
4. Configure testing parameters
5. Findings will be generated as testing progresses

## API Documentation

### Authentication

All API requests (except `/api/auth/*`) require authentication:

```bash
Authorization: Bearer <token>
x-organization-id: <organization-id>
```

### Example API Calls

**Get Dashboard Summary:**
```bash
curl -H "Authorization: Bearer <token>" \
     -H "x-organization-id: <org-id>" \
     http://localhost:3001/api/dashboard
```

**List Attack Surface Findings:**
```bash
curl -H "Authorization: Bearer <token>" \
     -H "x-organization-id: <org-id>" \
     http://localhost:3001/api/attack-surface/findings
```

## Troubleshooting

### Database Connection Issues

If you see database connection errors:
1. Ensure PostgreSQL is running: `docker ps`
2. Check DATABASE_URL in .env matches your setup
3. Verify migrations ran: `npm run migrate`

### Port Already in Use

If ports 3000 or 3001 are in use:
1. Change ports in docker-compose.yml
2. Or stop the conflicting services

### OpenAI API Errors

AI features require a valid OpenAI API key:
1. Get a key from https://platform.openai.com/api-keys
2. Add it to backend/.env as OPENAI_API_KEY
3. Restart the backend service

## Next Steps

- Read the [README.md](./README.md) for detailed product information
- Check out the API routes in `backend/src/routes/`
- Customize the frontend components in `frontend/app/`
- Set up production deployment (see infrastructure docs)

## Support

For issues or questions:
- Check the logs: `docker-compose logs -f`
- Review the database: `docker exec -it <postgres-container> psql -U postgres -d smb_security`

