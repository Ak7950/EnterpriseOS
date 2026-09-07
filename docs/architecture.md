# Architecture

EnterpriseOS is a modular monolith. Route modules own HTTP concerns, services own workflow and authorization checks, and the PostgreSQL layer owns persistence. `auth` attaches the verified user and immutable tenant context to each request. Core modules: organization, employees, attendance, leave, projects/tasks, performance, notifications, analytics and audit.

Tenant isolation is a mandatory predicate in every query. A resource not belonging to the caller's organization is returned as not found, avoiding cross-tenant data disclosure.
