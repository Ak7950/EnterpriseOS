# Architecture

EnterpriseOS is a modular monolith: Express serves the static browser client from `public/` and exposes JSON routes under `/api` from `server/index.js`.

```mermaid
flowchart LR
  Client[Browser: public/app.js] -->|JSON fetch| API[Express routes]
  API --> Auth[requireAuth / allow]
  Auth --> Query[db.js q()]
  Query --> Store[(PostgreSQL or pg-mem)]
```

## Layers and request flow

- `public/index.html`, `styles.css`, and `app.js` render the single-page interface and call the API.
- `server/index.js` owns routes, validation, authorization decisions, audit records, and notifications.
- `server/auth.js` signs and verifies JWTs and compares bcrypt password hashes.
- `server/db.js` defines the schema and creates either a PostgreSQL pool or a `pg-mem` pool.
- `server/seed.js` adds development organization data only when no organizations exist.

The login route verifies credentials and returns a JWT. `requireAuth` verifies the bearer token, attaches immutable user/organization claims to the request, and `allow` protects role-restricted routes. Queries use the organization claim, not a browser-supplied organization ID.

Errors are returned as `{ success: false, message, errorCode }`. Unique constraint failures map to conflict responses; other route errors currently map to a generic 500 response.

Configuration is read from `PORT`, `DATABASE_URL`, and `JWT_SECRET`. No external SaaS services are used.
