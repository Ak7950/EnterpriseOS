# Deployment

## Prerequisites

Node.js 24 for the provided Docker image, or Docker with Docker Compose. Production requires PostgreSQL and a strong unique `JWT_SECRET`.

## Docker

```bash
docker compose up --build
```

Compose starts PostgreSQL 16 and the Express application on port 4000. The Compose credentials are development defaults only. The application migrates/seeds on first start.

## Local database

Set `DATABASE_URL` to use PostgreSQL. Without it, the app starts with `pg-mem`, and all records are lost on restart.

## Production considerations

Use a managed/backed-up PostgreSQL instance, TLS termination, an explicit CORS allowlist, a secret manager for `JWT_SECRET`, restricted network exposure, health monitoring, and a tested migration/backup plan. No deployment platform or CD workflow is currently implemented.
