# API overview

`POST /api/auth/login`, `GET /api/me`, `GET|POST /api/employees`, `GET|POST /api/departments`, `POST /api/attendance/clock-in`, `POST /api/attendance/clock-out`, `GET|POST /api/leaves`, `PUT /api/leaves/:id/decision`, `GET|POST /api/projects`, `GET|POST /api/tasks`, `PUT /api/tasks/:id/status`, `GET /api/dashboard`, `GET /api/audit-logs`.

Authenticated endpoints require `Authorization: Bearer <token>`. Responses use `{ success, data }` and errors use `{ success:false, message, errorCode }`.
