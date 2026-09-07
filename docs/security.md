# Security

Passwords use bcrypt. JWTs are short-lived and role checks are applied at the API, not merely in the UI. Input is allow-listed and validated, unauthorized requests receive 401/403, and tenant filtering is enforced server-side. Replace development secrets before deployment, use HTTPS, add a secure refresh-token cookie, and configure an explicit CORS allowlist in production.
