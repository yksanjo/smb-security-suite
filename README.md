# SMB Security Suite - Unified Security Dashboard

<div align="center">

![SMB Security Suite Logo](https://via.placeholder.com/200x200/6366f1/ffffff?text=SMB+Security)

**Complete AI-Native Security Platform for SMBs**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Products](#-products) • [Pricing](#-pricing)

</div>

---

## 🎯 Overview

**SMB Security Suite** is a unified security platform that combines all our security products into a single pane of glass. Perfect for growing startups and SMBs who need comprehensive security without the complexity.

### Why SMB Security Suite?

- 🎯 **All-in-One** - All security products in one platform
- 📊 **Unified Dashboard** - Single view of your security posture
- 💰 **Bundle Pricing** - 20-40% discount vs individual products
- 🔄 **Integrated Workflows** - Products work together seamlessly
- 📈 **Compliance Ready** - SOC 2, ISO 27001 reporting

## ✨ Features

### Integrated Products

1. **SurfaceAI** - Attack Surface Monitor
   - GitHub repository scanning
   - Cloud bucket monitoring
   - Auto-remediation PRs

2. **LogCopilot** - Log Intelligence
   - Natural language log analysis
   - AI anomaly detection
   - Multi-source ingestion

3. **VPC Guardian** - Cloud Network Monitor
   - VPC flow log analysis
   - IAM event monitoring
   - Lateral movement detection

4. **PentestGPT** - Pentest Assistant
   - Browser-based testing
   - AI-powered vulnerability discovery
   - Automated reporting

### Unified Dashboard

- **Security Overview** - At-a-glance view of all threats
- **Cross-Product Correlation** - Link findings across products
- **Compliance Reporting** - SOC 2, ISO 27001 preparation
- **Centralized Alerts** - One place for all notifications
- **Team Collaboration** - Share findings across teams

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL 15+ (or Docker)
- Redis 7+ (or Docker)
- OpenAI API Key
- GitHub, AWS, or other service credentials (depending on products used)

### Installation

```bash
# Clone the repository
git clone https://github.com/yksanjo/smb-security-suite.git
cd smb-security-suite

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Start infrastructure (using Docker)
docker-compose -f docker/docker-compose.dev.yml up -d

# Run migrations
cd backend && npm run migrate

# Start development servers
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev # Terminal 2
```

### Docker Compose (Recommended)

```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

Access the application at http://localhost:3000

## 📸 Screenshots

### Unified Dashboard

![Dashboard](screenshots/dashboard.png)

*Single pane of glass for all security products*

### Product Integration

![Integration](screenshots/integration.png)

*Seamless integration between products*

### Compliance Reporting

![Compliance](screenshots/compliance.png)

*SOC 2 and ISO 27001 compliance reports*

> **Note:** Screenshots are located in the `/screenshots` directory.

## 🏗️ Architecture

```
smb-security-suite/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── routes/       # All product routes
│   │   ├── services/     # Product services
│   │   │   ├── attackSurface/
│   │   │   ├── logIntelligence/
│   │   │   ├── cloudMonitor/
│   │   │   └── pentest/
│   │   └── db/           # Database migrations
│   └── package.json
├── frontend/             # Next.js application
│   ├── app/             # All product pages
│   │   ├── dashboard/   # Unified dashboard
│   │   ├── attack-surface/
│   │   ├── logs/
│   │   ├── cloud/
│   │   └── pentest/
│   └── package.json
├── docker/               # Docker compose files
└── README.md
```

## 📚 API Documentation

### Authentication

All endpoints require authentication:

```bash
Authorization: Bearer <your-token>
x-organization-id: <org-id>
```

### Unified Dashboard

```bash
# Get unified dashboard data
GET /api/dashboard
```

### Product-Specific Endpoints

See individual product repositories for detailed API docs:
- [SurfaceAI](https://github.com/yksanjo/surfaceai)
- [LogCopilot](https://github.com/yksanjo/logcopilot)
- [VPC Guardian](https://github.com/yksanjo/vpc-guardian)
- [PentestGPT](https://github.com/yksanjo/pentestgpt)

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | $199/month | All products, up to 50 employees |
| **Professional** | $349/month | All products, up to 200 employees, priority support |
| **Enterprise** | $499/month | Unlimited, custom integrations, SLA, dedicated support |

**Bundle Discount:** 20-40% off individual product pricing

14-day free trial • No credit card required

## 🔗 Individual Products

Each product is also available standalone:

- [SurfaceAI](https://github.com/yksanjo/surfaceai) - $29-99/month
- [LogCopilot](https://github.com/yksanjo/logcopilot) - $49-149/month
- [VPC Guardian](https://github.com/yksanjo/vpc-guardian) - $79-199/month
- [PentestGPT](https://github.com/yksanjo/pentestgpt) - $99-299/month

## 🛣️ Roadmap

- [ ] Advanced correlation engine
- [ ] Custom compliance frameworks
- [ ] API for third-party integrations
- [ ] Mobile app
- [ ] White-label options
- [ ] Multi-region deployment

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ for security-conscious SMBs**

[Get Started](#-quick-start) • [View Products](#-individual-products) • [Read Docs](docs/)

</div>
