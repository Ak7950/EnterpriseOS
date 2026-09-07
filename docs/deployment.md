# Deployment

Use `docker compose up --build`. Supply long random JWT secrets and a managed PostgreSQL `DATABASE_URL`. Place the service behind TLS termination, restrict CORS, and back up PostgreSQL before upgrades.
