# Project Handoff and Release Status

This file records the current project state for maintainers. It replaces the earlier implementation handoff notes, which no longer reflected the final repository structure or deployment work.

## Repository

- Public repository: https://github.com/Ak7950/EnterpriseOS
- Active implementation branch: feature/production-readiness
- Default branch: main
- The active implementation branch has not been merged into main in this handoff.
- Keep the submitted IEEE report and its recorded links unchanged.

## Academic demonstration link

The public Vercel Preview URL recorded in the submitted IEEE report is:

https://enterprise-ra6w4zeh7-ak795.vercel.app/

Preserve this deployment while it is used for academic evaluation. Do not describe it as the verified Production-domain release.

## Verified application state

The deployed Preview was opened publicly in an incognito browser. The demonstrated workspace contained:

- One Engineering department.
- Three user accounts: one Super Admin and two employees.
- One active project.
- Three tasks distributed across To Do, In Progress, and Done.
- One administrator attendance record.

These are synthetic demonstration records, not data from a real employer.

The recorded local verification run passed 20 automated tests and reported zero production-dependency vulnerabilities before the latest attendance fix. The latest feature branch adds one API regression test; rerun the suite to confirm the new total.

## Known release follow-ups

1. Verify and complete the separate Vercel Production-domain deployment, including Production environment variables and a full incognito smoke test.
2. Confirm the latest server-side Asia/Kolkata attendance date fix with the full automated test suite and a Preview smoke test around the India date boundary.
3. Add a browser end-to-end test suite and a PostgreSQL/Neon integration test workflow before treating the application as production-hardened.

## Operational safeguards

- Never commit .env or real secrets.
- Do not run demo seeding in production.
- Do not rerun the first-administrator bootstrap against an organization that already has an administrator.
- Run database migrations explicitly against the intended PostgreSQL/Neon database.
- Keep production credentials separate from Preview credentials.

## Local verification commands

~~~bash
npm ci
npm test
npm audit --omit=dev
git diff --check
~~~
