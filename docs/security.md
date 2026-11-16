# Security Implementation

## Implemented

- Passwords are bcrypt hashes; plaintext passwords are not stored.
- JWT bearer tokens include user, organization, and role claims and expire after eight hours.
- API authorization is enforced server-side with role checks and organization-scoped queries.
- Parameterized `pg` queries avoid direct SQL interpolation of user values.
- Attendance and account email uniqueness are database constraints.
- Authentication, role, and validation failures use controlled responses.
- Production startup requires a strong `JWT_SECRET`, `DATABASE_URL`, and explicit `CORS_ORIGIN` allowlist.
- HTTP responses include basic browser security headers; JSON request bodies are limited to 100 KB.
- Login attempts are limited per process/IP to five failures per 15-minute window.
- Managers are restricted to their direct reports for people, attendance, leave, and performance views; task assignment validates the assignee belongs to the manager's organization.

## Gaps and production work

- The in-process login limit is not a distributed account lockout; use platform/WAF protection for stronger abuse controls.
- No CSRF strategy or password reset flow is implemented.
- JWTs are stored by the browser client in `sessionStorage`; no refresh-token rotation or revocation exists.
- Input validation is route-specific and manual; add a shared schema-validation layer.
- Audit logs are application records, not immutable external audit storage.

See [SECURITY.md](../SECURITY.md) for vulnerability reporting guidance.
