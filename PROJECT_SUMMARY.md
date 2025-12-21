# SMB Security Suite - Project Summary

## Overview

A comprehensive AI-native security platform designed for SMBs (10-500 employees) with 5 integrated products:

1. **Attack Surface Monitor (SurfaceAI)** - GitHub scanning, risk correlation, auto-remediation
2. **Log Intelligence Platform (LogCopilot)** - Natural language log analysis
3. **Cloud Network Behavior Monitor (VPC Guardian)** - VPC/IAM monitoring
4. **Continuous Pentest Assistant (PentestGPT)** - AI-powered security testing
5. **Unified Security Dashboard** - Single pane of glass

## Architecture

### Backend (`/backend`)
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL 15+ with comprehensive schema
- **Cache:** Redis 7+
- **AI Integration:** OpenAI API for explanations and analysis
- **External APIs:** GitHub API, AWS SDK, OpenTelemetry

**Key Features:**
- RESTful API with JWT authentication
- Organization-based multi-tenancy
- Subscription management
- AI-powered threat explanations
- Automated remediation suggestions

### Frontend (`/frontend`)
- **Framework:** Next.js 14+ (App Router)
- **UI:** React 18+ with TypeScript, Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** React Query (TanStack Query)

**Key Features:**
- Modern, responsive UI
- Real-time dashboard
- Product-specific views
- Unified security overview

## Database Schema

### Core Tables
- `users` - User accounts
- `organizations` - Multi-tenant organizations
- `organization_members` - User-organization relationships
- `subscriptions` - Product subscriptions

### Product-Specific Tables
- `github_repos` + `attack_surface_findings` - Attack Surface Monitor
- `log_sources` + `log_anomalies` - Log Intelligence
- `cloud_accounts` + `cloud_network_findings` - Cloud Monitor
- `pentest_sessions` + `pentest_findings` - Pentest Assistant
- `compliance_reports` - Compliance reporting

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user

### Organizations
- `POST /api/organizations` - Create organization
- `GET /api/organizations` - List user's organizations
- `GET /api/organizations/:id` - Get organization details

### Attack Surface Monitor
- `GET /api/attack-surface/repos` - List repositories
- `POST /api/attack-surface/repos` - Add repository
- `POST /api/attack-surface/repos/:id/scan` - Scan repository
- `GET /api/attack-surface/findings` - List findings
- `POST /api/attack-surface/findings/:id/remediation` - Generate PR

### Log Intelligence
- `GET /api/logs/sources` - List log sources
- `POST /api/logs/sources` - Add log source
- `POST /api/logs/ingest` - Ingest logs
- `GET /api/logs/anomalies` - List anomalies

### Cloud Monitor
- `GET /api/cloud/accounts` - List cloud accounts
- `POST /api/cloud/accounts` - Add cloud account
- `POST /api/cloud/accounts/:id/sync` - Sync account
- `GET /api/cloud/findings` - List findings

### Pentest Assistant
- `GET /api/pentest/sessions` - List sessions
- `POST /api/pentest/sessions` - Create session
- `GET /api/pentest/sessions/:id/findings` - Get findings
- `POST /api/pentest/sessions/:id/findings` - Create finding

### Dashboard
- `GET /api/dashboard` - Unified dashboard data

## AI Features

### OpenAI Integration (`/backend/src/services/ai/openai.ts`)

1. **Plain English Explanations**
   - Converts technical security findings into business-friendly language
   - Used across all products for threat explanations

2. **Remediation Steps**
   - Generates actionable remediation instructions
   - Step-by-step guidance for fixing vulnerabilities

3. **Log Anomaly Analysis**
   - Analyzes log patterns for security anomalies
   - Provides playbook suggestions

## Security Features

- JWT-based authentication
- Organization-level access control
- Encrypted password storage (bcrypt)
- API rate limiting (via Redis)
- Input validation (Zod schemas)

## Deployment

### Docker Compose
```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

### Production Considerations
- Use environment variables for all secrets
- Enable HTTPS/TLS
- Set up proper database backups
- Configure Redis persistence
- Use production-grade OpenAI API keys
- Set up monitoring and alerting

## Pricing Tiers

- **Attack Surface Monitor:** $29-99/month
- **Log Intelligence:** $49-149/month
- **Cloud Monitor:** $79-199/month
- **Pentest Assistant:** $99-299/month
- **Unified Suite:** $199-499/month (bundle discount)

## Roadmap

### Phase 1 (Q1 2026) - MVP
- ✅ Attack Surface Monitor
- ✅ Basic dashboard
- ✅ User authentication

### Phase 2 (Q2 2026)
- Log Intelligence Platform
- Enhanced AI explanations
- Slack/email notifications

### Phase 3 (Q3 2026)
- Cloud Network Monitor
- Advanced behavioral baselining
- Compliance reporting

### Phase 4 (Q4 2026)
- Pentest Assistant
- Burp Suite/ZAP integration
- Bundle offering

## Key Differentiators

1. **10x Better UX** - Modern, intuitive interface vs legacy tools
2. **1/10th the Price** - Affordable for SMBs vs enterprise platforms
3. **Zero Configuration** - Works out of the box
4. **AI Explanations** - Plain English for non-security experts
5. **Cloud-Native** - Built for modern workflows

## Development

### Running Locally
See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

### Testing
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Code Structure
- Backend follows MVC pattern with services
- Frontend uses Next.js App Router
- Shared types can be added in `/shared` directory
- Database migrations in `/backend/src/db/migrations`

## Next Steps

1. Set up OpenAI API key
2. Configure GitHub App (for Attack Surface Monitor)
3. Set up AWS credentials (for Cloud Monitor)
4. Configure Stripe (for billing)
5. Deploy to production environment

## Support

For development questions or issues, refer to:
- [README.md](./README.md) - Product overview
- [QUICKSTART.md](./QUICKSTART.md) - Setup guide
- API documentation in `/backend/src/routes/`

