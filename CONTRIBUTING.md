# Contributing to EnterpriseOS

Use pull requests for feature work; do not push feature changes directly to `main`.

```text
main → feature/* → Pull Request → CI → Code Review → Merge
```

1. Create a branch, for example `feature/attendance-export` or `fix/login-session`.
2. Make focused changes and keep working functionality intact.
3. Run `npm test`.
4. Commit with a meaningful message.
5. Push the branch and open a pull request.
6. Wait for CI and request review.
7. Address review comments.
8. Merge only after approval and passing checks.

Recommended commit styles:

```text
feat: add employee management API
fix: prevent duplicate attendance records
test: add authentication integration tests
docs: update architecture documentation
chore: configure CI workflow
```

Avoid messages such as `update`, `final`, `changes`, `abc`, or `test123`.

## Three-person responsibilities

- Backend/API/database: schema, authentication, routes, authorization, and seed data.
- Frontend/UI: client behavior, accessible UI, and browser workflows.
- Integration/DevOps/quality: Docker, CI, API integration tests, analytics/reporting, release readiness, and documentation.

All contributors should update tests and documentation when their changes require it. Never commit `.env`, credentials, `node_modules`, generated logs, or unrelated files.
