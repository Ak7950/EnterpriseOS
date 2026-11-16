# Database

EnterpriseOS uses PostgreSQL via `pg`. When `DATABASE_URL` is absent, `pg-mem` provides an in-memory local development database; production refuses to start without `DATABASE_URL`.

```mermaid
erDiagram
  ORGANIZATIONS ||--o{ DEPARTMENTS : owns
  ORGANIZATIONS ||--o{ USERS : owns
  DEPARTMENTS ||--o{ USERS : contains
  USERS ||--o{ USERS : manages
  PROJECTS ||--o{ TASKS : contains
  USERS ||--o{ TASKS : assigned
  USERS ||--o{ ATTENDANCE : records
  USERS ||--o{ LEAVE_REQUESTS : submits
  USERS ||--o{ PERFORMANCE_REVIEWS : receives
```

## Tables

| Table | Purpose / important constraints |
| --- | --- |
| `organizations` | Tenant root; UUID primary key. |
| `departments` | Organization departments; unique organization/name. |
| `users` | Accounts, roles, department, optional direct `manager_id`; unique organization/email. |
| `attendance` | Daily clock in/out; unique user/work date. |
| `leave_requests` | Leave dates, reason, workflow status, reviewer. |
| `projects` | Organization projects with manager, priority, status, and due date. |
| `tasks` | Project work items with assignee, creator, workflow status, and due date. |
| `performance_reviews` | Employee/reviewer ratings, feedback, and goals. |
| `notifications` | Per-user messages and read state. |
| `audit_logs` | Append-only application audit events and JSON metadata. |

Tenant-owned records contain `organization_id`. Key foreign keys include user-to-department/manager, task-to-project/assignee/creator, and attendance/leave/notification/review-to-user. Indexes exist for task tenant/status, user manager, and audit tenant/time queries.

Run `npm run db:migrate` to create/update the schema. `server/seed.js` adds development data only when explicitly invoked through `npm run db:seed-demo`; that command refuses to run in production.
