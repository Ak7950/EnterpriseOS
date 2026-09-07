# Database design

All tenant-owned tables carry `organization_id`. Core relations are `organizations → departments → users`; `users → attendance`, `leave_requests`, `notifications` and `performance_reviews`; and `projects → tasks`. `tasks.assignee_id` points to a tenant user. PostgreSQL unique constraints prevent duplicate user emails within a tenant and duplicate daily attendance records. Audit logs are append-only application records with actor, tenant, action, entity and JSON metadata.
