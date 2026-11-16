# Deployment

## Vercel and Neon

The root `index.js` default-exports the existing Express application, which is Vercel's supported Express entry-point pattern. No legacy `vercel.json` routes are required. Vercel serves `public/**` from its CDN; the Express SPA fallback remains for local Node.js development. Vercel must receive the source repository; do not upload `.env`.

1. Create a Neon PostgreSQL project in a region close to the Vercel function region. Copy its pooled connection string, including TLS settings.
2. In Vercel Project Settings → Environment Variables, set `DATABASE_URL`, `JWT_SECRET`, and `CORS_ORIGIN` for Production and Preview as appropriate. `JWT_SECRET` must be unique and at least 32 characters; `CORS_ORIGIN` is the deployed Vercel URL (or a comma-separated allowlist).
3. Run the migration explicitly against the intended Neon database from a trusted shell: `npm run db:migrate`. This application never migrates or seeds during a request or serverless cold start.
4. Import the repository in Vercel or deploy a preview with `vercel`. Promote only after the smoke test passes.

Production refuses to start without `DATABASE_URL`, `JWT_SECRET`, and `CORS_ORIGIN`; it never falls back to `pg-mem` and demo seeding is blocked.

## Deployment smoke test

1. Load the deployment URL and confirm `/`, `/styles.css`, and `/app.js` return the application assets.
2. Sign in using an account intentionally created in the Neon database; demo accounts are not created by deployment.
3. Confirm `/api/me` returns the signed-in user, then check dashboard, employee, department, attendance, leave, project, and task pages for that role.
4. Confirm a manager cannot see another manager's direct reports or assign a task to another organization.
5. Confirm `/api/not-a-route` returns JSON `404`, not the frontend HTML; confirm a request from an unlisted browser Origin is rejected by CORS and that requests without a bearer token receive `401`.

## Docker

```bash
docker compose up --build
```

Compose starts PostgreSQL 16 and the Express application on port 4000. The Compose credentials are development defaults only. Run `npm run db:migrate` and, if desired, `npm run db:seed-demo` explicitly.

## Local database

Set `DATABASE_URL` to use PostgreSQL. Without it, local development uses `pg-mem` and all records are lost on restart. Production startup fails instead.

## Production considerations

Use a managed/backed-up PostgreSQL instance, TLS termination, an explicit CORS allowlist, a secret manager for `JWT_SECRET`, restricted network exposure, health monitoring, and a tested migration/backup plan. Never run the demo seed against production.
