import request from 'supertest';
import { app } from '../../app';

describe('successful signup', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('sets a cookie after a successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('invalid signup parameters', () => {
  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an empty blank password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);
  });

  it('returns a 400 with an empty email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: '',
        password: 'validpassword',
      })
      .expect(400);
  });

  it('returns a 400 with both email and password empty', async () => {
    return request(app).post('/api/users/signup').send({}).expect(400);
  });

  it('returns a 400 when password length is less than 4', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '22',
      })
      .expect(400);
  });

  it('returns a 400 when password length is greater than 20', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '111111111111111111111',
      })
      .expect(400);
  });

  it('returns a 400 with when password length is greater than 20', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '111111111111111111111',
      })
      .expect(400);
  });
});

it('dissallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});
