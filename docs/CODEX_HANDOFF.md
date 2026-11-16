# Codex Handoff

## Phase 1 complete — 2026-11-16

- Rewrote the local `feature/production-readiness` branch to remove commits `9a2d695` and `7b6dfec`, preserving `24a1e61` and `eb527c8`.
- Recreated `.env.example` with placeholders only. The local `.env` was not read or changed.
- Verified `.env` is ignored and untracked.
- `npm test` passed: 9 tests, 0 failures.

### Next steps

1. Create a Neon database and run `npm run db:migrate` against it from a trusted shell.
2. Configure `DATABASE_URL`, `JWT_SECRET`, and `CORS_ORIGIN` in Vercel, then make a preview deployment and follow `docs/deployment.md` smoke tests.
3. Do not push the rewritten history until the owner approves the non-fast-forward synchronization command.

## Phases 2 and 3 complete — 2026-11-16

- Exported the Express application without serverless startup side effects; Vercel routing is in `vercel.json` and `api/index.js`.
- Migrations and demo seed data are explicit scripts. Production requires `DATABASE_URL`, blocks `pg-mem`, and blocks demo seeding.
- Added startup JWT/CORS validation, security headers, body limits, and basic login throttling.
- Restricted manager visibility to direct reports and validated task assignees belong to the requester's organization; added integration tests for both boundaries.
- Employee creation validates roles and department ownership; administrators cannot self-escalate by creating super-admin accounts.
- Updated Vercel/Neon deployment and smoke-test documentation.
- Verification: `npm test` passed (11 tests); `npm audit --omit=dev` found 0 vulnerabilities.

## Focused deployment-blocker fixes — 2026-11-16

- Replaced the shared employee password with a cryptographically random, per-employee initial password. Only the authorized create response contains it; the database stores only its hash. First-login tokens are restricted to changing that password.
- Fixed empty-`DATABASE_URL` development startup: the application now migrates and seeds `pg-mem` in its own process before listening. PostgreSQL migrations remain explicit; Vercel and production do not migrate or seed at startup.
- Replaced legacy Vercel rewrite configuration with the documented root Express default export and added local verification that SPA assets load while unknown API paths return JSON `404`.
- Remaining uncertainty: Vercel's CDN/function routing has not been verified by a Vercel preview deployment. Run the documented preview smoke test after configuring environment variables.
