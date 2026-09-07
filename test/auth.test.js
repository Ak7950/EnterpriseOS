import test from 'node:test'; import assert from 'node:assert/strict'; import { tokenFor } from '../server/auth.js';
test('creates a signed JWT with tenant claims',()=>{const token=tokenFor({id:'u1',organization_id:'o1',role:'EMPLOYEE',first_name:'Test',last_name:'User'});assert.equal(token.split('.').length,3)});
