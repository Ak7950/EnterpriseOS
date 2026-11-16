import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = '';
process.env.JWT_SECRET = 'test-only-secret-with-at-least-32-characters';

const [{ default: app }, { migrate, q, pool }, { hash, tokenFor }] = await Promise.all([
  import('../server/index.js'),
  import('../server/db.js'),
  import('../server/auth.js')
]);

await migrate();

const ids = {
  organization: '11111111-1111-4111-8111-111111111111',
  otherOrganization: '22222222-2222-4222-8222-222222222222',
  manager: '33333333-3333-4333-8333-333333333333',
  admin: '77777777-7777-4777-8777-777777777777',
  report: '44444444-4444-4444-8444-444444444444',
  outsider: '55555555-5555-4555-8555-555555555555',
  project: '66666666-6666-4666-8666-666666666666'
};

const passwordHash = await hash('valid-password');
await q('INSERT INTO organizations(id,name) VALUES($1,$2),($3,$4)', [ids.organization, 'Primary', ids.otherOrganization, 'Other']);
await q('INSERT INTO users(id,organization_id,first_name,last_name,email,password_hash,role) VALUES($1,$2,$3,$4,$5,$6,$7),($8,$2,$9,$10,$11,$6,$12),($13,$14,$15,$16,$17,$6,$18),($19,$2,$20,$21,$22,$6,$23)', [ids.manager, ids.organization, 'Manager', 'One', 'manager@primary.test', passwordHash, 'MANAGER', ids.report, 'Report', 'One', 'report@primary.test', 'EMPLOYEE', ids.outsider, ids.otherOrganization, 'Other', 'User', 'other@test', 'EMPLOYEE', ids.admin, 'Admin', 'One', 'admin@primary.test', 'ADMIN']);
await q('UPDATE users SET manager_id=$1 WHERE id=$2', [ids.manager, ids.report]);
await q('INSERT INTO projects(id,organization_id,name,manager_id) VALUES($1,$2,$3,$4)', [ids.project, ids.organization, 'Primary project', ids.manager]);

const manager = { id: ids.manager, organization_id: ids.organization, first_name: 'Manager', last_name: 'One', role: 'MANAGER' };
const token = tokenFor(manager);
const adminToken = tokenFor({ id: ids.admin, organization_id: ids.organization, first_name: 'Admin', last_name: 'One', role: 'ADMIN' });
const server = http.createServer(app);
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

async function api(path, options = {}, authToken = token) {
  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json', ...options.headers }
  });
}

test('manager cannot assign a task to a user in another organization', async () => {
  const response = await api('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ projectId: ids.project, title: 'Unsafe assignment', assigneeId: ids.outsider })
  });

  assert.equal(response.status, 400);
  assert.equal((await response.json()).errorCode, 'VALIDATION_ERROR');
});

test('manager employee view is limited to their direct reports', async () => {
  const response = await api('/api/employees');
  const employees = (await response.json()).data;

  assert.deepEqual(employees.map(employee => employee.id).sort(), [ids.manager, ids.report].sort());
});

test('an admin cannot create a super-admin account', async () => {
  const response = await api('/api/employees', { method: 'POST', body: JSON.stringify({ firstName: 'Escalated', lastName: 'User', email: 'escalated@primary.test', role: 'SUPER_ADMIN' }) }, adminToken);

  assert.equal(response.status, 400);
  assert.equal((await response.json()).errorCode, 'VALIDATION_ERROR');
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
  await pool.end();
});
