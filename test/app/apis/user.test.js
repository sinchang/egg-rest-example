'use strict';


const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let userId = null;
  let userId2 = null;
  let name = null;
  let age = null;


  it('POST /api/v1/{objects}', async () => {
    const result1 = await app.httpRequest()
      .post('/api/v1/users')
      .send({
        name: 'test1@testcorp.com',
        age: 18,
      });

    const result2 = await app.httpRequest()
      .post('/api/v1/users')
      .send({
        name: 'test2@testcorp.com',
        age: 18,
      });

    userId = result1.body.data.id;
    userId2 = result2.body.data.id;
    name = result1.body.data.name;
    age = result1.body.data.age;
    assert(result1.status === 201);
    assert(result2.status === 201);
  });

  it('GET /api/v1/{objects}/{id}', async () => {
    const result = await app.httpRequest()
      .get(`/api/v1/users/${userId}`);

    assert(result.body.data.id = userId);
    assert(result.body.data.name = name);
    assert(result.body.data.age = age);
  });


  it('GET /api/v1/{objects}', async () => {
    const result = await app.httpRequest()
      .get('/api/v1/users');
    assert(result.body.data.length >= 2);
  });

  it('GET /api/{objects}?fields=name', async () => {
    const result = await app.httpRequest()
      .get('/api/v1/users?fields=name');

    assert(result.body.data[0].age === undefined);
  });

  it('GET /api/{objects}?fields=age', async () => {
    const result = await app.httpRequest()
      .get('/api/v1/users?fields=age');

    assert(result.body.data[0].name === undefined);
  });

  it('PUT /api/{objects}/{id}', async () => {
    const result1 = await app.httpRequest()
      .put(`/api/v1/users/${userId}`)
      .send({
        name: 'test2_new@testcorp.com',
        age: 18,
      });

    const result2 = await app.httpRequest()
      .put('/api/v1/users/0')
      .send({
        name: 'test2_new@testcorp.com',
        age: 18,
      });

    assert(result1.body.data.name === 'test2_new@testcorp.com');
    assert(result1.body.data.age === 18);
    assert(result2.status === 404);
  });

  it('GET /api/{objects}/id?fields=age', async () => {
    const result = await app.httpRequest()
      .get(`/api/v1/users/${userId}?fields=age`);

    assert(result.body.data.name === undefined);
  });

  it('GET /api/{objects}/id1,id2,id3 return multi users', async () => {
    const result1 = await app.httpRequest()
      .get('/api/v1/users/999,9999');

    const result2 = await app.httpRequest()
      .get(`/api/v1/users/${userId},${userId2}`);

    assert(result2.body.data.length === 2);
    assert(result1.status === 404);
  });

  it('POST 422 when name is not email and age missing', () => {
    return app.httpRequest()
      .post('/api/v1/users')
      .send({
        name: 'newuser  gmail',
      })
      .expect(422, {
        code: 'invalid_param',
        message: 'Validation Failed',
        errors: [
          { field: 'name', code: 'invalid', message: 'should be an email' },
          { field: 'age', code: 'missing_field', message: 'required' },
        ],
      });
  });

  it('DELETE /api/{objects}/{id}', async () => {
    const result1 = await app.httpRequest()
      .delete(`/api/v1/users/${userId}`);

    const result2 = await app.httpRequest()
      .delete('/api/v1/users/0');
    assert(result1.body.data.success === true);
    assert(result2.status === 404);
  });
});
