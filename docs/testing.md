# Testing

Run `npm test` for pure workflow tests. A manual acceptance path is: log in as admin, add an employee; log in as manager, create/assign a task and approve a leave; log in as employee, update its task and clock in. The API validates role and tenant context for each operation.
