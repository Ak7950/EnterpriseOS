# Security Implementation

## Implemented

- Passwords are bcrypt hashes; plaintext passwords are not stored.
- JWT bearer tokens include user, organization, and role claims and expire after eight hours.
- API authorization is enforced server-side with role checks and organization-scoped queries.
- Parameterized `pg` queries avoid direct SQL interpolation of user values.
- Attendance and account email uniqueness are database constraints.
- Authentication, role, and validation failures use controlled responses.

## Gaps and production work

- `JWT_SECRET` has a development fallback and must be explicitly configured in production.
- CORS currently uses the package default, which is permissive; configure an explicit allowlist.
- No rate limiting, account lockout, security headers, CSRF strategy, or password reset flow is implemented.
- JWTs are stored by the browser client in `sessionStorage`; no refresh-token rotation or revocation exists.
- Input validation is route-specific and manual; add a shared schema-validation layer.
- Audit logs are application records, not immutable external audit storage.

See [SECURITY.md](../SECURITY.md) for vulnerability reporting guidance.
