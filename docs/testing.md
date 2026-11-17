# Testing and Verification

## Automated test runner

EnterpriseOS uses Node.js's built-in test runner. Run the suite with:

~~~bash
npm test
~~~

The latest verified local run recorded **20 tests passed, 0 failed**. The production-dependency audit recorded **0 vulnerabilities** with:

~~~bash
npm audit --omit=dev
~~~

These are results from the recorded verification run; rerun both commands against the current checkout before making a new release claim.

## Test coverage areas

The current automated tests cover:

- JWT claim creation, missing/weak secret rejection, and rejection of the known development secret in production.
- Bearer-token authentication and role-authorization middleware behavior.
- Manager task assignment and employee visibility boundaries.
- Rejection of unauthorized Super Admin creation.
- Unique employee initial passwords and mandatory first-login password change behavior.
- Local SPA asset behavior and JSON responses for unknown API routes.
- Safe administrator-bootstrap configuration, transaction behavior, and duplicate-administrator rejection.
- In-memory development startup initialization.
- India-local date helper behavior around UTC/IST date boundaries.

## Dependency audit

Run:

~~~bash
npm audit
npm audit --omit=dev
~~~

The previously recorded audit returned zero vulnerabilities. Audit results can change when dependency advisories are published, so check again before release.

## Verification limits

The current suite is not a comprehensive browser end-to-end suite. It does not provide code-coverage measurement, load testing, penetration testing, or a full integration run against a dedicated Neon test database. Local pg-mem behavior can differ from PostgreSQL; validate migrations and important database behavior against a non-production PostgreSQL/Neon branch before a Production release.

## CI

GitHub Actions runs npm ci and npm test for pull requests and pushes to main and feature/** branches, using Node.js 24.
