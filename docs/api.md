# API

Responses use `{ "success": true, "data": ... }`; errors use `{ "success": false, "message": "...", "errorCode": "..." }`. Except login, routes require `Authorization: Bearer <JWT>`.

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Public | Body: `email`, `password`; returns token and user. Errors: 400, 401. |
| GET | `/api/me` | Any | Current profile. |
| GET | `/api/dashboard` | Any | Scoped dashboard metrics and recent tasks. |
| GET/POST | `/api/employees` | GET elevated; POST admin | List employees or create one. POST body: name, email, role, department, designation. |
| GET/POST | `/api/departments` | GET any; POST admin | List or create departments. |
| GET/POST | `/api/projects` | Any / elevated | Scoped projects or create a project. |
| GET/POST | `/api/tasks` | Any / elevated | Scoped tasks or create a task. |
| PUT | `/api/tasks/:id/status` | Assignee, manager of project, or admin | Body: allowed task `status`. |
| POST | `/api/attendance/clock-in` | Any | One record per user/day; duplicate returns 409. |
| POST | `/api/attendance/clock-out` | Any | Closes today's open record; returns 400 if none exists. |
| GET | `/api/attendance?limit=&search=` | Any | Scoped attendance records. |
| GET/POST | `/api/leaves` | Any | Scoped leave requests or submit one. POST body: leaveType, startDate, endDate, reason. |
| PUT | `/api/leaves/:id/decision` | Elevated | Body: `APPROVED` or `REJECTED`. |
| GET | `/api/performance` | Any | Scoped reviews. |
| GET/PUT | `/api/notifications`, `/api/notifications/read-all` | Any | List or mark own notifications read. |
| GET | `/api/audit-logs` | Admin | Recent organization audit events. |
| GET | `/api/team-members` | Elevated | Managers receive direct reports/self; admins receive organization users. |

Common errors: `UNAUTHENTICATED`/`INVALID_TOKEN` (401), `FORBIDDEN` (403), `VALIDATION_ERROR` (400), `NOT_FOUND` (404), and `CONFLICT` (409).
