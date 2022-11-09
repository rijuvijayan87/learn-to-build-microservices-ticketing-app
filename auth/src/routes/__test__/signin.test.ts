import request from 'supertest';
import { app } from '../../app';

describe('successful signin', () => {
  it('returns a 200 on successful signin', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
    };
    await request(app)
      .post('/api/users/signup')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);
  });

  it('sets a cookie after a successful login', async () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
    };

    await request(app)
      .post('/api/users/signup')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('invalid signin parameters', () => {
  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an empty blank password', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '',
      })
      .expect(400);
  });

  it('returns a 400 with an empty email', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: '',
        password: 'validpassword',
      })
      .expect(400);
  });

  it('returns a 400 with both email and password empty', async () => {
    return request(app).post('/api/users/signin').send({}).expect(400);
  });
});
it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incoorect password is supplied', async () => {
  const user = {
    email: 'test@test.com',
    password: 'password',
  };
  await request(app)
    .post('/api/users/signup')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: 'invalidpassword',
    })
    .expect(400);
});
