# Testing

The project uses Node's built-in test runner. Run:

```bash
npm test
```

Tests live in `test/`. The current automated test verifies that JWT generation yields a correctly shaped signed token with tenant claims. No coverage measurement, integration suite, browser suite, lint script, or build script is currently configured.

Recommended next tests: login failures, role/tenant authorization boundaries, attendance duplicate handling, leave-date validation, scoped projects/tasks, and API integration tests against PostgreSQL.
